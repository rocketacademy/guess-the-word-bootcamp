import { useState, useEffect, useRef } from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

const NUM_GUESSES = 6;

function App() {
  // word is the current secret word for this round. Update this with setWord after each round.
  const [word, setWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  // Insert num guesses left state here
  const [numGuesses, setNumGuesses] = useState(NUM_GUESSES);
  // Insert form input state here
  const [guessedLetter, setGuessedLetter] = useState("");

  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

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

  // Insert form callback function handleFormSubmit here
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newGuessedLetters = [...guessedLetters, guessedLetter];
    setGuessedLetters(newGuessedLetters);

    setWordDisplay(generateWordDisplay(newGuessedLetters));

    let newNumGuesses = numGuesses;
    if (!word.includes(guessedLetter)) {
      newNumGuesses -= 1;
      setNumGuesses(newNumGuesses);
    }

    setGuessedLetter("");

    const newGameWon = word
      .split("")
      .every((letter) => newGuessedLetters.includes(letter));
    setGameWon(newGameWon);

    if (!gameWon && newNumGuesses === 0) {
      setGameLost(true);
    }
  };

  const handleNewGameClick = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setNumGuesses(NUM_GUESSES);
    setGuessedLetter("");
    setGameWon(false);
    setGameLost(false);
    setWordDisplay(generateWordDisplay([]));
  };

  const guessedLetterRef = useRef(null);
  const newGameRef = useRef(null);

  useEffect(() => {
    if (guessedLetterRef.current) {
      guessedLetterRef.current.focus();
    }
  }, [gameWon, gameLost]);

  useEffect(() => {
    if (gameWon && newGameRef.current) {
      newGameRef.current.focus();
    }
  }, [gameWon]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        {!gameWon && !gameLost && (
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

        {gameWon && <p>You've guessed the word!</p>}
        {gameLost && <p>You ran out of guesses. The answer was {word}.</p>}
        {(gameWon || gameLost) && (
          <>
            <button id="new-game" onClick={handleNewGameClick} ref={newGameRef}>
              Play Again
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
