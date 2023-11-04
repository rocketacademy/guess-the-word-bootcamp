import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      numGuessesLeft: 6,
      formInput: "",
      // Insert num guesses left state here
      // Insert form input state here
    };
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

  handleChange = (event) => {
    this.setState({ formInput: event.target.value.toLowerCase() });
    event.preventDefault();
  };

  handleSubmit = (event) => {
    this.setState({
      guessedLetters: [...this.state.guessedLetters, this.state.formInput],
    });

    if (this.state.formInput.length > 1) {
      this.setState({
        guessedLetters: this.state.guessedLetters.slice(
          this.state.guessedLetters.pop
        ),
      });
      alert("Please enter only one letter at a time.");
    } else if (this.state.guessedLetters.includes(this.state.formInput)) {
      alert("You have already guessed this letter.");
    } else if (this.state.currWord.includes(this.state.formInput)) {
      alert(
        `Correct! You have guessed a letter in the word! You have ${this.state.numGuessesLeft} guesses left.`
      );
    } else if (this.state.numGuessesLeft !== 0) {
      this.state.formInput = "";
      alert(
        `Incorrect! You have ${this.state.numGuessesLeft - 1} guesses left.`
      );
      this.setState({ numGuessesLeft: this.state.numGuessesLeft - 1 });
    } else if (this.state.numGuessesLeft === 0) {
      alert(`You have lost! The word was ${this.state.currWord}.`);
    } else {
      alert(`You have lost! The word was ${this.state.currWord}.`);
    }

    event.preventDefault();
  };

  resetGuesses = () => {
    this.setState({
      guessedLetters: [],
      numGuessesLeft: 6,
      currWord: getRandomWord(),
    });
  };

  render() {
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
          <h3>Input</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.formInput}
              onChange={this.handleChange}
            ></input>
          </form>
          {this.state.numGuessesLeft > 1 ? (
            <button onClick={this.handleSubmit}>Submit</button>
          ) : (
            <button onClick={this.handleSubmit} disabled>
              Submit
            </button>
          )}
          <button onClick={this.resetGuesses}>Reset</button>
        </header>
      </div>
    );
  }
}

export default App;
