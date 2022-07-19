import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const numStartGuesses = 10;

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
      numGuessesLeft: numStartGuesses,
      // Insert form input state here
      currUserInputCharacter: "",
    };
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
    event.preventDefault();

    if (!this.state.currUserInputCharacter) {
      return;
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

  render() {
    // console.log(
    //   "The current word is " +
    //     this.state.currWord +
    //     " and the number of guesses left is " +
    //     this.state.numGuessesLeft
    // );
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
          <h3>You have {this.state.numGuessesLeft} guesses left.</h3>
          <h3>Input</h3>
          {this.state.currUserInputCharacter.toLowerCase()}
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter letters here:
              <input
                type="text"
                maxLength="1"
                onChange={this.handleChange}
                value={this.state.currUserInputCharacter.toLowerCase()}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
