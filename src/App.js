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
      // Insert num guesses left state here
      // Insert form input state here
      guessValue: "",
      inputWarning: null,
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
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.guessValue.length !== 1) {
      this.setState({ inputWarning: <p>Only one letter is allowed</p> });
    } else if (this.state.guessedLetters.includes(this.state.guessValue)) {
      this.setState({
        inputWarning: <p>You have already guessed this letter</p>,
      });
    } else {
      this.setState({
        guessedLetters: [...this.state.guessedLetters, this.state.guessValue],
        guessValue: "",
        inputWarning: null,
      });
    }
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const remainingGuesses =
      this.state.currWord.length * 2 - this.state.guessedLetters.length;

    const form = (
      <div>
        <h3>Input</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Type your guess here: </label>
          <input
            type="text"
            name="guessValue"
            value={this.state.guessValue}
            onChange={this.handleChange}
          />
          <br />
          {this.state.inputWarning !== undefined && this.state.inputWarning}
          <input type="submit" value="submit" />
        </form>
      </div>
    );

    const currWordDisplay = this.generateWordDisplay();

    const retry = (
      <div>
        <h3>Game over</h3>
        <p>
          {currWordDisplay.includes("_")
            ? "Better luck next time"
            : "Good job!"}
        </p>
        <button onClick={this.refreshPage}>Try again</button>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {remainingGuesses > 0 && currWordDisplay.includes("_")
            ? currWordDisplay
            : this.state.currWord}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>Remaining guesses: {remainingGuesses}</h3>

          {/* Insert form element here */}
          {remainingGuesses > 0 && currWordDisplay.includes("_") ? form : retry}
        </header>
      </div>
    );
  }
}

export default App;
