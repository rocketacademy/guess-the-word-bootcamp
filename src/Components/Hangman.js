import React from "react";
import { getRandomWord } from "../utils";
import Scoreboard from "./Scoreboard";
import GuessInput from "./GuessInput";
import LetterDisplay from "./LetterDisplay";
import GuessedLetters from "./GuessedLetters";

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
          <LetterDisplay color={this.state.wordGuessed ? "green" : "red"}>
            {letter}
          </LetterDisplay>
        );
      }
    } else {
      for (let letter of this.state.currWord) {
        if (this.state.guessedLetters.includes(letter)) {
          wordDisplay.push(
            <LetterDisplay color="green">{letter}</LetterDisplay>
          );
        } else {
          wordDisplay.push(<LetterDisplay color="red">-</LetterDisplay>);
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
    const validInput = new RegExp("^[a-zA-Z]{1}$");
    if (this.state.guessedLetters.includes(this.state.guessInput)) {
      alert("You've guessed this letter before!");
    } else if (validInput.test(this.state.guessInput)) {
      newGuessedLetters.push(this.state.guessInput.toLowerCase());
      this.setState({
        guessedLetters: newGuessedLetters.sort(),
        guessesLeft: this.state.guessesLeft - 1,
      });
    } else {
      alert("Please guess one letter!");
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
          <GuessInput
            guessInput={this.state.guessInput}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
        <Scoreboard
          score={this.state.score}
          guessesLeft={this.state.guessesLeft}
        />
        <GuessedLetters guessedLetters={this.state.guessedLetters} />
      </div>
    );
  }
}
