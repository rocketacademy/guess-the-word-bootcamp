import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress size="lg" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 55 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value
        )} % of Guesses Left`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const NUM_STARTING_GUESSES = 10;
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
      numGuessesLeft: NUM_STARTING_GUESSES,
      // Insert form input state here
      inputValue: "",
      wordDisplay: [],
      winGame: false,
      lostGame: false,
      TotalRounds: 0,
      winRounds: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessesLeft: 10,
      inputValue: "",
      wordDisplay: [],
      winGame: false,
      lostGame: false,
    });
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.inputValue.length === 0) {
      alert("Empty Input!");
    } else {
      const inputLetter = this.state.inputValue[0].toLowerCase();
      const tmp_guessedLetters = [...this.state.guessedLetters, inputLetter];
      const tmp_numGuessesLeft = this.state.numGuessesLeft - 1;

      const tmp_wordDisplay = [];
      for (let letter of this.state.currWord) {
        if (tmp_guessedLetters.includes(letter)) {
          tmp_wordDisplay.push(letter);
        } else {
          tmp_wordDisplay.push("_");
        }
      }

      let numFalse = 0;
      for (let i = 0; i < tmp_wordDisplay.length; i++) {
        if (tmp_wordDisplay[i] === "_") {
          numFalse++;
        }
      }

      let tmp_winGame = numFalse === 0 ? true : false;
      let tmp_lostGame = numFalse > tmp_numGuessesLeft ? true : false;

      let tmp_TotalRounds = this.state.TotalRounds;
      let tmp_winRounds = this.state.winRounds;
      if (tmp_winGame === true) {
        tmp_TotalRounds++;
        tmp_winRounds++;
      } else if (tmp_lostGame === true) {
        tmp_TotalRounds++;
      }

      this.setState({
        guessedLetters: tmp_guessedLetters,
        numGuessesLeft: tmp_numGuessesLeft,
        wordDisplay: tmp_wordDisplay,
        winGame: tmp_winGame,
        lostGame: tmp_lostGame,
        inputValue: "",
        TotalRounds: tmp_TotalRounds,
        winRounds: tmp_winRounds,
      });
    }

    event.preventDefault();
  }

  render() {
    const gameWinnerMessage = `Congrats! You have guessed the word "${
      this.state.currWord
    }" in ${10 - this.state.numGuessesLeft} guesses!`;

    const gameProgressMessage = this.state.lostGame
      ? `You Lost! You do not have enough guesses left.`
      : `You have ${this.state.numGuessesLeft} guesses left.`;

    const gameScoreMessage = `Current Score: ${this.state.winRounds} wins out of ${this.state.TotalRounds} rounds.`;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.state.winGame || this.state.lostGame
            ? this.state.currWord
            : this.state.wordDisplay.toString()}

          <br />
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : ""}

          <br />
          <br />
          <h3>{!this.state.winGame && !this.state.lostGame && "Input"}</h3>

          {/* Insert form element here */}
          {!this.state.winGame && !this.state.lostGame ? (
            <form onSubmit={this.handleSubmit}>
              <label>
                Guess 1 Letter:&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  value={this.state.inputValue}
                  onChange={this.handleChange}
                  maxlength="1"
                />
              </label>

              <input type="submit" value="Submit" />
            </form>
          ) : (
            <ThemeProvider theme={theme}>
              <Button
                color="neutral"
                variant="contained"
                onClick={this.resetGame}
              >
                Reset Game
              </Button>
            </ThemeProvider>
          )}

          <br />
          <h4>
            {this.state.winGame ? gameWinnerMessage : gameProgressMessage}
          </h4>

          <Box sx={{ width: "22%" }}>
            <LinearProgressWithLabel
              value={(this.state.numGuessesLeft / NUM_STARTING_GUESSES) * 100}
            />
          </Box>

          <br />
          <h4>{this.state.TotalRounds === 0 ? "" : gameScoreMessage}</h4>
        </header>
      </div>
    );
  }
}

export default App;
