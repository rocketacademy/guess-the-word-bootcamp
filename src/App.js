import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

import { HangmanImage } from "./HangmanImage.js";
import { SubmissionForm } from "./SubmissionForm.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      guessCompletion: false,
      // Insert num guesses left state here
      numGuessesLeft: 10,
      // Insert form input state here
      guess: "",
    };
  }

  resetGame = () => {
    const currWord = getRandomWord();
    this.setState((state) => {
      return {
        currWord: currWord,
        guessedLetters: [],
        guessCompletion: false,
        numGuessesLeft: 10,
        guess: "",
      };
    });
  };

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

  checkGuessCompletion(guessedLetters) {
    const currWord = this.state.currWord;

    let currWordArray = currWord.split("");
    for (let i = 0; i < currWordArray.length; i++) {
      if (guessedLetters.indexOf(currWordArray[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  // Insert form callback functions handleChange and handleSubmit here
  handleFormChange = (e) => {
    this.setState({
      guess: e,
    });
  };

  handleSubmit(e) {
    // prevent form from making a request to a certain url
    e.preventDefault();
    let numGuessesLeft = this.state.numGuessesLeft;
    console.log(e);
    // const guessValue = e.target.guess.value.toLowerCase();
    const guessValue = e;
    console.log("User's guess:" + guessValue);
    const currGuessedLetters = [...this.state.guessedLetters];
    let updatedGuessCompletion = false;
    if (currGuessedLetters.indexOf(guessValue) === -1) {
      currGuessedLetters.push(guessValue);
      numGuessesLeft--;
      updatedGuessCompletion = this.checkGuessCompletion(currGuessedLetters);
    }

    this.setState({
      guessedLetters: currGuessedLetters,
      numGuessesLeft: numGuessesLeft,
      guessCompletion: updatedGuessCompletion,
    });

    console.log(this.state);
  }

  render() {
    let displayForm;
    if (this.state.numGuessesLeft > 0 && !this.state.guessCompletion) {
      displayForm = (
        <div className="App">
          <h3>Input only one alphabet character</h3>
          <p>Number of guesses left: {this.state.numGuessesLeft}</p>
          <HangmanImage numGuessesLeft={this.state.numGuessesLeft} /> <br />
          <SubmissionForm
            guess={this.state.guess}
            onChange={this.handleFormChange}
            onSubmit={this.handleSubmit}
          />
          {/* <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-item">
              <label htmlFor="guess">Guess:</label>
              <input
                name="guess"
                value={this.state.guess}
                id="guess"
                onChange={(e) => this.handleFormChange(e)}
                maxLength={1}
              />
            </div>

            <button type="submit">Submit </button>
          </form> */}
        </div>
      );
    } else {
      if (this.state.guessCompletion) {
        displayForm = (
          <div className="App">
            <h3>Congratulations! You guessed {this.state.currWord} right!</h3>
            <HangmanImage numGuessesLeft={this.state.numGuessesLeft} />
            <br />
            <button onClick={this.resetGame}>Play again!</button>
          </div>
        );
      } else {
        displayForm = (
          <div className="App">
            <h3> You ran out of guesses. The word is {this.state.currWord}</h3>
            <HangmanImage numGuessesLeft={this.state.numGuessesLeft} />
            <br />
            <button onClick={this.resetGame}>Play again!</button>
          </div>
        );
      }
    }

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
          {displayForm}
        </header>
      </div>
    );
  }
}

export default App;
