import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import detResult from "./detResult.js";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputGuess from "./InputGuess.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A9FBD7",
    },
    secondary: {
      main: "#B0C6CE",
    },
  },
});

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      numGuess: 10,
      userWord: "",
      result: "",
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];

    for (let letter of this.state.currWord) {
      if (
        this.state.guessedLetters.includes(letter) ||
        this.state.result === "lose"
      ) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  genPlayArea = () => {
    const inputGuess = <InputGuess updateGuess={this.updateGuess} />;
    if (this.state.result === "win") {
      return (
        <div>
          <h3>
            Congratulations, You win with {10 - this.state.numGuess} guess.
          </h3>
          <Button onClick={this.reset} variant="contained" color="secondary">
            Replay
          </Button>
        </div>
      );
    }
    if (this.state.result === "lose") {
      return (
        <div>
          <h3>Oh, You have no guess chance left. You lose.</h3>
          <Button onClick={this.reset} variant="contained" color="secondary">
            Replay
          </Button>
        </div>
      );
    }

    return (
      <div>
        <h3>Guess letter left: {this.state.numGuess}</h3>
        <h3>Please guess one alphabet letter</h3>
        {inputGuess}
      </div>
    );
  };

  reset = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuess: 10,
      userWord: "",
      result: "",
    });
  };

  updateGuess = (userWord) => {
    const updateGuess = [...this.state.guessedLetters, userWord];
    const updateNumGuess = this.state.numGuess - 1;
    this.setState({
      guessedLetters: updateGuess,
      numGuess: updateNumGuess,
      result: detResult(this.state.currWord, updateGuess, updateNumGuess),
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1>Guess The Word 🚀</h1>
            <h3>Word Display</h3>
            {this.generateWordDisplay()}
            <h3>Guessed Letters</h3>
            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
            {this.genPlayArea()}
          </header>
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
