import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      // use getRandomWord()
      currWord: "test",
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
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.warning.moreThanOneLetter === false) {
      this.setState({
        guessedLetters: [...this.state.guessedLetters, this.state.currLetter],
        guessesLeft: this.state.guessesLeft - 1,
      });
    }
  };

  handleChange = (e) => {
    if (e.target.value.length >= 2) {
      this.setState({
        warning: { ...this.state.warning, moreThanOneLetter: true },
      });
    } else {
      this.setState({
        currLetter: e.target.value,
        warning: { ...this.state.warning, moreThanOneLetter: false },
      });
    }
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
            <label>
              Guess:
              <input type="text" name="guess" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {<div>Guesses Left: {this.state.guessesLeft}</div>}
          {this.state.warning.moreThanOneLetter && (
            <div>You can only guess one letter at a time.</div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
