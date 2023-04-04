import React from "react";
// import { getRandomWord } from "./utils.js";
import "./App.css";

// Checklist:

// 2 problems here: 1. when restart button pressed, alert for "if (!/^[a-zA-Z]$/.test(this.state.letter)) {alert("Invalid input. Please input only ONE letter.");" POPS UP
//                  ***** 2. winning condition not working.*****
// *** don't forget to put back getRandomWord throughout this App.js including import and in the constructor props and in restart function to put this back to original game mode.

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      // currWord: getRandomWord(),
      currWord: "reuben",
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      letter: "",
      numberOfGuesses: 10,
      winLose: "",
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else if (this.state.winLose === "Sorry, you've lost the game") {
        return this.state.currWord;
      } else {
        wordDisplay.push("_");
      }
    }

    return wordDisplay.toString();
  };

  declareGameWinOrLose = () => {
    if (this.state.wordDisplay === this.state.currWord) {
      this.setState({
        winLose: "Congrats, you've won the game",
      });
    } else if (
      this.state.numberOfGuesses === 1 &&
      this.state.wordDisplay !== this.state.currWord
    ) {
      this.setState({
        winLose: "Sorry, you've lost the game",
      });
    } else {
      return null;
    }
  };

  onSubmit = (e) => {
    this.declareGameWinOrLose();
    e.preventDefault();

    if (this.state.numberOfGuesses === 0) {
      return;
    }
    if (this.state.letter.length > 1) {
      // alert("Invalid input. Please input only 1 letter.");
      return;
    }
    if (this.state.guessedLetters.includes(this.state.letter) === true) {
      // alert("You have guessed this letter already. Please try another letter");
      return;
    }

    if (!/^[a-zA-Z]$/.test(this.state.letter)) {
      // alert("Invalid input. Please input only ONE letter.");
      return;
    }

    if (this.state.letter !== String(this.state.letter).toLowerCase()) {
      // alert("Invalid input. Please input only lowercase letter.");
      return;
    }
    alert("Submitted letter:" + " " + this.state.letter);

    this.setState({
      numberOfGuesses: this.state.numberOfGuesses - 1,
      letter: "",
      guessedLetters: [...this.state.guessedLetters, this.state.letter],
    });
    if (this.state.numberOfGuesses === 1) {
      alert("you have no more guesses left!");
    }
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  // handleRestart = () => {
  //   this.restartGame();
  // };

  restartGame = () => {
    this.setState({
      currWord: "reuben",
      guessedLetters: [],
      letter: "",
      numberOfGuesses: 10,
      winLose: "",
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.numberOfGuesses > 0) {
  //     return;
  //   }
  //   if (
  //     prevState.winLose === "Congrats, you've won the game" ||
  //     prevState.winLose === "Sorry, you've lost the game"
  //   ) {
  //     this.restartGame();
  //   }
  // }

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

          {/* <Form /> */}
          <form onSubmit={this.onSubmit}>
            <h5>number of guesses left: {this.state.numberOfGuesses}</h5>
            <label>Guess the next letter:</label>
            <input
              type="text"
              name="letter"
              value={this.state.letter}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="submit" />
            <br />
            <br />
            <button onClick={this.restartGame}> Restart </button>
            <br />
            <h3>{this.state.winLose}</h3>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
