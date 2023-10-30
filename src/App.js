import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TOTALGUESS = 7;
const numGuessesArray = [];
for (let i = TOTALGUESS; i >= 0; i--) {
  numGuessesArray.push(i);
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
      // Insert num guesses left state here
      numGuesses: TOTALGUESS,
      // Insert form input state here
      formInput: "",
      scores: 0,
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
    this.setState({ formInput: event.target.value });
  };

  handleSubmit = (event) => {
    //make sure it doesn't reset
    event.preventDefault();

    //check how many input is given, has to be exactly 1
    if (this.state.formInput.length === 0 || this.state.formInput.length > 1) {
      return;
    }
    //check whether it is alphabet

    //make to lowercase
    const lowerCaseFormInput = this.state.formInput.toLowerCase();

    //save the state
    this.setState((prevState) => ({
      guessedLetters: [...prevState.guessedLetters, lowerCaseFormInput],

      numGuesses: this.state.currWord.includes(lowerCaseFormInput)
        ? this.state.numGuesses
        : this.state.numGuesses - 1,
      formInput: "",
    }));
  };

  checkGuess = () => {
    for (let char of this.state.currWord) {
      if (!this.state.guessedLetters.includes(char)) {
        return false;
      }
    }

    return true;
  };

  reset = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuesses: TOTALGUESS,
      formInput: "",
    });
  };

  render() {
    const hasUserGuessedWord = this.checkGuess();
    const gameEnd = this.state.numGuesses === 0 || hasUserGuessedWord;
    const gameReset = (
      <button className="btn btn-dark" onClick={this.reset}>
        Reset
      </button>
    );
    const imgSrc = require(`./JPG/${this.state.numGuesses}.png`);
    console.log(imgSrc);

    return (
      <div className="container">
        <div
          className="row d-flex align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-6">
            <img
              src={imgSrc}
              alt={`Guesses left: ${this.state.numGuesses}`}
              style={{ height: "400px" }}
            />
          </div>
          <div className="col-6 ">
            <h1>Guess The Word 🚀</h1>
            <br />
            <h1>{this.generateWordDisplay()}</h1>

            <p>Number of guesses left: {this.state.numGuesses}</p>
            <p>
              Guessed Letters:{" "}
              {this.state.guessedLetters.length > 0
                ? this.state.guessedLetters.toString()
                : "-"}
            </p>

            {/* Insert form element here */}
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.formInput}
                onChange={this.handleChange}
                disabled={gameEnd}
              />
              <input type="submit" value="submit" disabled={gameEnd} />
            </form>

            <p>Overall score: {this.state.scores}</p>
            {hasUserGuessedWord && (
              <div>
                <h1>Congrats!</h1>
                {gameReset}
              </div>
            )}
            {!hasUserGuessedWord && this.state.numGuesses < 1 && (
              <div>
                <h1>Try again </h1>
                <p>The word is {this.state.currWord}</p>
                {gameReset}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
