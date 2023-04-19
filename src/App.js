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
      // Insert form input state here
      inputValue: "",
      guessLeft: -1,
      init: false,
      won: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const { inputValue, guessLeft,currWord } = this.state;
 
    let ifWin =true;
    if (
      inputValue === "" ||
      inputValue.toUpperCase() === inputValue.toLowerCase()
    ) {
      alert("Please enter a proper letter first.");
    } else {
      const letter = inputValue[0].toLocaleLowerCase();
      let repeatCheck = false;
      for (let gLetter of this.state.guessedLetters) {
        if (gLetter === letter) {
          repeatCheck = true;
          alert("You have guessed this letter before!");
        }
      }
      for (let letter of currWord) {
        if (!this.state.guessedLetters.includes(letter)) {
          ifWin=false;
        } }
      if (repeatCheck === false ) {
        if(!ifWin){
        this.setState({
          guessedLetters: [...this.state.guessedLetters, letter],
          inputValue: "",
          guessLeft: guessLeft - 1,
        });}else{
          this.setState({
            won: true,
          })
        }
      }
      
      
  
      // for...of is a string and array iterator that does not use index
      
      
          
        
      }
    }
  
  initialiseGuess = () => {
    const num = this.state.currWord.length;
    this.setState({
      guessLeft: num + 5,
      init: true,
    });
  };
  //generate a new state

  generateWordDisplay = () => {
    const wordDisplay = [];
    const { currWord } = this.state;

    // for...of is a string and array iterator that does not use index
    
    for (let letter of currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
        
      }
    }
    
    return wordDisplay.toString();
  };
  restartGame=()=>{
    this.setState({
      currWord: getRandomWord(),
      
      guessedLetters: [],
      
      inputValue: "",
      guessLeft: -1,
      init: false,
      won: false,
    })
  }
  

  // Insert form callback functions handleChange and handleSubmit here

  render() {
    const{guessLeft, won}=this.state
    const startGame = () => {
      if (this.state.init) {
        return (
          <div>
            <h3>Guessed Letters</h3>

            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
            <h3>Input</h3>
            {/* Insert form element here */}
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="inputValue"
                  value={this.state.inputValue}
                  maxLength="1"
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <h5>You have {this.state.guessLeft} guesses left.</h5>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <button onClick={this.initialiseGuess}>Start game</button>
          </div>
        );
      }
    };
    const displayResult = () => {
      if (guessLeft===0) {
        return <div>Out of guesses! Please try again.</div>;
      } else if(won){
        return <div>Congratulations! You have guessed the word correctly<br /><button onClick={this.restartGame}>Replay</button></div>;
      }else{
        return <div></div>
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>

          {this.generateWordDisplay()}

          {startGame()}
          {displayResult()}
        </header>
      </div>
    );
  }
}

export default App;
