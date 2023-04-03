import React from "react";
import { getRandomWord } from "../utils";
import Scoreboard from "./Scoreboard";

export default class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      guessInput: "",
      wordGuessed: false,
      score: 0,
      guessesLeft: 10,
      gameOver: false,
    };
  }

  generateWordDisplay = () => {
    let wordDisplay = [];
    let guessed = true;
    if (this.state.gameOver) {
      for (let letter of this.state.currWord) {
        wordDisplay.push(
          <div
            className={this.state.wordGuessed ? "letter green" : "letter red"}
          >
            {letter.toUpperCase()}
          </div>
        );
      }
    } else {
      for (let letter of this.state.currWord) {
        if (this.state.guessedLetters.includes(letter)) {
          wordDisplay.push(
            <div className="letter green">{letter.toUpperCase()}</div>
          );
        } else {
          wordDisplay.push(<div className="letter red">-</div>);
          guessed = false;
        }
      }
      if (guessed === true && this.state.wordGuessed === false) {
        this.setState({
          wordGuessed: true,
          gameOver: true,
          score: this.state.score + 1,
        });
      }
    }

    return <div className="word">{wordDisplay}</div>;
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRestart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessInput: "",
      wordGuessed: false,
      guessesLeft: 10,
      gameOver: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newGuessedLetters = [...this.state.guessedLetters];
    if (this.state.guessInput.length !== 1) {
      alert("Please input 1 letter!");
    } else if (this.state.guessedLetters.includes(this.state.guessInput)) {
      alert("You've already guessed this letter!");
    } else if (!isNaN(this.state.guessInput)) {
      alert("Please input a letter!");
    } else {
      newGuessedLetters.push(this.state.guessInput);
      this.setState({
        guessedLetters: newGuessedLetters,
        guessesLeft: this.state.guessesLeft - 1,
      });
    }
    this.setState({
      guessInput: "",
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.guessesLeft === 0 &&
      this.state.wordGuessed === false &&
      prevState.guessesLeft === 1
    ) {
      this.setState({
        gameOver: true,
      });
    }
  };

  render() {
    return (
      <div className="game">
        {this.generateWordDisplay()} <br />
        <br />
        {this.state.gameOver ? (
          <div className="endGame">
            {this.state.wordGuessed ? (
              <h1>You did it!</h1>
            ) : (
              <h1>Game Over!</h1>
            )}
            <button onClick={this.handleRestart}>Restart</button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit} autocomplete="off">
            <label>
              <h3>Enter guess here:</h3>
            </label>
            <input
              type="text"
              name="guessInput"
              value={this.state.guessInput}
              onChange={this.handleChange}
            />
            <button type="submit" name="submit">
              Submit
            </button>
          </form>
        )}
        <Scoreboard {...this.state} />
        <h3>Guessed Letters</h3>
        <p className="guessed-letters">
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
        </p>
      </div>
    );
  }
}
