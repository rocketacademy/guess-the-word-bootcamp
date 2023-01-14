import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

import Button from 'react-bootstrap/Button';
import Stickman from "./components/Stickman.js";

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
      guessLeft: 100,
      // Insert form input state here
      wordInput: '',
      tries: 0
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    // for (let letter of this.state.currWord) {
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
    let {name, value} = e.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.guessedLetters.includes(this.state.wordInput) === false) {
      if (this.state.currWord.includes(this.state.wordInput)) {
        this.setState({
          guessedLetters: [...this.state.guessedLetters, this.state.wordInput],
          // guessLeft: this.state.guessLeft - 1,
          wordInput: '',
        })
      } else {
        this.setState({
          tries: this.state.tries + 1,
          wordInput: ''
        })
      }
    } else {
      this.setState({
        wordInput: '',
      })
    }
  }

  handleRestart = () => {
    this.setState({
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      // guessLeft: 10,
      // Insert form input state here
      wordInput: '',
      tries: 0
    })
  }

  render() {
    const result = () => {
      if (this.state.tries < 9 && this.generateWordDisplay().includes("_")) {
        return (
          <div>
            {this.generateWordDisplay()} 
              <h3>Guessed Letters</h3>
              {/* <h5>{this.state.guessLeft} guesses left</h5> */}
              {this.state.guessedLetters.length > 0
                ? this.state.guessedLetters.toString()
                : "-"}
              <h3>Input</h3>
              <form onSubmit={this.handleSubmit}>
                <input type='text' name='wordInput' value={this.state.wordInput} onChange={this.handleChange} maxLength="1"/>
                <input type='submit' value='Submit'/>
              </form>
              <br />
          </div>
        )
      } else if (!this.generateWordDisplay().includes("_")) {
        return (
          <div>
            {this.state.currWord} 
            <h2>You Win!</h2>
            <Button variant="outline-primary" onClick={this.handleRestart}>Restart</Button>
            <br />
          </div>
        )
      } else if (this.state.tries === 9) {
        return (
          <div>
            {this.state.currWord} 
            <h2>You Lose!</h2>
            <Button variant="outline-primary" onClick={this.handleRestart}>Restart</Button>
            <br />
          </div>
        )
      }
    }
    
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {result()}
          <Stickman tries={this.state.tries}/>
        </header>
      </div>
    );
  }
}

export default App;