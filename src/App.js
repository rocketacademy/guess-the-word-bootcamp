import React from "react";
import { getRandomWord, currLetter } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    let currWord = getRandomWord();
    this.initialState = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: currWord,
      uniqueGameLetters: currLetter(currWord),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      correctLetters: new Set(),
      // Insert num guesses left state here
      attemptsLeft: 5,
      currInputLetter: "",
      currRound: 1,
      //Insert num of played game rounds
      playedRounds: 0,
      //Insert num of winning rounds
      winningRounds: 0,
    };
    // Insert form input state here
    this.state = { ...this.initialState };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  //Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState((prevState) => {
      //Linking it to the prevState which is the initialState
      return {
        ...prevState, //open the object to access to the key and value of the object in state
        currInputLetter: event.target.value,
      }; //changing the value of the currInputWord key from input
    });

    return;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const currWord = getRandomWord();
    if (this.state.attemptsLeft === 0) {
      //only when pressing submit them it is lost, not automatic
      //if submitting after 1 attempt and display words are not filled
      window.alert(`You lost! The word is ${this.state.currWord}!`);
      this.setState({
        ...this.initialState,
        currInputLetter: "",
        currWord: currWord,
        uniqueGameLetters: currLetter(currWord),
        playedRounds: this.state.playedRounds + 1,
        currRound: this.state.currRound + 1,
        winningRounds: this.state.winningRounds,
      });
      return;
    }

    if (this.state.currWord.includes(this.state.currInputLetter)) {
      this.setState((prevState) => {
        return {
          ...prevState,
          currInputLetter: "",
          guessedLetters: [
            ...prevState.guessedLetters,
            this.state.currInputLetter,
          ],
          correctLetters: new Set(this.state.correctLetters).add(
            this.state.currInputLetter
          ),
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          attemptsLeft: prevState.attemptsLeft - 1,
          currInputLetter: "",
          guessedLetters: [
            ...prevState.guessedLetters,
            this.state.currInputLetter,
          ],
        };
      });
    }

    if (
      this.state.currWord.includes(this.state.currInputLetter) &&
      this.state.correctLetters.size === this.state.uniqueGameLetters.size
    ) {
      window.alert("Congraluations! You Win! Play the next round?");
      this.setState({
        ...this.initialState, //points back to the game start state
        currInputLetter: "",
        currWord: currWord,
        uniqueGameLetters: currLetter(currWord),
        playedRounds: this.state.playedRounds + 1,
        currRound: this.state.currRound + 1,
        winningRounds: this.state.winningRounds + 1,
      });
    }
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
          <h3>
            Round {this.state.currRound}:{" "}
            {this.state.attemptsLeft <= 1
              ? `${this.state.attemptsLeft} attempt left`
              : `${this.state.attemptsLeft} attempts left`}
          </h3>
          <form onSubmit={this.handleSubmit}>
            <label>Make a guess</label>
            <div>
              <input
                type="text"
                value={this.state.currInputLetter}
                onChange={this.handleChange}
                maxLength={1}
              ></input>
            </div>
            <input type="submit" value="submit" />
          </form>
          <h3>
            Your score:{" "}
            {this.state.winningRounds <= 1
              ? `${this.state.winningRounds} win`
              : `${this.state.winningRounds} wins`}{" "}
            /{" "}
            {this.state.playedRounds <= 1
              ? `${this.state.playedRounds} round`
              : `${this.state.playedRounds} rounds`}
          </h3>
        </header>
      </div>
    );
  }
}

export default App;
