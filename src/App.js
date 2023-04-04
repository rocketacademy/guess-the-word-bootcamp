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
      letter: '',
      numGuessLeft: 12,
      
    };
    /* console.log(this.state.currWord); */
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
  handleChange = (event) =>{
    /* console.log(event); */
    const { value, name } = event.target;
    /* console.log("value:", value);
    console.log("name:", name); */
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    console.log(e)
    const inputLetter = this.state.letter[0].toLowerCase();

    this.setState(prevState=>({
      guessedLetters: [...this.prevState.guessedLetters, inputLetter],
      numGuessLeft: this.prevState.currWord.includes(inputLetter) ? this.prevState.numGuessLeft : this.prevState.numGuessLeft -1,
      letter: "",
    }));
    /* this.setState({
      guessedLetters: [...this.state.guessedLetters, this.state.letter],
      letter: ''
    }) */
  }

  resetGame = () =>{
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessLeft: 12,
      input: ""
    })
  }



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
          <h3>Input</h3>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <label>
              Letter:
            </label>
            <input 
              type="text" 
              name="letter"
              value={this.state.letter} 
              onChange={this.handleChange}
              placeholder="Type in single letter here">
            </input>
            <br />
            <button type='submit'>Submit Letter</button>
          </form>
          Todo: Insert form element here
        </header>
      </div>
    );
  }
}
 
export default App;
