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
      // Insert form input state here
      currentGuessedLetter: "",
      turnCount: 10,
      winStatus: false,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.generateWordDisplay = this.generateWordDisplay.bind(this);
  }

  guessedLettersDisplay = () => {
    let guessedLettersString = this.state.guessedLetters
      .toString()
      .toUpperCase()
      .replace(/,/g, "  ");
    return guessedLettersString;
  };

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("-");
      }
    }
    if (this.state.winStatus === false) {
      if (!wordDisplay.includes("-")) {
        this.setState({
          winStatus: true,
        });
      }
    }

    return wordDisplay.toString().replace(/,/g, "");
  };

  restartGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      currentGuessedLetter: "",
      turnCount: 10,
      winStatus: false,
    });
  };

  restartButton = () => {
    if (this.state.turnCount === 0 || this.state.winStatus === true) {
      return <button onClick={(e) => this.restartGame(e)}>Restart</button>;
    }
  };

  winLoseDisplay = () => {
    if (this.state.turnCount === 0) {
      return `You lose!`;
    }
    if (this.state.winStatus === true) {
      return `You win!`;
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    // for (let letter of this.state.currWord) {
    //   if (this.state.guessedLetters.includes(letter)) {
    //     this.setState((state) => ({
    //       wordDisplay: [...state.wordDisplay, letter],
    //     }));
    //   } else {
    //     this.setState((state) => ({
    //       wordDisplay: [...state.wordDisplay, "-"],
    //     }));
    //   }
    // }
    if (this.state.guessedLetters.includes(this.state.currentGuessedLetter)) {
    } else {
      if (!this.state.currWord.includes(this.state.currentGuessedLetter)) {
        this.setState({
          turnCount: this.state.turnCount - 1,
        });
      }
      this.setState({
        guessedLetters: [
          ...this.state.guessedLetters,
          this.state.currentGuessedLetter,
        ],
      });

      this.setState({
        currentGuessedLetter: "",
      });
      console.log(this.state);
    }
  }

  handleFormChange(e) {
    this.setState({
      currentGuessedLetter: e.target.value.replace(/[^a-z]/gi, ""),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3
            className={
              this.state.turnCount < 1 || this.state.winStatus === true
                ? "hidden"
                : undefined
            }
          >
            Input
          </h3>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className={
              this.state.turnCount < 1 || this.state.winStatus === true
                ? "hidden"
                : undefined
            }
          >
            <input
              maxLength="1"
              name="currentGuessedLetter"
              type="text"
              value={this.state.currentGuessedLetter}
              onChange={(e) => this.handleFormChange(e)}
            ></input>
            <button type="submit">Submit</button>
          </form>
          <h3>Guessed Letters</h3>
          <pre>{this.guessedLettersDisplay()}</pre>
          <h3>Wrong Guesses Left</h3>
          {this.state.turnCount}
          <br></br>
          <br></br>
          <p style={{ fontSize: "35px" }}>
            <b>{this.winLoseDisplay()}</b>
          </p>
          {this.restartButton()}
        </header>
      </div>
    );
  }
}

export default App;
