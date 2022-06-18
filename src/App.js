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
      currWordSet: new Set(currWord),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      attemptsLeft: 10,
      currInputWord: "",
      numOfRoundPlayed: 0,
      numOfWordsGuessCorrect: 0,
      correctGuessed: new Set(),
      message: "",
    };
    this.state = { ...this.initialState };
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
    this.setState((prevState) => {
      return {
        ...prevState,
        currInputWord: event.target.value,
      };
    });
    return;
  };

  componentDidUpdate() {
    const newWord = getRandomWord();

    if (this.state.correctGuessed.size === this.state.currWordSet.size) {
      let win = true;
      this.setState({
        ...this.initialState,
        currWord: newWord,
        currWordSet: new Set(newWord),
        numOfRoundPlayed: this.state.numOfRoundPlayed + 1,
        numOfWordsGuessCorrect: this.state.numOfWordsGuessCorrect + 1,
        correctGuessed: new Set(),
        message: `You won! The word is ${this.state.currWord}`,
      });
      if (win) {
        alert("You won!");
      }
      return;
    } else if (this.state.attemptsLeft === 0) {
      this.setState({
        ...this.initialState,
        currWord: newWord,
        currWordSet: new Set(newWord),
        numOfRoundPlayed: this.state.numOfRoundPlayed + 1,
        numOfWordsGuessCorrect: this.state.numOfWordsGuessCorrect,
        correctGuessed: new Set(),
        message: `No attempt left! The word is ${this.state.currWord}`,
      });
      return;
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.guessedLetters.includes(this.state.currInputWord)) {
      alert("Letter used, please enter another letter");
      this.setState((prevState) => {
        return {
          ...prevState,
          currInputWord: "",
        };
      });
    } else if (this.state.currWord.includes(this.state.currInputWord)) {
      this.setState((prevState) => {
        return {
          ...prevState,
          currInputWord: "",
          guessedLetters: [
            ...prevState.guessedLetters,
            this.state.currInputWord,
          ],
          correctGuessed: this.state.correctGuessed.add(
            this.state.currInputWord
          ),
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

    return;
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
          <table>
            <tr>
              <th>Rounds Played</th>
              <th>Correct Guesses</th>
            </tr>
            <tr>
              <td>{this.state.numOfRoundPlayed}</td>
              <td>{this.state.numOfWordsGuessCorrect}</td>
            </tr>
            <tr>
              <td>{this.state.message}</td>
            </tr>
          </table>
          <h3>Input</h3>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <label>Make a guess</label>
            <div>
              <input
                type="text"
                value={this.state.currInputWord}
                onChange={this.handleChange}
                maxLength="1"
                pattern="[a-z]"
                placeholder="enter a letter from a - z"
                required
              ></input>
            </div>
            <input type="submit" value="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;

//   if (window.confirm("No more attempt left, restart the game?")) {
//     const newWord = getRandomWord();
//     this.setState({
//       ...this.initialState,
//       currWord: newWord,
//     });
//   } else {
//     console.log("user decided not to restart the game");
//   }
//   return;
// }
