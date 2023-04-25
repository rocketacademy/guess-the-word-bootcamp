import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const totalGuesses = 10;

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
      guessesLeft: totalGuesses,
      // Insert form input state here
      value: "",
      numRounds: 0,
      numCorrectGuesses: 0,
      showWord: false,
      gameOve: false,
    };
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({ value: event.target.value });
  };
  handleSubmit = (event) => {
    // alert("An essay was submitted: " + this.state.value);
    event.preventDefault();
    // Lowercase
    const inputValue = this.state.value[0].toLowerCase();
    if (!isNaN(inputValue)) {
      alert("Please enter a letter!");
      return; // exit function if input value is a number
    }

    this.setState((state) => ({
      // Use previous state (not this.state) to generate the new state for guessedLetters
      // Use spread operator with new array so React knows to re-render
      guessedLetters: [...state.guessedLetters, inputValue],
      // Reduce num guesses left if the user guessed wrongly
      guessesLeft: this.state.currWord.includes(inputValue)
        ? this.state.guessesLeft
        : this.state.guessesLeft - 1,
      // Reset input field
      value: "",
    }));

    if (this.checkAnswer(inputValue)) {
      this.setState((state) => ({
        numCorrectGuesses: state.numCorrectGuesses + 1,
      }));
      //   this.resetGame(true);
      // } else if (this.state.guessesLeft === 1) {
      //   this.resetGame(false);
    }
  };

  checkAnswer = (inputValue) => {
    // Create new array with spread operator because we do not wish to alter this.state.guessedLetters
    const guessedLetters = [...this.state.guessedLetters, inputValue];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    // Return true if guessedLetters contains all letters in this.state.currWord
    return true;
  };

  resetGame = (guessedCorrectly) => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: totalGuesses,
      input: "",
      numRounds: this.state.numRounds + 1,
      numCorrectGuesses: guessedCorrectly
        ? this.state.numCorrectGuesses + 1
        : this.state.numCorrectGuesses,
      showWord: false,
      gameOver: true,
    });
  };

  render() {
    const hasGotAnswer = this.checkAnswer();
    const shouldDisableInput = hasGotAnswer || this.state.guessesLeft === 0;
    const playAgainButton = (
      <button onClick={this.resetGame}>Play Again</button>
    );
    const showWordText = <p>The word was: {this.state.currWord}</p>;
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
          <h5>
            {hasGotAnswer && (
              <div>
                <p>You've guessed the word!</p>
                {playAgainButton}
              </div>
            )}

            {this.state.guessesLeft === 0 && !hasGotAnswer && (
              <div>
                <p>No more guesses left!</p>
                {showWordText}
                {playAgainButton}
              </div>
            )}
          </h5>

          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                disabled={shouldDisableInput}
              />
            </label>
            <input type="submit" value="Submit" disabled={shouldDisableInput} />
          </form>

          <h6>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th colspan="3">Score Board 🎯</th>
                </tr>
                <tr>
                  <th>Guesses left</th>
                  <th>Correct Guesses</th>
                  <th>Rounds Played</th>
                </tr>{" "}
              </thead>
              <tbody>
                <tr>
                  <td> {this.state.guessesLeft}</td>
                  <td> {this.state.numCorrectGuesses}</td>
                  <td> {this.state.numRounds}</td>{" "}
                </tr>
              </tbody>{" "}
            </Table>
          </h6>
        </header>
      </div>
    );
  }
}

export default App;
