import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    const currWord = getRandomWord();
    this.initialState = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: currWord,
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      attemptsLeft: currWord.length + 5,
      currInputWord: "",
      rounds: 0,
      score: 0,
      guessedWord: "",
    };
    this.state = { ...this.initialState };
  }

  calculateAttemptsLeft = (word) => {
    return word.length + 5;
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

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currInputWord: event.target.value,
      };
    });

    return;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const wordGuessed = [];

    if (this.state.currWord.includes(this.state.currInputWord)) {
      for (let letter of this.state.currWord) {
        if (this.state.currInputWord.includes(letter)) {
          wordGuessed.push(letter);
        } else if (this.state.guessedLetters.includes(letter)) {
          wordGuessed.push(letter);
        } else {
          wordGuessed.push("_");
        }
      }

      this.setState((prevState) => {
        return {
          ...prevState,
          currInputWord: "",
          guessedLetters: [
            ...prevState.guessedLetters,
            this.state.currInputWord,
          ],
          guessedWord: wordGuessed.join(""),
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          currInputWord: "",
          attemptsLeft: prevState.attemptsLeft - 1,
          guessedLetters: [
            ...prevState.guessedLetters,
            this.state.currInputWord,
          ],
        };
      });
    }

    if (this.state.guessedWord === this.state.currWord) {
      const newWord = getRandomWord();
      this.setState({
        ...this.initialState,
        currWord: newWord,
        attemptsLeft: this.calculateAttemptsLeft(newWord),
        rounds: this.state.rounds + 1,
        score: this.state.score + 1,
      });
      return;
    } else if (this.state.attemptsLeft === 0) {
      const newWord = getRandomWord();
      this.setState({
        ...this.initialState,
        currWord: newWord,
        attemptsLeft: this.calculateAttemptsLeft(newWord),
        rounds: this.state.rounds + 1,
      });
      return;
    }
  };

  score = (event) => {};

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
          <form onSubmit={this.handleSubmit}>
            <label>Make a guess</label>
            <div>
              <input
                type="text"
                value={this.state.currInputWord}
                onChange={this.handleChange}
              ></input>
            </div>
            <input type="submit" value="submit" />
          </form>
          <h3>Score</h3>
          {this.state.score} / {this.state.rounds}
        </header>
      </div>
    );
  }
}

export default App;
