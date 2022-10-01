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
    for (const letter of currWord) {
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

  const isCorrectWord = () => {
    for (const letter of currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGuessedLetters([...guessedLetters, formData]);
    setNumOfGuesses((prevGuess) => prevGuess - 1);
    setFormData((prevFormData) => "");
  };

  const winner = isCorrectWord();

  const handleReset = () => {
    setCurrWord((prevCurrWord) => getRandomWord());
    setGuessedLetters((prevGuessedLetters) => []);
    setNumOfGuesses((prevNumOfGuesses) => 10);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {!numOfGuesses || winner ? currWord : generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <h3>{`Guesses Left : ${numOfGuesses}`}</h3>
        {winner ? <h3>You Won</h3> : <h3>You Lost</h3>}
        <h3>Input</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="guessedLetter"
            placeholder="Guessed Letter"
            onChange={handleChange}
            value={formData}
          />
          {numOfGuesses && !winner ? (
            <button>Submit</button>
          ) : (
            <button onClick={handleReset}>Reset</button>
          )}
        </form>
      </header>
    </div>
  );
}
