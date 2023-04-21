import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Keyboard from "./Keyboard.js";
import Sprite from "./Sprites.js";
// import { Box, Grid } from "@mui/material";

let globalWordDisplay = "";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // guess displays the placeholder in the input field
      guess: "Key in your first guess here",
      // Insert num guesses left state here
      numGuessLeft: 10,
      scoreData: [],
    };
    // bind handleChange and handleRestart methods to component instance,to keep the reference
    this.handleChange = this.handleChange.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
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
    globalWordDisplay = wordDisplay.join(" ");
    // this.setState({ wordDisplayed: wordDisplay });
    return globalWordDisplay;
  };

  // Insert form callback functions handleChange
  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // handleRestart resets all the states
  handleRestart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      wordDisplay: [],
      guess: "Key in your first guess here",
      numGuessLeft: 10,
    });
  };

  renderRestartButton(message) {
    return (
      <div style={{ marginBottom: 0 }}>
        <h3 style={{ marginBottom: 0 }}>
          {message}
          <br />
          <br />
          <button
            className="Button"
            id="restart-button"
            onClick={this.handleRestart}
          >
            Next Word
          </button>
        </h3>
      </div>
    );
  }

  handleInput = (character) => {
    const { guessedLetters, numGuessLeft } = this.state;
    this.setState({
      guessedLetters: [...guessedLetters, character],
      numGuessLeft: numGuessLeft - 1,
    });
  };

  componentDidMount() {
    // Add event listener for keydown on the document object
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // Remove event listener when component is unmounted
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    // Check if the key pressed is the "Enter" key (keyCode 13)
    if (event.keyCode === 13) {
      // Trigger a click event on the "Restart" button
      const restartButton = document.getElementById("restart-button");
      restartButton.click();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.numGuessLeft !== this.state.numGuessLeft) {
      // Stores the currWord and wordDisplay if the word has been guessed or if the user has run out of guesses
      if (!globalWordDisplay.includes("_") || this.state.numGuessLeft === 0) {
        this.setState({
          scoreData: [
            ...prevState.scoreData,
            { round: this.state.currWord, guess: globalWordDisplay },
          ],
        });
      }
    }
  }

  render() {
    const { numGuessLeft, currWord, guessedLetters, scoreData } = this.state;
    let wordDisplayed = this.generateWordDisplay();
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <Sprite
            numGuessLeft={numGuessLeft}
            globalWordDisplay={globalWordDisplay}
          />
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {guessedLetters.length > 0
            ? "[" + guessedLetters.join(" ") + "]"
            : "[ ]"}
          {wordDisplayed.includes("_") ? (
            numGuessLeft === 0 ? (
              this.renderRestartButton(`Game over. The word is "${currWord}".`)
            ) : (
              <div style={{ marginBottom: 0 }}>
                <br />
                <Keyboard onClick={this.handleInput} />
                <p>
                  <em>No. of guesses left: {numGuessLeft}</em>
                </p>
              </div>
            )
          ) : (
            this.renderRestartButton(`Congrats! You guessed the word!`)
          )}
          <div style={{ marginBottom: 30 }}>
            {scoreData.length === 0 ? null : (
              <>
                <h3 style={{ marginBottom: 10 }}>Score</h3>
                {scoreData.map((item, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    {item.round + " : " + item.guess}
                  </p>
                ))}
              </>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
