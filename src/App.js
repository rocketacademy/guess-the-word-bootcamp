import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Restart from "./Restart";

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
      remainingGuess: 10,
      // Insert form input state here
      userInput: "",
    };
    this.handleUserInput = this.handleUserInput.bind(this);
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

  isWordGuessed = () => {
    const userInputLetters = [...this.state.guessedLetters];
    for (let alphabet of this.state.currWord) {
      if (!userInputLetters.includes(alphabet)) {
        return false;
      }
    }
    return true;
  };

  restart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      remainingGuess: 10,
      userInput: "",
    });
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleUserInput(e) {
    this.setState({
      userInput: e.target.value,
    });
  }

  handleSubmit(event) {
    // alert("A letter was submitted: " + this.state.userInput);
    event.preventDefault();

    // If userInput is empty, no action to be taken
    if (!this.state.userInput) {
      return;
    }

    // If userInput already exists in the list of guessed letters, nothing happens and just clear the input field
    if (this.state.guessedLetters.includes(this.state.userInput)) {
      console.log("here", this.state.guessedLetters);
      this.setState({
        userInput: "",
      });
    } else {
      const newLetter = this.state.userInput.toLowerCase();

      //after Submit is clicked: push the input into guessed letters, deduct one from remaining guesses, clear the input field,
      this.setState({
        guessedLetters: [...this.state.guessedLetters, newLetter],
        remainingGuess: this.state.remainingGuess - 1,
        userInput: "",
      });
    }
  }

  render() {
    const gameOver = this.state.remainingGuess === 0 || this.isWordGuessed();
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
          <p>You have {this.state.remainingGuess} guesses left.</p>
          <h3>Input</h3>
          {/* Insert form element here */}
          Enter one letter at a time.
          <br />
          {!gameOver && (
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleUserInput}
                type="text"
                value={this.state.userInput}
                maxLength={1}
              />
              <input type="submit" value="Submit" />
            </form>
          )}
          {gameOver && <p>Game Over! The word is {this.state.currWord}.</p>}
          {this.state.remainingGuess === 0 && <p>You ran out of tries!</p>}
          {this.isWordGuessed() && <p>Yay you got it!</p>}
          <Restart gameStatus={gameOver} action={this.restart} />
        </header>
      </div>
    );
  }
}

export default App;
