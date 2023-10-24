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
      numGuess: 10,
      userWord: "",
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

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({ userWord: value });
  };

  handleSubmit = (e) => {
    let { userWord } = this.state;
    e.preventDefault();
    this.setState({
      userWord: "",
      guessedLetters: [...this.state.guessedLetters, userWord],
      numGuess: this.state.numGuess - 1,
    });
  };

  // and handleSubmit here

  render() {
    const inputGuess = (
      <form onSubmit={this.handleSubmit}>
        <label></label>
        <input
          type="text"
          value={this.state.userWord}
          onChange={this.handleChange}
          maxLength={1}
        />
        <input type="submit" value="Guess!" />
      </form>
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
          <h3>Guess letter left: {this.state.numGuess}</h3>
          <h3>Input</h3>
          {inputGuess}
        </header>
      </div>
    );
  }
}

export default App;
