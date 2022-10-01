import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      /* currWord: getRandomWord(), */
      currWord: "wear",
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numOfGuesses: 10,
      // Insert form input state here
      input: "",
      guessedWord: false,
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
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let userInput = this.state.input;
    let guesses = [...this.state.guessedLetters];
    let correctWord = [...this.state.currWord];
    guesses.push(userInput);

    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, userInput],
      input: "",
      numOfGuesses: this.state.numOfGuesses + -1,
    }));
    console.log(this.state.numOfGuesses);

    if (guesses.includes(...correctWord)) {
      this.setState({ guessedWord: true });
    }
  }

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numOfGuesses: 10,
      input: "",
      guessedWord: false,
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
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
