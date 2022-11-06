import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: "Hello", //getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      correctLetters: {},
      guessLetter: "",
      guessCount: 10,
      disabledInput: false,
      disabledSubmit: false,
      disabledRestart: true,
      // Insert form input state here
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

  // A function that splits currWord into unique list of alphabets
  // and store into an Object - correctLetters (will be used to check win)

  splitWords = () => {
    var correctWord = this.state.currWord;
    var shallowCopy = {};
    for (let i = 0; i < correctWord.length; i++) {
      if (!(correctWord[i] in shallowCopy)) {
        shallowCopy[correctWord[i]] = 1;
        //console.log(copyArray); // - Work as intended
      }
    }
    this.setState({
      correctLetters: shallowCopy,
    });
  };

  componentDidMount() {
    setTimeout(this.splitWords(), 100);
  }

  checkCorrectLetter = (guessInput) => {
    // create a shallow copy of correctLetters Object
    var shallowCopy = this.state.correctLetters;
    console.log("Before deletion", shallowCopy);
    if (guessInput in this.state.correctLetters) {
      delete shallowCopy[guessInput];
      console.log("Letter is deleted from object", shallowCopy);
    }
    this.setState({
      correctLetters: shallowCopy,
    });
  };

  // Update guessCount and add letter into guessedLetters Array
  updateLetter = (guessInput) => {
    // console.log(this.state.guessCount);
    // console.log(this.state.guessedLetters);

    this.checkCorrectLetter(guessInput);

    this.setState({
      guessedLetters: [...this.state.guessedLetters, guessInput],
      guessCount: this.state.guessCount - 1,
    });

    if (Object.keys(this.state.correctLetters).length === 0) {
      this.setState({
        disabledRestart: false,
        disabledSubmit: true,
        disabledInput: true,
      });
      return alert("You win!");
    }
  };

  // Check if the letter is already used
  checkLetter = (guessInput) => {
    if (this.state.guessedLetters.includes(guessInput)) {
      return alert(`The letter ${guessInput} is used`);
    } else {
      this.updateLetter(guessInput);
    }
  };

  // Insert form callback functions handleChange and handleSubmit here

  handleSubmit = (event) => {
    event.preventDefault();
    var guessInput = this.state.guessLetter;
    // console.log(guessInput);
    if (guessInput.length > 1) {
      return alert("Enter 1 letter only");
    }

    if (this.state.guessCount === 0) {
      this.setState({
        disabledInput: true,
        disabledSubmit: true,

        disabledRestart: false,
      });
      return alert(
        `You used up all guess counts and lost! The correct word is ${this.state.currWord}`
      );
    } else {
      this.checkLetter(guessInput);
    }
  };

  handleChange = (event) => {
    var letter = event.target.value;
    this.setState({
      guessLetter: letter,
    });
  };

  handleRestart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      correctLetters: {},
      guessLetter: "",
      guessCount: 10,
      disabledInput: false,
      disabledSubmit: false,
      disabledRestart: true,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}

          {/* {console.log(this.state.correctLetters)} */}
          <h3>Input</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Guess: </label>
            <input
              onChange={this.handleChange}
              type="text"
              value={this.state.guessLetter}
              disabled={this.state.disabledInput}
            ></input>
            <button disabled={this.state.disabledSubmit}>Submit</button>
            <button
              onClick={this.handleRestart}
              disabled={this.state.disabledRestart}
            >
              Restart
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
