import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import { images } from "./hangman.js";

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
      numGuessesLeft: 10, // give the user 10 guesses, just like how it takes to do a hangman
      // Insert form input state here
      inputLetter: "",
      displayMessage: null,
      score: 0,
      gamesPlayed: 0,
    };

    // Bind event handlers to 'this'
    this.handleInputChange = this.handleInputChange.bind(this);
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

  // Insert form callback functions handleChange and handleSubmit here
  handleInputChange(event) {
    this.setState({ inputLetter: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputLetter, guessedLetters, currWord, numGuessesLeft } =
      this.state;

    // Check if letter was already guessed or is empty
    if (guessedLetters.includes(inputLetter) || !inputLetter) {
      return;
    }

    // Check if the letter is in the current word
    const isLetterCorrect = currWord.includes(inputLetter);

    this.setState(
      (prevState) => ({
        guessedLetters: [...prevState.guessedLetters, inputLetter],
        // Only decrement if the guessed letter is wrong
        numGuessesLeft: isLetterCorrect
          ? prevState.numGuessesLeft
          : prevState.numGuessesLeft - 1,
        inputLetter: "", // clear the input
      }),
      () => {
        // Callback function after state is updated
        this.checkGameConditions();
      }
    );
  }
  displayInAppMessage(message) {
    this.setState({ displayMessage: message });
  }
  checkGameConditions() {
    const { currWord, guessedLetters, numGuessesLeft } = this.state;

    const isWordGuessed = [...currWord].every((letter) =>
      guessedLetters.includes(letter)
    );

    if (isWordGuessed) {
      this.displayInAppMessage("You guessed the word! Well done!");
      this.resetGame();
      this.updateScore();
      this.gamesPlayed();
    } else if (numGuessesLeft <= 0) {
      this.displayInAppMessage(`Game over! The word was ${currWord}`);
      this.resetGame();
      this.gamesPlayed();
    }
  }

  resetGame() {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessesLeft: 10,
      inputLetter: "",
    });
  }

  updateScore() {
    this.setState({ score: this.state.score + 1 });
  }

  gamesPlayed() {
    this.setState({ gamesPlayed: this.state.gamesPlayed + 1 });
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    // Join letters with spaces to improve the display
    return wordDisplay.join(" ");
  };

  render() {
    const { displayMessage, numGuessesLeft } = this.state;
    const incorrectGuesses = 10 - numGuessesLeft;

    return (
      <div className="App bg-gradient-to-br from-gray-700 to-red-700 min-h-screen flex flex-col justify-center items-center">
        {/* Header */}
        <header className="App-header mb-10 w-full text-center bg-white p-5 shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">
            Guess the word, don't get hanged
          </h1>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-5 bg-white rounded-xl shadow-lg grid grid-cols-3 gap-5">
          {/* Section 1: Game Message */}
          <section
            id="game-message"
            className="col-span-1 bg-gray-300 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-3">Win or Lose?</h3>
            <p className="text-3xl text-gray-700 font-bold mb-5">
              {displayMessage && (
                <div className="inlineMessage mt-3">{displayMessage}</div>
              )}
            </p>

            <h3 className="text-xl font-semibold mb-3">Game Score</h3>
            <p>
              Won: {this.state.score} rounds & Played: {this.state.gamesPlayed}{" "}
              rounds
            </p>
          </section>

          {/* Section 2: Game Play */}
          <section
            id="game-play"
            className="col-span-2 bg-gray-400 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-3">The Word</h3>
            {this.generateWordDisplay()}
            <h3 className="text-xl font-semibold mb-3 mt-5">Guessed Letters</h3>
            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
            <h3 className="text-xl font-semibold mb-3 mt-5">
              Enter New Letter
            </h3>
            <form onSubmit={this.handleSubmit} className="flex">
              <input
                type="text"
                value={this.state.inputLetter}
                onChange={this.handleInputChange}
                maxLength="1"
                className="border p-2 rounded-l-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
              >
                Guess
              </button>
            </form>
          </section>

          {/* Section 3: Game Hangman */}
          <section
            id="game-hangman"
            className="col-span-3 bg-gray-200 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-3">Guesses Left</h3>
            <p>{this.state.numGuessesLeft}</p>
            <h3 className="text-xl font-semibold mb-3 mt-5">Hangman State</h3>
            <p className="flex justify-center">
              {/* Hangman Image */}
              <img src={images[incorrectGuesses]} alt="Hangman State" />{" "}
            </p>
          </section>

          {/* Section 4: Game Rules */}
          <section
            id="game-rules"
            className="col-span-3 bg-gray-300 rounded-xl p-8"
          >
            <h3 className="col-span-3 text-xl font-semibold mb-3">
              Game Rules
            </h3>
            <p>
              You're playing a game of Hangman. Guess the word. If you're right,
              you won't get an additional line drawn. If you're wrong, you will
              have more lines drawn. Your game ends when you hang the man. Keep
              playing and enjoy guessing the words. It's so easy.
            </p>
          </section>
        </main>

        <footer className="w-full text-center bg-white p-5 shadow-md mt-10">
          <p>Made with 🚀</p>
        </footer>
      </div>
    );
  }
}

export default App;
