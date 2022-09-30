import React, { startTransition } from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // currWord: "scale",
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      guessCounter: 10,
      // Insert form input state here
      formInput: false,
      // User guess
      value: "",
    };
    // Binding handles
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

  // Reset game function
  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessCounter: 10,
      formInput: false,
      value: "",
    });
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Take first letter of any string input
    const valueLetter = this.state.value.charAt(0).toLowerCase();

    // Reject no input
    if (!this.state.value) {
      return;
    }

    // Reject any input that is not in the alphabet, with alert.
    if (!alphabet.includes(this.state.value)) {
      this.setState({
        value: "",
      });
      return alert(`Please input a letter!`);
    }
    // Set new state for every click of the submit button
    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, valueLetter],
      formInput: true,
      guessCounter: this.state.currWord.includes(valueLetter)
        ? state.guessCounter
        : state.guessCounter - 1,
      value: "",
    }));
  }
  // Create copy of guessed letters array and iterate to check whether given word has been guessed.
  guessCorrectWord = (valueLetter) => {
    const guessedLetters = [...this.state.guessedLetters, valueLetter];
    for (let value of this.state.currWord) {
      if (!guessedLetters.includes(value)) {
        return false;
      }
    }
    return true;
  };

  render() {
    const userGuessedWord = this.guessCorrectWord();
    const resetGamePrompt = this.state.guessCounter === 0 || userGuessedWord;
    const resetGameButton = (
      <button onClick={this.resetGame}>Reset Game!</button>
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
          <p>Number of Guesses Left:</p>
          {this.state.guessCounter}
          <h3>Input</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Please submit 1 letter at a time.
              <br />
              <br />
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                disabled={resetGamePrompt}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <br></br>
          {userGuessedWord && (
            <div>
              <p>Good job! You guessed the word! Restart the game!</p>
              {resetGameButton}
            </div>
          )}
          {this.state.guessCounter === 0 && !userGuessedWord && (
            <div>
              <p>You lost! Try harder next time!</p>
              {resetGameButton}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
