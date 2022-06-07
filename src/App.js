import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.initialState = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: [...getRandomWord().split("")],
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      numGuessesLeft: 5,
      userInputWord: "",
    };
    this.state = { ...this.initialState };
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

  handleChange = (event) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        userInputWord: event.target.value,
      };
    });
    return;
  };

  handleSubmit = (event) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        guessedLetters: [...prevState.guessedLetters, this.state.userInputWord],
        attemptsLeft: prevState.attemptsLeft - 1,
        userInputWord: "",
      };
    });
    event.preventDefault();
    return;
  };

  // Insert form callback functions handleChange and handleSubmit here

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
          <form>
            <label>letters:</label>
            <div>
              <input
                type="text"
                value={this.state.userInputWord}
                onChange={this.handleChange}
              />
              <input type="submit" value="submit" onClick={this.handleSubmit} />
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
