import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./hanging-man", true, /\.(PNG|png)$/)
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      wrongGuesses: [],
      guessesLeft: 10,
      currGuess: "",
      roundsPlayed: 0,
      roundsWon: 0,
    };
  }

  updateGuessesLeft = () => {
    this.setState(
      {
        guessesLeft: 10 - this.state.wrongGuesses.length,
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
        }, 700);
      } else if (this.state.guessesLeft > 5) {
        setTimeout(() => {
          alert("That's impressive!");
        }, 100);
      } else if (this.state.guessesLeft <= 5 && this.state.guessesLeft > 2) {
        setTimeout(() => {
          alert("Good effort!");
        }, 100);
      } else if (this.state.guessesLeft <= 2) {
        setTimeout(() => {
          alert("Phew! That was close.");
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
      this.setState({ currGuess: "" });
      return false;
    }
    if (!(input.match(/^[A-Za-z]+$/) && input.length === 1)) {
      alert("Please enter just one letter at a time!");
      this.setState({ currGuess: "" });
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

  handleKeyUp = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateInput()) {
      if (this.state.currWord.includes(this.state.currGuess.toLowerCase())) {
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
      } else {
        this.setState(
          {
            guessedLetters: [
              ...this.state.guessedLetters,
              this.state.currGuess.toLowerCase(),
            ],
            wrongGuesses: [
              ...this.state.wrongGuesses,
              this.state.currGuess.toLowerCase(),
            ],
            currGuess: "",
          },
          this.updateGuessesLeft
        );
      }
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
      wrongGuesses: [],
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
            <div id="wrong-guesses">
              Wrong guesses: <br />
              {this.state.wrongGuesses.length > 0
                ? this.state.wrongGuesses.join(" ")
                : "-"}
            </div>
            <div id="guesses-left">
              Guesses Left: {this.state.guessesLeft}
              <img
                src={images[`hm${10 - this.state.guessesLeft}.PNG`]}
                alt=""
              />
            </div>
          </div>
          {!this.isGameOver && (
            <div className="form">
              <Form.Label htmlFor="guess">Guess: </Form.Label>
              <Form.Control
                autoFocus
                type="text"
                id="guess"
                value={this.state.currGuess}
                placeholder="e.g. 'e'"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
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
            Won {this.state.roundsWon} out of {this.state.roundsPlayed}
            {this.state.roundsPlayed > 1 ? " rounds" : " round"}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
