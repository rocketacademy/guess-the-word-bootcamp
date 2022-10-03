import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import { GuessingWord } from "./components/GuessingWord.js";
import { RestartGame } from "./components/RestartGame.js";
import { GameOver } from "./components/GameOver.js";
import { MovingIcon } from "./components/MovingIcon.js";

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
      guessesLeft: 10,
      // Insert form input state here
      // [e.target.name]: e.target.value,
      tempAlphabet: "",
      wordComplete: false,
      afterGuessValue: "",
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
  handleFormChange = (e) => {
    this.setState({
      tempAlphabet: e.target.value,
      afterGuessValue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let isCorrectLetterGuess = 0;
    let numberOfCorrectLetters = 0;
    // let lengthOfCurrWord = this.state.currWord;
    for (let letter of this.state.currWord) {
      if (letter === this.state.tempAlphabet) {
        isCorrectLetterGuess = 1;
        numberOfCorrectLetters++;
      }
      if (this.state.guessedLetters.includes(letter)) {
        numberOfCorrectLetters++;
      }
    }

    this.setState({
      guessedLetters: [...this.state.guessedLetters, this.state.tempAlphabet],
      guessesLeft:
        isCorrectLetterGuess === 1
          ? this.state.guessesLeft
          : this.state.guessesLeft - 1,
      wordComplete:
        numberOfCorrectLetters === this.state.currWord.length ? true : false,
      afterGuessValue: "",
    });
  };

  gameRestarted = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      tempAlphabet: "",
      wordComplete: false,
    });
  };

  render() {
    console.log(this.state.guessedLetters);
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
          <h3>Guesses left</h3>
          {this.state.guessesLeft}
          {this.state.wordComplete === false ? (
            this.state.guessesLeft === 0 ? (
              <GameOver
                currWord={this.state.currWord}
                gameRestarted={this.gameRestarted}
              />
            ) : (
              <GuessingWord
                handleSubmit={this.handleSubmit}
                handleFormChange={this.handleFormChange}
                afterGuessValue={this.state.afterGuessValue}
              />
            )
          ) : (
            <RestartGame gameRestarted={this.gameRestarted} />
          )}
          <br></br>
          <div>
            <MovingIcon number={10 - this.state.guessesLeft}/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
