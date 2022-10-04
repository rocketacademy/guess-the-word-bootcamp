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
      guessesLeft: 10,
      // Insert form input state here
      inputState: "",
      //starting state
      guessedTheWord: false,
      gameRestart: false,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
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

  guessedTheWord = () => {
    let currWordArray = this.state.currWord.split();
    console.log(currWordArray);
    for (let i = 0; i < currWordArray.length; i++) {
      if (this.state.guessedLetters.indexOf(currWordArray[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  gameRestart = () => {
    this.setState((state) => ({
      guessedLetters: [],
      guessesLeft: 10,
      inputState: "",
      guessedTheWord: false,
      gameRestart: false,
    }));
    return true;
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleFormChange(e) {
    //const finalLetter = this.state.currWord[0].toLowerCase();
    this.setState({
      guessedLetters: e.target.value,
      //Check how many guesses user has left (minus 1 for every incorrect guess)
      guessesLeft: this.state.guessedLetters.includes(this.state.currWord)
        ? this.state.guessesLeft
        : this.state.guessesLeft - 1,
    });
    console.log(this.state);

    //restart game after guessesLeft == 0
    if (!this.state.guessesLeft) {
      this.setState(() => ({ gameRestart: true }));
    }
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
          <h3>Enter your guess below, 1 letter at a time:</h3>
          <p>you have {this.state.guessesLeft} tries left!</p>
          {
            /* Insert form element here */
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                name="guessedLetters"
                value={this.state.guessedLetters}
                pattern="[a-zA-Z]+"
                onChange={(e) => this.handleFormChange(e)}
              />
            </form>
          }

          {this.guessedTheWord === true && (
            <div>
              <p>Congratulations! You guessed the word!</p>
            </div>
          )}

          {this.state.guessesLeft <= 0 && (
            <div>
              <p>You didn't guess the word, try again!</p>
              <button onClick={this.gameRestart}>Restart</button>
              <></>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
