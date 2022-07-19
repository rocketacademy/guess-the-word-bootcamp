import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    var currWord = getRandomWord();
    var uniqueStr = [...new Set(currWord)].join("");
    this.initialState = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: currWord,
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numGuessesLeft: currWord.length + 5,
      // Insert form input state here
      currUserInputCharacter: "",
      correctGuesses: 0,
      uniqueStr: uniqueStr,
      numberOfLetters: uniqueStr.length,
      winningStatus: "",
      // uniqueStr: [...new Set(currWord)].join(""),
      // numberOfLetters: uniqueStr.size,
    };
    this.state = { ...this.initialState };
    // why is it that if i console log this.state.currWord here, i'll get two words?
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (
        this.state.guessedLetters.includes(letter)
        // ||
        // this.state.numGuessesLeft === 0
      ) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  // can do with an arrow function instead

  // handleChange needs to listen for what I'm typing (so 'onChange'), to track currUserInputCharacter
  handleChange = (event) => {
    this.setState((prevState) => {
      return { ...prevState, currUserInputCharacter: event.target.value };
    });
  };

  // handleSubmit needs to update guessedLetters
  // by default, form will handle the submit and we get the letters from the current state
  // event refers to the user's actions
  handleSubmit = (event) => {
    if (this.state.numGuessesLeft === 0) {
      if (window.confirm("No more attempts left. Restart game?")) {
        this.setState({
          ...this.initialState,
          currWord: getRandomWord(),
        });
      } else {
        console.log("User decided not to continue game");
      }
    }
    event.preventDefault();

    if (!this.state.currUserInputCharacter) {
      return;
    }

    if (this.state.uniqueStr.includes(this.state.currUserInputCharacter)) {
      this.setState((prevState) => {
        prevState.correctGuesses += 0.5;
      });
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        guessedLetters: [
          ...prevState.guessedLetters,
          prevState.currUserInputCharacter.toLowerCase(),
        ],
        currUserInputCharacter: "",
        numGuessesLeft: prevState.numGuessesLeft - 1,
        input: "",
      };
    });
  };

  checkHasUserGuessedWord = () => {
    if (this.state.correctGuesses === this.state.numberOfLetters) {
      return true;
    }
    return false;
  };

  resetGame = () => {
    var uniqueStr = [...new Set(currWord)].join("");
    var currWord = getRandomWord();
    this.setState({
      ...this.initialState,
      currWord: currWord,
      numGuessesLeft: currWord.length + 5,
      uniqueStr: uniqueStr,
      numberOfLetters: uniqueStr.length,
    });
  };

  render() {
    let hasUserGuessedWord = this.checkHasUserGuessedWord();

    console.log(hasUserGuessedWord);

    const disableInputTrigger =
      hasUserGuessedWord === true || this.state.numGuessesLeft === 0;

    const resetButton = <button onClick={this.resetGame}>Reset</button>;

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
          {this.state.currUserInputCharacter.toLowerCase()}
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter letters here:{" "}
              <p>
                <input
                  type="text"
                  maxLength="1"
                  onChange={this.handleChange}
                  value={this.state.currUserInputCharacter.toLowerCase()}
                  disabled={disableInputTrigger}
                />
              </p>
            </label>
            <input
              type="submit"
              value="Submit"
              disabled={disableInputTrigger}
            />
          </form>
          <div>
            {hasUserGuessedWord ? (
              <p>Congratulations you guessed the word! {resetButton}</p>
            ) : (
              <p>Guess the word!</p>
            )}
          </div>
          <div>
            {this.state.numGuessesLeft === 0 && !hasUserGuessedWord ? (
              <p>You've run out of tries! {resetButton}</p>
            ) : (
              <p>You have {this.state.numGuessesLeft} guesses left.</p>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
