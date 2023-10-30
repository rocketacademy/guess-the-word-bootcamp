import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Form from "./Components/Form";

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
      numGuessLeft: 10,
      // Insert form input state here
      currInput: "",
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
      currInput: event.target.value,
    });
  };

  handleSubmit = (event) => {
    let { currInput, guessedLetters } = this.state;
    event.preventDefault();
    if (currInput === "") {
      alert("Please input a letter");
    } else if (!guessedLetters.includes(currInput)) {
      this.setState({
        guessedLetters: [...guessedLetters, currInput.toUpperCase()],
        currInput: "",
      });
    }
  };

  render() {
    let { currInput } = this.state;
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

          <Form
            value={currInput}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </header>
      </div>
    );
  }
}

export default App;
