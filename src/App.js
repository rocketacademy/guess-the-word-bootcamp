import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
          <h1>Guess The Word</h1> <br />
          <div id="container">
            <div id="word-display">{this.generateWordDisplay()}</div>
            <div id="guessed-letters">
              Guessed Letters: <br />
              {this.state.guessedLetters.length > 0
                ? this.state.guessedLetters.join(" ")
                : "-"}
            </div>
            <div id="guesses-left">
              Guesses Left: <br />
              {this.state.guessesLeft}
            </div>
          </div>
          {!this.isGameOver && (
            <div class="form">
              <Form.Label htmlFor="guess">Guess: </Form.Label>
              <Form.Control
                type="text"
                id="guess"
                value={this.state.currGuess}
                placeholder="e.g. 'e'"
                onChange={this.handleChange}
              />
              <Button variant="light" onClick={this.handleSubmit}>
                Submit
              </Button>
            </div>
          )}
          {this.isGameOver && (
            <Button
              id="another-round"
              variant="success"
              onClick={this.restartGame}
            >
              Another round
            </Button>
          )}
          <br />
          <div id="game-score">
            Won {this.state.roundsWon} out of {this.state.roundsPlayed} rounds
          </div>
        </header>
      </div>
    );
  }
}

export default App;
