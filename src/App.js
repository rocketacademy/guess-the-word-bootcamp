import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import detResult from "./detResult.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PlayArea from "./PlayArea.js";

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

  reset = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuess: 10,
      userWord: "",
      result: "",
    });
  };

  handleChange = (e) => {
    let { value } = e.target;
    if ((value.match(/^[a-z]+$/) && value.length === 1) || value === "") {
      this.setState({ userWord: value });
    }
  };

  handleSubmit = (e) => {
    let { userWord } = this.state;
    e.preventDefault();
    if (userWord === "") {
      return;
    } else {
      const updateGuess = [...this.state.guessedLetters, userWord];
      const updateNumGuess = this.state.numGuess - 1;
      this.setState({
        userWord: "",
        guessedLetters: updateGuess,
        numGuess: updateNumGuess,
        result: detResult(this.state.currWord, updateGuess, updateNumGuess),
      });
    }
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
            <PlayArea info={this.state} />
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
