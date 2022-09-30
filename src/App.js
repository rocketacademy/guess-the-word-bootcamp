import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

export default function App() {
  const [currWord, setCurrWord] = React.useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [numOfGuesses, setNumOfGuesses] = React.useState(10);
  const [formData, setFormData] = React.useState("");

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

  const handleChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGuessedLetters([...guessedLetters, formData]);
    setNumOfGuesses((prevGuess) => prevGuess - 1);
    setFormData((prevFormData) => "");
  };

  const handleReset = () => {
    setCurrWord((prevCurrWord) => getRandomWord());
    setGuessedLetters((prevGuessedLetters) => []);
    setNumOfGuesses((prevNumOfGuesses) => 10)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <h3>Input</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="guessedLetter"
            placeholder="Guessed Letter"
            onChange={handleChange}
            value={formData}
          />
          <button>Submit</button>
        </form>
      </header>
    </div>
  );
}
