import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { blueGrey, red } from "@mui/material/colors";

const numGuesses = 8;

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
      guessesLeft: numGuesses,
      // Insert form input state here
      input: "",
      // state for number of rounds played here
      numOfRounds: 0,
      // Insert number of rounds won here
      numOfRoundsWon: 0,
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

  isInputAlphabet = (guess) => {
    const acceptedLetters = /[a-zA-Z]/;
    if (guess.match(acceptedLetters)) {
      return true;
    } else {
      return false;
    }
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.input) {
      return true;
    }
    const usersCurrentGuess = this.state.input[0];
    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, usersCurrentGuess],
      guessesLeft: this.state.currWord.includes(usersCurrentGuess)
        ? this.state.guessesLeft
        : this.state.guessesLeft - 1,
      input: "",
    }));
  };

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      input: "",
      guessedLetters: [],
      guessesLeft: numGuesses,
      // update state of number of wins across rounds here?
      numOfRounds: this.state.numOfRounds + 1,
      numOfRoundsWon: this.checkWordGuess()
        ? this.state.numOfRoundsWon + 1
        : this.state.numOfRoundsWon,
    });
  };

  checkWordGuess = (usersCurrentGuess) => {
    const guessedLetters = [...this.state.guessedLetters, usersCurrentGuess];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  render() {
    const didUserGuessCorrectly = this.checkWordGuess();
    console.log(didUserGuessCorrectly, "did user guess correctly");
    const resetGameButton = (
      <button onClick={this.resetGame}> Reset the game</button>
    );

    const shouldRemoveInput =
      this.state.guessesLeft < 1 || didUserGuessCorrectly === true;

    const userGuessInputForm = (
      <form onSubmit={this.handleSubmit}>
        <label>
          Guess a letter:
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit your guess" />
      </form>
    );

    const hangmanImage =
      this.state.guessesLeft < 8 ? (
        <img
          src={require(`./hangmanImages/hangman${this.state.guessesLeft}.png`)}
          alt="howDeadIsHangMan"
          height="10%"
          width="10%"
        />
      ) : (
        ""
      );

    const numGuessesMsg =
      this.state.guessesLeft < 1 ? (
        <p>You're out of guesses</p>
      ) : (
        <p>Number of guesses left : {this.state.guessesLeft}</p>
      );

    const gameOverMsg = this.state.guessesLeft === 0 &&
      !didUserGuessCorrectly && (
        <p>Better luck next time! The word is: {this.state.currWord}</p>
      );
    const correctGuessMgg = didUserGuessCorrectly && (
      <p>Good job! You've guessed {this.state.currWord}!</p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          <Box
            sx={{
              width: 500,
              height: 40,
              borderRadius: "5px",
              backgroundColor: "goldenrod",
            }}
          >
            {this.generateWordDisplay()}
          </Box>
          <h3>Guessed Letters</h3>
          <Box>
            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
          </Box>
          {numGuessesMsg}
          <Container maxWidth="sm">{hangmanImage}</Container>
          <Box sx={{ color: red }}>
            {correctGuessMgg}
            {gameOverMsg}
          </Box>
          <h3>User's actions</h3>
          {shouldRemoveInput ? resetGameButton : userGuessInputForm}
          <p>
            You've won {this.state.numOfRoundsWon} out of{" "}
            {this.state.numOfRounds} rounds.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
