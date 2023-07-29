import React, { useState, useEffect } from "react";
import { getRandomWord } from "./utils.js";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import "./App.css";

const App = () => {
  const [currWord, setCurrWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guess, setGuess] = useState("");
  const [numGuessesLeft, setNumGuessesLeft] = useState(6);
  const [gameStatus, setGameStatus] = useState(""); // "won", "lost", or ""
  const [score, setScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [speech, setSpeech] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    setCurrWord(getRandomWord());
  }, []);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const newRecognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      newRecognition.lang = "en-US";
      newRecognition.interimResults = false;
      newRecognition.maxAlternatives = 1;

      newRecognition.onresult = (event) => {
        setSpeech(event.results[0][0].transcript.toLowerCase());
      };

      setRecognition(newRecognition);
    } else {
      console.log("Speech recognition not supported");
    }
  }, []);

  const startSpeechRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(" ");
  };

  const handleChange = (event) => {
    setGuess(event.target.value.toLowerCase());
  };

  const handleGuess = (guess) => {
    if (guess && !guessedLetters.includes(guess) && guess.length === 1) {
      setGuessedLetters([...guessedLetters, guess]);
      if (!currWord.split("").includes(guess)) {
        setNumGuessesLeft(numGuessesLeft - 1);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleGuess(guess);
    setGuess("");
  };

  const handleSpeechSubmit = () => {
    handleGuess(speech);
    setSpeech("");
  };

  useEffect(() => {
    if (numGuessesLeft === 0) {
      setGameStatus("lost");
    } else if (!generateWordDisplay().includes("_")) {
      setGameStatus("won");
      setScore(score + 1);
    }
  }, [guessedLetters, numGuessesLeft]);

  const resetGame = () => {
    setCurrWord(getRandomWord());
    setGuessedLetters([]);
    setNumGuessesLeft(6);
    setGameStatus("");
    setRoundsPlayed(roundsPlayed + 1);
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} align="center" justify="center">
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ margin: "40px 0" }}>
            Guess The Word 🤔
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Game Won - Total Attempts </Typography>
          <Typography variant="h5">
            {score} / {roundsPlayed}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div className="grayBorder">
            <Typography variant="subtitle1">Word Display</Typography>
            <Typography>{generateWordDisplay()}</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="grayBorder">
            <Typography variant="subtitle1">Guessed Letters</Typography>
            <Typography>
              {guessedLetters.length > 0 ? guessedLetters.join(", ") : "-"}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Input a letter"
              variant="outlined"
              value={guess}
              onChange={handleChange}
              disabled={gameStatus === "won" || gameStatus === "lost"}
              style={{ width: "400px", height: "50px" }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "40px" }}
            >
              Submit YOUR GUESS
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={startSpeechRecognition}
            style={{
              marginTop: "10px",
              backgroundColor: "#35A29F",
              color: "#FFF",
            }}
          >
            Try Speech Recognition to Guess
          </Button>
        </Grid>
        <Grid item xs={12}>
          {speech && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSpeechSubmit}
            >
              Submit Speech Result: {speech}
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Guesses left: {numGuessesLeft}</Typography>
        </Grid>
        <Grid item xs={12}>
          {gameStatus === "won" && (
            <Typography variant="h6" color="primary">
              Congratulations, you won!
            </Typography>
          )}
          {gameStatus === "lost" && (
            <Typography variant="h6" color="primary">
              🫣 Oops.. You lost! The word was: {currWord}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {(gameStatus === "won" || gameStatus === "lost") && (
            <Button
              variant="contained"
              color="primary"
              onClick={resetGame}
              style={{ marginTop: "20px", marginBottom: "40px" }}
            >
              Play again
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
