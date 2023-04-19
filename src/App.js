import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class App extends React.Component {
  static defaultProps = {
    guessesLeft: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  }

  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      guessesLeft: 6,
      // Insert wins here
      wins: 0,
      // Insert lost here
      lost: 0,
      // Insert rounds here
      rounds: 0,
      // Insert form input state here
      input: '',
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter) || this.state.guessesLeft === 0) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState ({input: event.target.value});
    console.log (event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const inputLetter = this.state.input[0].toLowerCase(); // only save lowered 1st letter of input
    
    this.setState ((state) => ({
      guessedLetters: [...state.guessedLetters, inputLetter],
      guessesLeft: this.state.currWord.includes(inputLetter)
        ? this.state.guessesLeft
        : this.state.guessesLeft - 1,
      input: '',
    }))
  }

  // check if user has guessed the word using callback function
  checkHasUserGuessedWord = (inputLetter) => {
    const guessedLetters = [...this.state.guessedLetters, inputLetter];
      for (let letter of this.state.currWord) {
        if (!guessedLetters.includes(letter)) {
          return false;
        }
      }
      return true;
  }

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 6,
      input: '',
      rounds: this.state.rounds + 1,
      score: this.checkHasUserGuessedWord()
        ? this.state.wins + 1
        : this.state.lost + 1,
    })
  }

  // determine if player has guessed the correct word
  render() {
    const hasUserGuessedWord = this.checkHasUserGuessedWord();
    const shouldDisableInput = hasUserGuessedWord || this.state.guessesLeft === 0;
    const playAgainButton = (
      <button onClick={this.resetGame}>Play Again!</button>
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

          <div className="images">
            <img 
              src={this.props.images[this.state.guessesLeft]}
              alt= ""
            />
          <p>Number of Guesses Left: {this.state.guessesLeft}</p>
          </div>

          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}><h6>
            <label>
              Please submit 1 letter at a time.
              <input 
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
                disabled={shouldDisableInput}
                />
            </label>
              <input type="submit" value="Submit" disabled={shouldDisableInput}/></h6>
          </form>

          {hasUserGuessedWord && (
            <div>
              <p>YOU WON!</p>{playAgainButton}
              <p>Played: {this.state.rounds}, W: {this.state.wins} L: {this.state.lost}</p>
            </div>
          )}
          {this.state.guessesLeft === 0 && !hasUserGuessedWord && (
            <div>
            <p>YOU LOST!</p>{playAgainButton}
            <p>Played: {this.state.rounds}, W: {this.state.wins} L: {this.state.lost}</p>
          </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
