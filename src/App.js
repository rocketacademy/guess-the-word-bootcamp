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
      guessesLeft: 10,
      // Insert form input state here
      input: "",
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
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const usersCurrentGuess = this.state.input;
    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, usersCurrentGuess],
      guessesLeft: this.state.currWord.includes(usersCurrentGuess)
        ? this.state.guessesLeft
        : this.state.guessesLeft - 1,
      input: "",
    }));
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
          <p>Number of guesses left : {this.state.guessesLeft}</p>
          <h3>Input</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Guess a letter:
              <input
                type="text"
                value={this.state.input}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit your guess" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
