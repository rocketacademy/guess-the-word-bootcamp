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
      console.log(letter);
      console.log(this.state.guessedLetters);
      if (!this.state.guessedLetters.includes(letter)) {
        console.log(`${letter} is not found in ${this.state.guessedLetters}`);
        return false;
      }
    }
    return true;
  };

  checkGameOver = () => {
    console.log(`currLetter: ${this.state.currLetter}`);
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
        wordDisplay.push("*");
      }
    }
    return wordDisplay.join(" ").toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  // we await setState() to complete the update before we do checkGameOver
  handleSubmit = async (e) => {
    e.preventDefault();
    const guessesLeft = this.state.guessesLeft - 1;
    const currLetter = this.state.currLetter;
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
    });
  };

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1 id="main-title">Guess The Word</h1>
        </div>
        <div className="content">
          {" "}
          <div className="gameDisplay">
            {" "}
            <h3>Word Display</h3>
            {this.state.isGameRunning && (
              <div>
                {this.generateWordDisplay()}
                <h3>Guessed Letters</h3>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.join(" ").toString()
                  : "-"}
                <h3>Input</h3>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Guess:
                    <input
                      type="text"
                      name="guess"
                      onChange={this.handleChange}
                      maxLength={1}
                      value={this.state.currLetter}
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
                {<div>Guesses Left: {this.state.guessesLeft}</div>}
                {this.state.warning.moreThanOneLetter && (
                  <div>You can only guess one letter at a time.</div>
                )}
              </div>
            )}
            {!this.state.isGameRunning && (
              <div>
                <div>Game Over</div>
                <div>The Hidden Word is {this.state.currWord}</div>
                {this.generateWordDisplay()}
                <h3>Guessed Letters</h3>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.join(" ").toString()
                  : "-"}
                {this.state.playerWon ? (
                  <div>You Won</div>
                ) : (
                  <div>You Lost</div>
                )}
                <button onClick={this.resetGame}>Reset Game</button>
              </div>
            )}
            <div>
              <div>Games Won: {this.state.totalWins}</div>
              <div>Games Played: {this.state.totalGames}</div>
            </div>
          </div>
          <div className="artDisplay">
            <ArtDisplay guessesLeft={this.state.guessesLeft} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
