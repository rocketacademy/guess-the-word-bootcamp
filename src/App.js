import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currGuess: "",
      roundsPlayed: 0,
      roundsWon: 0,
    };
  }

  updateGuessesLeft = () => {
    this.setState(
      {
        guessesLeft: 10 - this.state.guessedLetters.length,
      },
      this.updateGameState
    );
  };

  updateGameState = () => {
    if (this.isGameOver) {
      if (
        this.generateWordDisplay().replace(/ /g, "") !== this.state.currWord
      ) {
        setTimeout(() => {
          alert(`You ran out of tries! The word is "${this.state.currWord}".`);
        }, 100);
      } else {
        setTimeout(() => {
          alert(
            `Congrats on guessing it with ${10 - this.state.guessesLeft} tries!`
          );
        }, 100);
      }
      this.endGame();
    }
  };

  generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(" ");
  };

  validateInput = () => {
    const input = this.state.currGuess;
    if (this.state.guessedLetters.includes(input.toLowerCase())) {
      alert(
        `You have already guessed "${this.state.currGuess}"! Try another letter.`
      );
      return false;
    }
    if (!(input.match(/^[A-Za-z]+$/) && input.length === 1)) {
      alert("Please enter just one letter at a time!");
      return false;
    } else {
      return true;
    }
  };

  get isGameOver() {
    return !(
      this.state.guessesLeft > 0 &&
      this.generateWordDisplay().replace(/ /g, "") !== this.state.currWord
    );
  }

  // Insert form callback functions handleChange and handleSubmit here

  handleChange = (event) => {
    this.setState({
      currGuess: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateInput()) {
      this.setState(
        {
          guessedLetters: [
            ...this.state.guessedLetters,
            this.state.currGuess.toLowerCase(),
          ],
          currGuess: "",
        },
        this.updateGuessesLeft
      );
    }
  };

  endGame = () => {
    if (this.isGameOver) {
      const roundsWon =
        this.generateWordDisplay().replace(/ /g, "") === this.state.currWord
          ? this.state.roundsWon + 1
          : this.state.roundsWon;

      this.setState({
        roundsPlayed: this.state.roundsPlayed + 1,
        roundsWon: roundsWon,
      });
    }
  };

  restartGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currGuess: "",
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word</h1>
          <div>
            <h3>Word Display</h3>
            {this.generateWordDisplay()}
          </div>
          <div>
            <h3>Guessed Letters</h3>
            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.join(" ")
              : "-"}
          </div>
          <div>
            <h3>Guesses Left</h3>
            {this.state.guessesLeft}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>My guess: </label>
            <input
              type="text"
              value={this.state.currGuess}
              placeholder="E.g. 'e'"
              onChange={this.handleChange}
            />
            {!this.isGameOver && <input type="submit" value="Submit" />}
            {this.isGameOver && (
              <button onClick={this.restartGame}>Another round</button>
            )}
          </form>
          <div>
            {this.state.roundsWon} won out of {this.state.roundsPlayed} rounds
          </div>
        </header>
      </div>
    );
  }
}

export default App;
