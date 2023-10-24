import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import detResult from "./detResult.js";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  genResultDisplay = () => {
    if (this.state.result === "win") {
      return (
        <h3>Congratulations, You win with {10 - this.state.numGuess} guess.</h3>
      );
    }
    if (this.state.result === "lose") {
      return <h3>Oh, You have no guess chance left. You lose.</h3>;
    }

    return (
      <h3>
        Error01 :error is occur, please contact the creator for more detail.
      </h3>
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
      this.state.numGuess -= 1;
      this.setState({
        userWord: "",
        guessedLetters: [...this.state.guessedLetters, userWord],
      });
    }
  };

  render() {
    const inputGuess = (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={this.state.userWord}
          onChange={this.handleChange}
          maxlength={1}
          placeholder="One alphabet letter only"
          variant="standard"
          color="primary"
        />
        <Button type="submit" variant="contained" color="secondary">
          Guess!
        </Button>
      </form>
    );

    this.state.result = detResult(
      this.state.currWord,
      this.state.guessedLetters,
      this.state.numGuess
    );

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1>Guess The Word 🚀</h1>
            <TableContainer align="center">
              <TableRow>
                <TableCell sx={{ border: 1 }}>
                  <h2>Word Display</h2>
                </TableCell>
                <TableCell sx={{ border: 1 }}>
                  <h2>{this.generateWordDisplay()}</h2>
                </TableCell>
              </TableRow>
              <TableCell sx={{ border: 1 }}>
                <h3>Guessed Letters</h3>
              </TableCell>
              <TableCell sx={{ border: 1 }}>
                <h3>
                  {this.state.guessedLetters.length > 0
                    ? this.state.guessedLetters.toString()
                    : "-"}
                </h3>
              </TableCell>
            </TableContainer>
            {this.state.result === "" ? (
              <div color="black" bgcolor="palevioletred">
                <h4>Guess letter left: {this.state.numGuess}</h4>
                <h4>Please guess one alphabet letter</h4>
                {inputGuess}
              </div>
            ) : (
              <div>
                {this.genResultDisplay()}
                <Button
                  onClick={this.reset}
                  variant="contained"
                  color="secondary"
                >
                  Replay
                </Button>
                <Button
                  onClick={window.close}
                  variant="contained"
                  color="secondary"
                >
                  Quit
                </Button>
              </div>
            )}
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
