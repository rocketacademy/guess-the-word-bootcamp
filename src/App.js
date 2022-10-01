import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Start from "./components/startmenu/start"

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      numOfGuess: 0,// Insert num guesses left state here
      text: '',// Insert form input state here
      gameMode: "Start",
      guess: 0,
      rounds: 10,
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

  setGameUp = (data) =>{
    this.setState({
      gameMode: data.gameMode,
      guess: data.guess,
      rounds: data.rounds
    })
  }

  // Insert form callback functions handleChange and handleSubmit here

  render() {
    const element = (
    <div>
      <h1>Guess The Word 🚀</h1>
      <h3>Word Display</h3>
      {this.generateWordDisplay()}
      <h3>Guessed Letters</h3>
      {this.state.guessedLetters.length > 0
        ? this.state.guessedLetters.toString()
        : "-"}
      <h3>Input</h3>
      {/* Insert form element here */}
      Todo: Insert form element here
    </div>);
    return (
      <div className="App">
        <header className="App-header">
          {this.state.gameMode === "Start" && (<Start setGameUp={this.setGameUp} />)}
          {this.state.gameMode === "Game" && element}
        </header>
      </div>
    );
  }
}

export default App;
