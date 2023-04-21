import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import DisplayImages from "./DisplayImages.js";
import Box from "@mui/material/Box";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],

      inputValue: "",
      guessLeft: -1,
      init: false,
      //Information for number of games played or won
      played: 0,
      won: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  tries = 6;

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const { inputValue, guessLeft, currWord } = this.state;
    const currArr = [...currWord];
    let n = 0;
    //Check if blank or non-alphabet is entered
    if (
      inputValue === "" ||
      inputValue.toUpperCase() === inputValue.toLowerCase()
    ) {
      alert("Please enter a proper letter first.");
    } else {
      //Standardise letters entered to lower case
      const letter = inputValue[0].toLocaleLowerCase();
      let repeatCheck = false;
      //Block any repeated letters
      for (let gLetter of this.state.guessedLetters) {
        if (gLetter === letter) {
          repeatCheck = true;
          alert("You have guessed this letter before!");
        }
      }

      if (repeatCheck === false) {
        //Check if there are multiples of inputted letter in the word
        for (let i = 0; i < currWord.length; i++) {
          if (currArr[i] === letter) {
            n++;
          }
        }
        if (n === 0 || n === 1) {
          n = 1;
        }
        console.log(n);
        this.setState({
          guessedLetters: [...this.state.guessedLetters, letter],
          inputValue: "",
          //-1 try if the word has 1 or 0 of inputted letter, -n tries if there are n of the letter in the word
          guessLeft: guessLeft - n,
        });
      }
    }
  }
  //Set initial number of guesses and start game
  initialiseGuess = () => {
    const num = this.state.currWord.length;
    this.setState({
      guessLeft: num + this.tries,
      init: true,
    });
  };
  //Function to check if player has won
  hasWon = () => {
    const guessedLetters = [...this.state.guessedLetters];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };
  //Function to get the number of correct and wrong guess made respectively
  correctGuess = () => {
    const { guessLeft, currWord } = this.state;
    const guessedLetters = [...this.state.guessedLetters];
    let correctGuess = 0;
    for (let letter of this.state.currWord) {
      if (guessedLetters.includes(letter)) {
        correctGuess++;
      }
    }

    const wrongGuess = currWord.length + this.tries - guessLeft - correctGuess;
    return [correctGuess, wrongGuess];
  };
  //generate a new state

  generateWordDisplay = () => {
    const wordDisplay = [];
    const { guessLeft, currWord } = this.state;
    const hasPlayerWon = this.hasWon();
    // for...of is a string and array iterator that does not use index
    if (!hasPlayerWon && guessLeft !== 0) {
      for (let letter of currWord) {
        if (this.state.guessedLetters.includes(letter)) {
          wordDisplay.push(letter);
        } else {
          wordDisplay.push("_");
        }
      }

      return wordDisplay.toString();
    } else {
      return currWord.toString();
    }
  };
  //Restart game and initialise conditions
  restartGame = () => {
    const hasPlayerWon = this.hasWon();
    if (hasPlayerWon) {
      this.setState({
        currWord: getRandomWord(),

        guessedLetters: [],

        inputValue: "",
        guessLeft: -1,
        init: false,
        played: this.state.played + 1,
        won: this.state.won + 1,
      });
    } else {
      this.setState({
        currWord: getRandomWord(),

        guessedLetters: [],

        inputValue: "",
        guessLeft: -1,
        init: false,
        played: this.state.played + 1,
      });
    }
  };

  // Insert form callback functions handleChange and handleSubmit here

  render() {
    const { guessLeft, played, won } = this.state;
    const playerHasWon = this.hasWon();
    const [cGuess, wGuess] = this.correctGuess();
    const startGame = () => {
      if (this.state.init) {
        return (
          <div>
            <h3>Guessed Letters</h3>

            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
            <h3>Input</h3>
            {playerHasWon || guessLeft === 0 || wGuess === this.tries + 1 ? (
              <div></div>
            ) : (
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
            )}
            {/* <h5>You have guessed {cGuess} letters correctly and {wGuess} letters wrongly</h5> */}
            <Box
              sx={{
                width: 400,
                height: 320,
                position: "absolute",
                top: 350,
                left: 200,
                padding: 1,
                backgroundColor: "rgb(10, 10, 40)",
              }}
            >
              <DisplayImages
                cGuess={cGuess}
                wGuess={wGuess}
                length={this.state.currWord.length}
              />
              <h6>
                Guess the word correctly and defeat the opponent before your
                health runs out!
              </h6>
            </Box>

            {/* {guessLeft>0?(<h5>You have {this.state.guessLeft} guesses left.</h5>):(<div></div>)} */}
          </div>
        );
      } else {
        //If game has not initialised, display button for initialisation
        return (
          <div>
            <br />
            <button onClick={this.initialiseGuess}>Start game</button>
            <br />
            You have won {won} out of {played} games so far.
          </div>
        );
      }
    };

    const displayResult = () => {
      //Display for winning the game
      if (playerHasWon) {
        return (
          <div>
            You have defeated your opponent and gained 114514 exp. Your pokemon
            has reached Lv. {won + 1}
            <br />
            <button onClick={this.restartGame}>Replay</button>
          </div>
        );
      } //Display for losing the game
      else if (guessLeft === 0 || wGuess === this.tries + 1) {
        return (
          <div>
            You whited out! Go to Pokemon centre to heal your pokemon
            <br />
            <button onClick={this.restartGame}>Pokemon centre</button>
          </div>
        );
      } //Display when game has not finished
      else {
        return <div></div>;
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
