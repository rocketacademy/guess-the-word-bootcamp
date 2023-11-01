import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

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
      guessedInput: "",
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

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const guessedAlphabet = this.state.guessedInput;
    if (guessedAlphabet.length === 1) {
      console.log(guessedAlphabet);
      alert(`Letter submitted:  ${guessedAlphabet}`);
      this.setState({
        guessedLetters: [...this.state.guessedLetters, guessedAlphabet],
        guessedInput: "",
        numGuessLeft: this.state.numGuessLeft - 1,
      });
    } else {
      alert(`Only 1 alphabet!`);
    }
  };

  restartGame = () => {
    this.setState({
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numGuessLeft: 10,
      // Insert form input state here
      guessedInput: "",
    });
  };

  // determineWinner = (guessedAlphabet) => {
  //   const guessedLetters = [...this.state.guessedLetters, guessedAlphabet];
  //   for (let i = 0; i < this.state.currWord.length; i += 0) {
  //     if (!guessedLetters.includes(this.state.currWord[i])) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  determineWinner = (guessedAlphabet) => {
    const guessedLetters = [...this.state.guessedLetters, guessedAlphabet];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  render() {
    const hasPlayerGuessedTheWord = this.determineWinner();

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
          <h3>Input</h3>
          <br />
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="guessedInput"
              value={this.state.guessedInput}
              onChange={(e) => this.handleChange(e)}
            />
            {this.state.numGuessLeft === 0 || hasPlayerGuessedTheWord ? (
              <button onClick={this.restartGame}>Restart</button>
            ) : (
              <input type="submit" value="submit" />
            )}
          </form>
          {hasPlayerGuessedTheWord && <h3>You've won!</h3>}
          {!hasPlayerGuessedTheWord && this.state.numGuessLeft === 0 ? (
            <h3>You lose.. The word is "{this.state.currWord}"~ Try again!</h3>
          ) : null}
          {!hasPlayerGuessedTheWord && (
            <p>No. of guess left: {this.state.numGuessLeft}</p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
