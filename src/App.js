import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import PlayArea from "./PlayArea.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import detResult from "./detResult.js";
import WordDisplayTable from "./WordDisplayTable.js";

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

  reset = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuess: 10,
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
            <WordDisplayTable info={this.state} />
            <PlayArea
              updateGuess={this.updateGuess}
              numGuess={this.state.numGuess}
              result={this.state.result}
              reset={this.reset}
            />
          </header>
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
