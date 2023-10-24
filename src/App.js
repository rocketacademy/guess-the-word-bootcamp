import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import detResult from "./detResult.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: "hello",
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
      if (this.state.guessedLetters.includes(letter)) {
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

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({ userWord: value });
  };

  handleSubmit = (e) => {
    let { userWord } = this.state;
    e.preventDefault();
    this.state.numGuess -= 1;
    this.setState({
      userWord: "",
      guessedLetters: [...this.state.guessedLetters, userWord],
    });
  };

  render() {
    const inputGuess = (
      <form onSubmit={this.handleSubmit}>
        <label></label>
        <input
          type="text"
          value={this.state.userWord}
          onChange={this.handleChange}
          maxLength={1}
        />
        <input type="submit" value="Guess!" />
      </form>
    );

    this.state.result = detResult(
      this.state.currWord,
      this.state.guessedLetters,
      this.state.numGuess
    );

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
          {this.state.result === "" ? (
            <div>
              <h3>Guess letter left: {this.state.numGuess}</h3>
              <h3>Input</h3>
              {inputGuess}
            </div>
          ) : (
            <div>
              {this.genResultDisplay()}
              <button>Replay</button>
              <button onClick={window.close}>Quit</button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
