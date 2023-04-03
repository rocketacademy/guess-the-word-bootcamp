import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
// import Form from "./Forms.js";

// Checklist:
// 1. Show what the word is after number of guesses have run out.

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      letter: "",
      numberOfGuesses: 10,
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
    if (this.state.numberOfGuesses === 0) {
      wordDisplay = [...this.state.currWord];
    }
    return wordDisplay.toString();
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.numberOfGuesses === 0) {
      return;
    }
    if (this.state.letter.length > 1) {
      alert("Invalid input. Please input only 1 letter.");
      return;
    }

    alert("Submitted letter:" + " " + this.state.letter);

    this.setState({
      numberOfGuesses: this.state.numberOfGuesses - 1,
      letter: "",
      guessedLetters: [...this.state.guessedLetters, this.state.letter],
    });
    if (this.state.numberOfGuesses === 1) {
      alert("you have no more guesses left!");
    }
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
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

          {/* <Form /> */}
          <form onSubmit={this.onSubmit}>
            <h5>number of guesses left: {this.state.numberOfGuesses}</h5>
            <label>Guess the next letter:</label>
            <input
              type="text"
              name="letter"
              value={this.state.letter}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
