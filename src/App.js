import React, { useState } from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const NUM_INITIAL_GUESSES = 6;

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
  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <h3>Input</h3>
        {/* Insert form element here */}
        Todo: Insert form element here
      </header>
    </div>
  );
};

export default App;
