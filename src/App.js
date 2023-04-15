import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Keyboard from "./Keyboard.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      guessedCorrectly: false,
      // wordDisplayed: ["_"],
      // guess displays the placeholder in the input field
      guess: "Key in your first guess here",
      // Insert num guesses left state here
      numGuessLeft: 10,
      characterInput: "",
    };
    // bind handleChange and handleSubmit methods to component instance,to keep the reference
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    // this.setState({ wordDisplayed: wordDisplay });
    return wordDisplay.join(" ");
  };

  // Insert form callback functions handleChange
  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // handleSubmit to check validation of input to allow only 1 alphabet to be inputted
  handleSubmit = (e) => {
    e.preventDefault();
    const { guessedLetters, guess, numGuessLeft } = this.state;
    if (guess.length !== 1) {
      alert("Please input a letter instead");
    } else {
      this.setState({
        guessedLetters: [...guessedLetters, guess],
        guess: "",
        numGuessLeft: numGuessLeft - 1,
      });
    }
  };

  // handleRestart resets all the states
  handleRestart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      wordDisplay: [],
      guessedCorrectly: false,
      guess: "Key in your first guess here",
      numGuessLeft: 10,
    });
  };

  handleInput = (character) => {
    const { guessedLetters, numGuessLeft } = this.state;
    this.setState({
      guessedLetters: [...guessedLetters, character],
      numGuessLeft: numGuessLeft - 1,
    });
  };

  render() {
    const { numGuessLeft, currWord, guessedLetters } = this.state;
    let wordDisplayed = this.generateWordDisplay();
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
          {wordDisplayed.includes("_") ? (
            numGuessLeft === 0 ? (
              <div>
                <h3>
                  Game over. The word is "{currWord}".
                  <br />
                  <br />
                  <button className="Button" onClick={this.handleRestart}>
                    Restart
                  </button>
                </h3>
              </div>
            ) : (
              <div>
                <div>
                  <br />
                  <Keyboard onClick={this.handleInput} />
                </div>{" "}
                {/* <h3>Key in your guess here:</h3>
                <form className="Form" onSubmit={this.handleSubmit}>
                  <label>
                    <input
                      name="guess"
                      type="text"
                      value={this.state.guess}
                      onChange={this.handleChange}
                    />
                  </label>
                  <input className="Button" type="submit" value="Submit" />
                </form> */}
                <p>
                  <em>No. of guesses left: {numGuessLeft}</em>
                </p>
              </div>
            )
          ) : (
            <div>
              <h3>
                Congrats! You guessed the word!
                <br />
                <br />
                <button className="Button" onClick={this.handleRestart}>
                  Restart
                </button>
              </h3>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
