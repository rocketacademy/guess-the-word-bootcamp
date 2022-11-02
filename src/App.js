import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Header from "./Components/Header";
import Figure from "./Components/Figure";
import WrongLetters from "./Components/WrongLetters.js";
import WordDisplay from "./Components/WordDisplay";
import Input from "./Components/Input.js";
import Notification from "./Components/Notification.js";
import Popup from "./Components/Popup.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // correctLetters stores all letters a user has guessed correctly so far. wrongLetters vice-versa.
      wrongLetters: [],
      correctLetters: [],
      showNotification: false,
      startGame: true,
      currentLetter: '',
      // Insert num guesses left state here
      // Insert form input state here
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    const { key, keyCode } = e;
    if (this.state.startGame && keyCode >= 65 && keyCode <= 90) {
      const letter = key.toLowerCase();
      // If the currWord includes the letter you typed and if the correctLetter Array doesn't include the letter
      if (this.state.currWord.includes(letter)) {
        if (!this.state.correctLetters.includes(letter)) {
          this.setState(
            {
              correctLetters: [...this.state.correctLetters, letter],
              currentLetter: letter
            },
            console.log("Correct", this.state.correctLetters)
          );
        }
        // How do I refactor the code from line 44 to 52?
        else {
          this.setState({
            showNotification: true,
          });
          setTimeout(() => {
            this.setState({
              showNotification: false,
            });
          }, 2000);
        }
      } else {
        // If doesn't include a wrong letter, modify wrongLetter array
        if (!this.state.wrongLetters.includes(letter)) {
          this.setState(
            {
              wrongLetters: [...this.state.wrongLetters, letter],
              currentLetter: letter,
            },
            console.log("Wrong", this.state.wrongLetters)
          );
        } else {
          this.setState({
            showNotification: true,
          });
          setTimeout(() => {
            this.setState({
              showNotification: false,
            });
          }, 2000);
        }
      }
    }
  }

  resetGame = () => {
    this.setState({
      correctLetters: [],
      wrongLetters: [],
      currWord: getRandomWord(),
      showNotification: false,
      startGame: true,
      currentLetter: ''
    })
  }

  render() {
    return (
      <div className="container">
        <header className="App-header">
          <Header />

          <div className="game-container">
            <Figure wrongLetters={this.state.wrongLetters} />
            <WrongLetters wrongLetters={this.state.wrongLetters} />
            <WordDisplay
              currWord={this.state.currWord}
              correctLetters={this.state.correctLetters}
            />
            <Input onKeyDown={this.handleKeyDown} letter={this.state.currentLetter} />
          </div>
          <Popup
            correctLetters={this.state.correctLetters}
            wrongLetters={this.state.wrongLetters}
            currWord={this.state.currWord}
            startGame={this.state.startGame}
            resetGame={this.resetGame}
          />
          <Notification showNotification={this.state.showNotification} />
        </header>
      </div>
    );
  }
}

export default App;

// generateWordDisplay = () => {
//   const wordDisplay = [];
//   // for...of is a string and array iterator that does not use index
//   for (let letter of this.state.currWord) {
//     if (this.state.guessedLetters.includes(letter)) {
//       wordDisplay.push(letter);
//     } else {
//       wordDisplay.push("_");
//     }
//   }
//   return wordDisplay.toString();
// };

// Insert form callback functions handleChange and handleSubmit here

//   <h3>Word Display</h3>
//   {this.generateWordDisplay()}
//   <h3>Guessed Letters</h3>
//   {this.state.guessedLetters.length > 0
//     ? this.state.guessedLetters.toString()
//     : "-"}
//   <h3>Input</h3>
//   {/* Insert form element here */}
//   Todo: Insert form element here
// </header>
