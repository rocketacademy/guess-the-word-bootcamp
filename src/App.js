import React from "react";
// import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      // currWord: getRandomWord(),

      currWord: "dog",
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      // Insert form input state here
      input: "",
      numOfGuessesLeft: 10,
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

  checkIfUserWon = () => {
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) continue;
      else {
        return false;
      }
    }
    return true;
  };
  checkIfUserLost = () => {
    const hasUserWon = this.checkIfUserWon();
    if (!hasUserWon && this.state.numOfGuessesLeft === 0) return true;
  };
  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const guessedLetter = this.state.input.toLowerCase();
    if (guessedLetter) {
      this.setState((prevState) => ({
        guessedLetters: [...prevState.guessedLetters, guessedLetter],
        numOfGuessesLeft: this.state.numOfGuessesLeft - 1,
        input: "",
        // this.setState({
        //   guessedLetters: [...this.state.guessedLetters, guessedLetter],
        //   input: "",
      }));
    }
  };

  render() {
    // console.log(this.state.input);
    // console.log(this.checkIfUserWon());
    // const hasPlayerWon = this.checkIfUserWon();
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
          <h4>You got {this.state.numOfGuessesLeft} guesses left.</h4>
          <h3>Your letter</h3>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              maxLength={1}
              minLength={1}
              name="input"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value={"Submit"} />
          </form>
          {this.checkIfUserWon() && <p>Bravo! You guessed the word!</p>}
          {this.checkIfUserLost() && (
            <p>Oops! No more guesses left, you lose!</p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
