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
      inputValue: "",
      guessLeft: -1,
      init: false,
      played: 0,
      won: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const { inputValue, guessLeft } = this.state;

    if (
      inputValue === "" ||
      inputValue.toUpperCase() === inputValue.toLowerCase()
    ) {
      alert("Please enter a proper letter first.");
    } else {
      const letter = inputValue[0].toLocaleLowerCase();
      let repeatCheck = false;
      for (let gLetter of this.state.guessedLetters) {
        if (gLetter === letter) {
          repeatCheck = true;
          alert("You have guessed this letter before!");
        }
      }

      if (repeatCheck === false) {
        this.setState({
          guessedLetters: [...this.state.guessedLetters, letter],
          inputValue: "",
          guessLeft: guessLeft - 1,
        });
      }
    }

    // for...of is a string and array iterator that does not use index
  }

  initialiseGuess = () => {
    const num = this.state.currWord.length;
    this.setState({
      guessLeft: num + 7,
      init: true,
    });
  };

  hasWon = () => {
    const guessedLetters = [...this.state.guessedLetters];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };
  correctGuess=()=>{
    const {guessLeft,currWord}=this.state;
    const guessedLetters = [...this.state.guessedLetters];
    let correctGuess=0;
    for (let letter of this.state.currWord) {
      if (guessedLetters.includes(letter)){
        correctGuess++;
      }
    }
    const wrongGuess=currWord.length+7-guessLeft-correctGuess;
    return [correctGuess, wrongGuess]
  }
  //generate a new state

  generateWordDisplay = () => {
    const wordDisplay = [];
    const { guessLeft, currWord } = this.state;
    const hasPlayerWon = this.hasWon();
    // for...of is a string and array iterator that does not use index
    if (!hasPlayerWon && guessLeft !== 0) {
      for (let letter of currWord) {
        if (this.state.guessedLetters.includes(letter)) {
          wordDisplay.push(letter);
        } else {
          wordDisplay.push("_");
        }
      }

      return wordDisplay.toString();
    } else {
      return currWord.toString();
    }
  };
  restartGame = () => {
    const hasPlayerWon = this.hasWon();
    if (hasPlayerWon) {
      this.setState({
        currWord: getRandomWord(),

        guessedLetters: [],

        inputValue: "",
        guessLeft: -1,
        init: false,
        played: this.state.played + 1,
        won: this.state.won + 1,
      });
    } else {
      this.setState({
        currWord: getRandomWord(),

        guessedLetters: [],

        inputValue: "",
        guessLeft: -1,
        init: false,
        played: this.state.played + 1,
      });
    }
  };

  // Insert form callback functions handleChange and handleSubmit here

  render() {
    const { guessLeft, played, won } = this.state;
    const playerHasWon = this.hasWon();
    const [cGuess, wGuess]= this.correctGuess();
    const startGame = () => {
      if (this.state.init) {
        return (
          <div>
            <h3>Guessed Letters</h3>

            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
            <h3>Input</h3>
            {playerHasWon || guessLeft === 0 ? (
              <div></div>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="inputValue"
                    value={this.state.inputValue}
                    maxLength="1"
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
            )}
            <h5>You have guessed {cGuess} letters correctly and {wGuess} letters wrongly</h5>
            <h5>You have {this.state.guessLeft} guesses left.</h5>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <button onClick={this.initialiseGuess}>Start game</button>
            <br />
            You have won {won} out of {played} games so far.
          </div>
        );
      }
    };
    const displayResult = () => {
      if (playerHasWon) {
        return (
          <div>
            Congratulations! You have guessed the word correctly
            <br />
            <button onClick={this.restartGame}>Replay</button>
          </div>
        );
      } else if (guessLeft === 0) {
        return (
          <div>
            Out of guesses! Please try again.
            <br />
            <button onClick={this.restartGame}>Replay</button>
          </div>
        );
      } else {
        return <div></div>;
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>

          {this.generateWordDisplay()}

          {startGame()}
          {displayResult()}
        </header>
      </div>
    );
  }
}

export default App;
