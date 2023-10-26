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
      numGuesses: 9,
      // Insert form input state here
      input: "",
      score: 0,
    };
  }

  resetGame = () => {
    const guessedWord = this.state.guessedLetters.join("");
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuesses: 9,
      input: "",
      score:
        this.state.currWord === guessedWord
          ? this.state.score + 1
          : this.state.score,
    });
  };

  generateWordDisplay = () => {
    const wordDisplay = [];
    const guessedWord = this.state.guessedLetters.join("");

    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }

    if (guessedWord === this.state.currWord) {
      console.log("you won");
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const inputLetter = this.state.input.toLowerCase();

    // if input letter is not in the current guessedLetters array
    if (inputLetter && !this.state.guessedLetters.includes(inputLetter)) {
      this.setState((prevState) => ({
        guessedLetters: [...prevState.guessedLetters, inputLetter],
      }));
    }

    // if input letter is not part of the currWords string and decrement numGuesses
    if (!this.state.currWord.includes(inputLetter)) {
      this.setState((prevState) => ({
        numGuesses: prevState.numGuesses - 1,
      }));
    }

    // Clear the input field after submission
    this.setState({ input: "" });
  };

  winOrLose = (e) => {
    const guessedWord = this.state.guessedLetters.join("");
    if (guessedWord === this.state.currWord) {
      console.log("Winner!");
      return (
        <div>
          <p>You won! Congraulations 🥳</p>
        </div>
      );
    } else if (this.state.numGuesses === 0) {
      return (
        <div>
          <p>You lost! Try again? 😄</p>
        </div>
      );
    } else {
      return;
    }
  };

  render() {
    console.log(this.state.currWord);
    // console.log(this.state.numGuesses);

    const guessedWord = this.state.guessedLetters.join("");
    console.log(guessedWord);

    const isGameWon = guessedWord === this.state.currWord;
    const isGameOver = this.state.numGuesses === 0;

    console.log(this.state.score);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          {/* <h3>Score:{this.state.score}</h3> */}
          <h3>Word Display</h3>
          <h3>{this.state.score}</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <div>Num guesses left: {this.state.numGuesses}</div>
          <h3>Input</h3>
          {/* Insert form element here */}
          Please submit 1 letter at a time.
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="input"
              value={this.state.input}
              onChange={this.handleChange}
              disabled={
                guessedWord === this.state.currWord ||
                this.state.numGuesses === 0
                  ? true
                  : false
              }
            />
            {/* <input disabled={true} /> */}
            <input
              type="submit"
              value="submit"
              disabled={
                guessedWord === this.state.currWord ||
                this.state.numGuesses === 0
                  ? true
                  : false
              }
            />
            {this.winOrLose()}
            <div>
              {isGameWon || isGameOver ? (
                <button onClick={this.resetGame}>
                  Click here to play again! 🎮
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
