import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const maxGuesses = 10;

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      guessesLeft: maxGuesses, // num guesses left state
      value: "", // form input state
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let [newLetter] = this.state.value;
    event.preventDefault();
    this.setState((previousState) => ({
      guessedLetters: [...previousState.guessedLetters, newLetter],
      guessesLeft: previousState.currWord.includes(newLetter)
        ? previousState.guessesLeft
        : previousState.guessesLeft - 1,
      value: "",
    }));
  }

  isCorrectWord = (guessedLetters, currWord) => {
    // Check whether all letters in currWord are found in the guessedLetters array
    for (let i = 0; i < currWord.length; i++) {
      if (!guessedLetters.includes(currWord[i])) return false;
    }

    return true;
  };

  resetGame = () => {
    this.setState({
      // Reset the whole game to let user play again
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: maxGuesses,
      value: "",
    });
  };

  render() {
    const replayButton = (
      <button onClick={() => this.resetGame()}>Play Again</button>
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <p>Num guesses left: {this.state.guessesLeft}</p>
          <h3>Input</h3>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <label>
              Please submit one letter at a time: <br />
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              disabled={
                !this.state.guessesLeft ||
                this.isCorrectWord(
                  this.state.guessedLetters,
                  this.state.currWord
                )
                  ? true
                  : false
              }
            />
          </form>
          {/* Player has successfully guessed the word */}
          {this.isCorrectWord(
            this.state.guessedLetters,
            this.state.currWord
          ) && (
            <div>
              <p>You have correctly guessed the word!</p>
              {replayButton}
            </div>
          )}
          {/* Player has run out of tries */}
          {!this.state.guessesLeft && (
            <div>
              <p>
                You have used up all guesses. <br /> The correct word is{" "}
                {this.state.currWord}.
              </p>
              {replayButton}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
