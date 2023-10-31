import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Form from "./Components/Form";

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
      numGuessLeft: 10,
      // Insert form input state here
      currInput: "",
      wordDisplay: [],
      hasPlayerGuessedCorrectly: true,
    };
  }

  generateWordDisplay = () => {
    let { currWord, guessedLetters, wordDisplay } = this.state;

    // for...of is a string and array iterator that does not use index
    console.log(currWord);
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }

    this.setState({
      wordDisplay: wordDisplay,
      currInput: "",
    });
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState({
      currInput: event.target.value,
    });
  };

  handleSubmit = (event) => {
    let { currInput, guessedLetters, currWord } = this.state;
    event.preventDefault();
    if (currInput === "" || currInput.length > 1) {
      alert("Please input a letter");
      this.setState({
        currInput: "",
      });
    } else if (!guessedLetters.includes(currInput)) {
      this.setState(
        (prevState) => ({
          guessedLetters: [...guessedLetters, currInput],
          numGuessLeft: currWord.includes(currInput)
            ? prevState.numGuessLeft
            : prevState.numGuessLeft - 1,
        }),
        () => this.resetWordDisplay()
      );
    } else {
      alert("You have entered a duplicated letter");
      this.setState({
        currInput: "",
      });
    }
  };

  // make all letters in wordDisplay equal to '-' in order to avoid duplicated lengths
  resetWordDisplay = () => {
    this.setState(
      {
        wordDisplay: [],
      },
      () => this.generateWordDisplay()
    );
  };

  render() {
    let { currInput, numGuessLeft } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.state.wordDisplay.toString()}
          <h5>
            Guessed Letters:{" "}
            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
          </h5>

          <h5>Guesses Left: {numGuessLeft} </h5>

          {/* Insert form element here */}

          <Form
            value={currInput}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </header>
      </div>
    );
  }
}

export default App;
