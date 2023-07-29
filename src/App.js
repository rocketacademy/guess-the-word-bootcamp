import React, { useState } from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const NUM_INITIAL_GUESSES = 12;

const App = () => {
  const [currWord, setCurrWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [numGuessesLeft, setNumGuessesLeft] = useState(NUM_INITIAL_GUESSES);
  const [input, setInput] = useState("");
  console.log("Start Curr word:", currWord);

  const resetGame = () => {
    setCurrWord(getRandomWord());
    setGuessedLetters([]);
    setNumGuessesLeft(NUM_INITIAL_GUESSES);
    setInput("");
    console.log("Reset game. Curr word", currWord);
  };

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  const handleChange = (e) => {
    const inputLetter = e.target.value[0] || "";
    setInput(inputLetter);
    console.log("inputLetter:", inputLetter);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }

    // Save the lowercase first letter of submission
    const inputLetter = input[0].toLowerCase();
    // if (!/^[a-zA-Z]$/.test(inputLetter)) {
    //   return;
    // }
    const newGuessedLetters = [...guessedLetters, inputLetter];
    setGuessedLetters(newGuessedLetters);
    setNumGuessesLeft(
      currWord.includes(inputLetter) ? numGuessesLeft : numGuessesLeft - 1
    );
    setInput("");
  };

  const checkCorrectWordGuessed = (inputLetter) => {
    const guessedLettersArray = [...guessedLetters, inputLetter];
    for (let letter of currWord) {
      if (!guessedLettersArray.includes(letter)) {
        return false;
      }
    }
    console.log("Correct Word Guessed");
    return true;
  };

  const correctWordGuessed = checkCorrectWordGuessed(input);
  const disableInputFlag = correctWordGuessed || numGuessesLeft === 0;
  const replayButton = <button onClick={resetGame}>Replay the Game</button>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <h3>Hangman - Input</h3>
        <p>Input one letter at a time, please!</p>
        {/* Insert form element here */}
        <form onSubmit={handleSubmit}>
          <label>
            Letter:
            <input
              type="text"
              maxLength="1"
              value={input}
              onChange={handleChange}
              disabled={disableInputFlag}
            ></input>
          </label>
          <input
            type="submit"
            value="Submit"
            disabled={disableInputFlag}
          ></input>
        </form>
        {correctWordGuessed && (
          <div>
            <p> Woot! You guessed the correct word!</p>
            {replayButton}
          </div>
        )}
        {numGuessesLeft === 0 && !correctWordGuessed && (
          <div>
            <p>Sorry, you're out of tries</p>
            {replayButton}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
