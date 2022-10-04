import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Start from "./components/startmenu/start"
import Game from "./components/game/game"

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
      rounds: 0,
    };
  }

  setGameUp = (data) =>{
    console.log(data)
    this.setState({
      gameMode: data.gameMode,
      guess: parseInt(data.guess),
      rounds: parseInt(data.rounds)
    })

  }

  reset = () =>{
    this.setState({
      gameMode: "Start"
    })
  }

  // Insert form callback functions handleChange and handleSubmit here

  render() {
    console.log(this.state.guess, this.state.rounds);
    return (
      <div className="App">
        <header className="App-header">
          {this.state.gameMode === "Start" && (<Start setUp={this.setGameUp} />)}
          {this.state.gameMode === "Game" && <Game guess={this.state.guess} rounds={this.state.rounds} restart={this.reset}/>}
        </header>
      </div>
    );
  }
}

export default App;
