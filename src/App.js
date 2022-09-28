import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const maxGuesses = 10;

function isCorrectWord(guessedLetters, currWord) {
  // Check whether all letters in currWord are found in the guessedLetters array
  for (let i = 0; i < currWord.length; i++) {
    if (!guessedLetters.includes(currWord[i])) return false;
  }

  return true;
}

function DisplayResult({ guessedLetters, currWord, guessesLeft }) {
  if (!isCorrectWord(guessedLetters, currWord)) {
    if (guessesLeft) {
      return <p></p>;
    } else {
      return (
        <p>
          You have used up all guesses. <br /> The correct word is {currWord}.
        </p>
      );
    }
  }

  return <p>You have correctly guessed the word!</p>;
}

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      guessesLeft: maxGuesses, // num guesses left state
      value: "", // form input state
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
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let [newLetter] = this.state.value;
    const haha = [...this.state.guessedLetters, newLetter];
    alert("You submitted: " + haha + "; word is: " + this.state.currWord);
    event.preventDefault();
    this.setState((previousState) => ({
      guessedLetters: [...previousState.guessedLetters, newLetter],
      guessesLeft: previousState.currWord.includes(previousState.value)
        ? previousState.guessesLeft
        : previousState.guessesLeft - 1,
      value: "",
    }));
  }

  resetGame = () => {
    this.setState({
      // Reset the whole game to let user play again
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: maxGuesses,
      value: "",
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
          <p>Num guesses left: {this.state.guessesLeft}</p>
          <h3>Input</h3>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <label>
              Please submit one letter at a time: <br />
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              disabled={
                !this.state.guessesLeft ||
                isCorrectWord(this.state.guessedLetters, this.state.currWord)
                  ? true
                  : false
              }
            />
          </form>
          <DisplayResult
            guessedLetters={this.state.guessedLetters}
            currWord={this.state.currWord}
            guessesLeft={this.state.guessesLeft}
          />
        </header>
      </div>
    );
  }
}

export default App;
