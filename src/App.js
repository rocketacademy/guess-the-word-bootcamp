import { useState, useEffect, useRef } from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

function App() {
  // word is the current secret word for this round. Update this with setWord after each round.
  // const [word, setWord] = useState(getRandomWord());
  const [word, setWord] = useState("ABCDE");
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  // Insert num guesses left state here
  const [numGuesses, setNumGuesses] = useState(10);
  // Insert form input state here
  const [guessedLetter, setGuessedLetter] = useState("");

  const [gameWon, setGameWon] = useState(false);

  const generateWordDisplay = (guessedLetters) => {
    const wordDisplay = word
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"));
    return wordDisplay.join(" ");
  };

  const handleGuessChange = (event) => {
    setGuessedLetter(event.target.value.slice(0, 1).toUpperCase());
  };

  const [wordDisplay, setWordDisplay] = useState(generateWordDisplay([]));

  // Insert form callback functions handleFormChange and handleFormSubmit here
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (guessedLetter === "") {
      return;
    }

    const newGuessedLetters = [...guessedLetters, guessedLetter];
    setGuessedLetters(newGuessedLetters);

    setWordDisplay(generateWordDisplay(newGuessedLetters));

    const newNumGuesses = numGuesses - 1;
    setNumGuesses(newNumGuesses);

    setGuessedLetter("");

    const newGameWon = word
      .split("")
      .every((letter) => newGuessedLetters.includes(letter));
    setGameWon(newGameWon);

    if (gameWon) {
    } else if (newNumGuesses === 0) {
    }
  };

  const guessedLetterRef = useRef(null);
  const newGameRef = useRef(null);

  useEffect(() => {
    if (guessedLetterRef.current) {
      guessedLetterRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (gameWon && newGameRef.current) {
      newGameRef.current.focus();
    }
  }, [gameWon]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>

        {!gameWon && (
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="guessed-letter">Guess a letter:</label>
            <input
              type="text"
              id="guessed-letter"
              value={guessedLetter}
              onChange={handleGuessChange}
              ref={guessedLetterRef}
            />
            <button id="submit-guess" disabled={!guessedLetter}>
              Submit
            </button>
          </form>
        )}

        {gameWon && (
          <>
            <p>You've guessed the word!</p>
            <button id="new-game" ref={newGameRef}>
              New Game
            </button>
          </>
        )}

        <p>Guesses left: {numGuesses}</p>

        <h2>The Word</h2>
        <p>{wordDisplay}</p>

        {guessedLetters.length > 0 && (
          <>
            <h2>Guessed Letters</h2>
            <p>{guessedLetters.join(", ")}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
