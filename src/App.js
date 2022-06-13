import React from "react";
import { getRandomWord, countNumOfUniqueLetters } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    let newWord = getRandomWord();
    this.initialState = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: newWord,
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numOfGuessesLeft: 3,
      // Insert form input state here
      value: "",
      numOfUniqueLetters: countNumOfUniqueLetters(newWord),
      numOfRounds: 1,
      numOfRoundsWon: 0,
    };
    this.state = {
      ...this.initialState,
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
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.currWord.includes(this.state.value)) {
      this.setState({
        ...this.state,
        value: "",
        guessedLetters: [...this.state.guessedLetters, this.state.value],
        numOfUniqueLetters: this.state.numOfUniqueLetters - 1,
      });
    } else {
      this.setState({
        ...this.state,
        value: "",
        numOfGuessesLeft: this.state.numOfGuessesLeft - 1,
        guessedLetters: [...this.state.guessedLetters, this.state.value],
      });
    }
  }

  componentDidUpdate() {
    if (this.state.numOfGuessesLeft === 0) {
      window.alert(
        `You lost! The word was ${this.state.currWord}. 
Stats:
Rounds Played: ${this.state.numOfRounds} 
Rounds Won: ${this.state.numOfRoundsWon}`
      );
      const newWord = getRandomWord();
      this.setState({
        ...this.initialState,
        currWord: newWord,
        numOfRounds: this.state.numOfRounds + 1,
        numOfUniqueLetters: countNumOfUniqueLetters(newWord),
      });
      return;
    }

    if (this.state.numOfUniqueLetters === 0) {
      window.alert(
        `You won! The word is ${this.state.currWord}!
Stats:
Rounds Played: ${this.state.numOfRounds}
Rounds Won: ${this.state.numOfRoundsWon + 1}`
      );
      const newWord = getRandomWord();
      this.setState({
        ...this.initialState,
        currWord: newWord,
        numOfRounds: this.state.numOfRounds + 1,
        numOfRoundsWon: this.state.numOfRoundsWon + 1,
        numOfUniqueLetters: countNumOfUniqueLetters(newWord),
      });
      return;
    }
  }

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
          <h3>Input</h3>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              maxLength={1}
            />
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
