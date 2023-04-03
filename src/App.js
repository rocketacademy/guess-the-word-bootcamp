import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import ArtDisplay from "./ArtDisplay.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      // use getRandomWord()
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      guessesLeft: 10,
      // Insert form input state here
      currLetter: "",
      warning: {
        moreThanOneLetter: false,
      },
      isGameRunning: true,
      playerWon: false,
      totalGames: 0,
      totalWins: 0,
    };
  }

  checkPlayerWin = (guessedLetters) => {
    // for each letter of the secret word, if the letter is NOT inside guessedLetters, then return false
    for (let letter of this.state.currWord) {
      if (!this.state.guessedLetters.includes(letter)) {
        console.log(`${letter} is not found in ${this.state.guessedLetters}`);
        return false;
      }
    }
    return true;
  };

  checkGameOver = () => {
    if (this.checkPlayerWin(this.state.guessedLetters)) {
      this.setState({
        isGameRunning: false,
        playerWon: true,
        totalGames: this.state.totalGames + 1,
        totalWins: this.state.totalWins + 1,
      });
    } else if (this.state.guessesLeft <= 0) {
      this.setState({
        isGameRunning: false,
        totalGames: this.state.totalGames + 1,
      });
    }
  };

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("?");
      }
    }
    return wordDisplay.join(" ").toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  // we await setState() to complete the update before we do checkGameOver
  handleSubmit = async (e) => {
    e.preventDefault();
    const guessesLeft = this.state.guessesLeft - 1;
    const currLetter = this.state.currLetter.toLowerCase();
    if (this.state.warning.moreThanOneLetter === false) {
      await this.setState({
        guessedLetters: [...this.state.guessedLetters, currLetter],
        guessesLeft: guessesLeft,
        currLetter: "",
      });
    }
    this.checkGameOver();
  };

  handleChange = (e) => {
    if (e.target.value.length >= 2) {
      this.setState({
        warning: { ...this.state.warning, moreThanOneLetter: true },
      });
    } else {
      console.log(`Setting currLetter to ${e.target.value}`);
      this.setState({
        currLetter: e.target.value,
        warning: { ...this.state.warning, moreThanOneLetter: false },
      });
    }
  };

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currLetter: "",
      warning: {
        moreThanOneLetter: false,
      },
      isGameRunning: true,
      playerWon: false,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="game-card">
          <div className="title">
            <p className="emblem">-⚜-</p>
            <h2 id="main-title">✽ Lady Penelope's Peculiar Puzzle ✽</h2>
          </div>
          <div className="content">
            <div className="gameDisplay">
              {" "}
              {this.state.isGameRunning && (
                <div>
                  <h4>Guess The Word</h4>
                  {this.generateWordDisplay()}
                  <h4>Guessed Letters</h4>
                  <p>
                    {" "}
                    {this.state.guessedLetters.length > 0
                      ? this.state.guessedLetters.join(" ").toString()
                      : "-"}
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      <input
                        type="text"
                        name="guess"
                        className="guess-input"
                        onChange={this.handleChange}
                        maxLength={1}
                        value={this.state.currLetter}
                      />
                    </label>
                    <br />
                    <br />
                    <input
                      type="submit"
                      value="Submit"
                      className="submit-button"
                    />
                  </form>
                  <br />

                  {this.state.warning.moreThanOneLetter && (
                    <div>You can only guess one letter at a time.</div>
                  )}
                </div>
              )}
              {!this.state.isGameRunning && (
                <div>
                  <h4>Game Concluded</h4>
                  <div>
                    The Hidden Word is:
                    <p>
                      <b>{this.state.currWord}</b>
                    </p>
                  </div>
                  {this.generateWordDisplay()}
                  <h4>Guessed Letters</h4>
                  {this.state.guessedLetters.length > 0
                    ? this.state.guessedLetters.join(" ").toString()
                    : "-"}
                  <br />
                  <br />
                  {this.state.playerWon ? (
                    <div>
                      <i>A Monumental Victory</i>
                    </div>
                  ) : (
                    <div>
                      <i>A Bitter Defeat</i>
                    </div>
                  )}
                  <br />
                  <button onClick={this.resetGame} className="submit-button">
                    Reset Game
                  </button>
                </div>
              )}
              <br />
              <div>
                <div>
                  <b>Guesses Left:</b> {this.state.guessesLeft}
                </div>
                <div>
                  <b>Games Won: </b>
                  {this.state.totalWins}
                </div>
                <div>
                  <b>Games Played: </b>
                  {this.state.totalGames}
                </div>
              </div>
            </div>
            <div className="artDisplay">
              <ArtDisplay guessesLeft={this.state.guessesLeft} />
            </div>
          </div>
          <div className="acknowledgements">
            <i>Art by Alphonse Mucha, Frederick Sargent & Kiwihug</i>
          </div>
          <p class="emblem">༺༻</p>
        </div>
      </div>
    );
  }
}

export default App;
