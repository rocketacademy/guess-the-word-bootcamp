import React from "react";

import { getRandomWord } from "./utils.js";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
      // Insert form input state here
      value: "",
      maxGuess: 10,
      guessesLeft: 10,
      dupGuessMessage: "",
      nonDupPreviousGuess: null,
      gameRound: 0,
      playerGameScores: [],
      showOverrideWord: true,
      winCount: 0,
      winPercentage: 0,
    };

    // Bind callback functions to this  (see https://reactjs.org/docs/handling-events.html)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.lifeBar = this.lifeBar.bind(this);
    this.manualWordEntry = this.manualWordEntry.bind(this);
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter.toLowerCase())) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let newWord = this.state.value;

    this.setState({
      guessedLetters: [...this.state.guessedLetters, newWord[0].toLowerCase()],
      value: "",
      guessesLeft: this.state.guessesLeft - 1,
      nonDupPreviousGuess: true,
      showOverrideWord: false,
    });
  }

  handleDupGuess = () => {
    let guessedLetters = this.state.guessedLetters;
    for (let i = 0; i < guessedLetters.length; i++) {
      if (this.state.value === guessedLetters[i].toLowerCase()) {
        let dupGuessMessage = this.state.value;
        this.setState({
          value: "",
          dupGuessMessage: `You have guessed [${dupGuessMessage}] before. Please try again.`,
          nonDupPreviousGuess: false,
        });
      }
    }
  };

  lifeBar() {
    let guessesLeftPerc = (this.state.guessesLeft / this.state.maxGuess) * 100;
    return (
      <ProgressBar>
        <ProgressBar
          animated
          variant="danger"
          now={guessesLeftPerc > 25 ? 25 : guessesLeftPerc}
          key={1}
        />
        {guessesLeftPerc > 25 ? (
          <ProgressBar
            animated
            variant="warning"
            now={guessesLeftPerc > 50 ? 25 : guessesLeftPerc - 25}
            key={2}
          />
        ) : null}
        <ProgressBar
          animated
          striped
          variant="info"
          now={guessesLeftPerc > 75 ? 25 : guessesLeftPerc - 50}
          key={3}
        />
        <ProgressBar
          animated
          striped
          variant="success"
          now={guessesLeftPerc > 75 ? guessesLeftPerc - 75 : 0}
          key={4}
        />
      </ProgressBar>
    );
  }

  handleResetClick = (event, gameresult) => {
    const currGameScore = [
      {
        roundNum: this.state.gameRound + 1,
        word: this.state.currWord,
        result: gameresult === "Won" ? "Won" : "Lost",
        guessesLeft: this.state.guessesLeft,
      },
    ];

    let didwin = gameresult === "Won" ? 1 : 0;
    let winPerc =
      ((this.state.winCount + didwin) / (this.state.gameRound + 1)) * 100;

    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      value: "",
      guessesLeft: 10,
      gameRound: this.state.gameRound + 1,
      playerGameScores: [...this.state.playerGameScores, ...currGameScore],
      winCount: this.state.winCount + didwin,
      showOverrideWord: true,
      winPercentage: winPerc,
    });
  };

  manualWordEntry() {
    // ask user for input
    let manualWord = prompt("Please enter a word to guess", "Word");

    if (manualWord === null || manualWord === "") {
      return; // User cancelled or entered nothing
    }

    //override word with user input
    this.setState({
      currWord: manualWord,
      showOverrideWord: false,
    });
  }

  render() {
    const playerGameScoreTracker = this.state.playerGameScores.map(
      ({ roundNum, word, result, guessesLeft }) => (
        <Row>
          <Col>{roundNum}</Col>
          <Col>{word}</Col>
          <Col>{result}</Col>
          <Col>{guessesLeft}</Col>
        </Row>
      )
    );

    let word = this.generateWordDisplay();
    let gameResultMessage = "";
    let gameResult = "";
    if (word.includes("_") && this.state.guessesLeft === 0) {
      gameResultMessage = "You lost! The word was " + this.state.currWord;
    } else if (!word.includes("_")) {
      gameResult = "Won";
      gameResultMessage = `You won with ${this.state.guessesLeft} guesses left!`;
    }

    let gameLeftMessage = (
      <div>
        <br />
        {this.state.guessesLeft > 0
          ? "You have " + this.state.guessesLeft + " guesses left"
          : "You have no guesses left"}
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <br />
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <br />
          <br />
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <br />
          {/* Insert form element here */}
          {gameResultMessage !== "" ? (
            <div>
              <br />
              <Button
                variant="danger"
                onClick={(event) => this.handleResetClick(event, gameResult)}
              >
                Play Again
              </Button>
            </div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <h2>Guess a letter</h2>
              {/* handle duplicate guesses*/}
              {this.handleDupGuess()}
              {this.state.dupGuessMessage !== "" &&
                this.state.nonDupPreviousGuess === false && (
                  <div>
                    <br />
                    <Alert key="danger" variant="danger">
                      {this.state.dupGuessMessage}
                    </Alert>
                  </div>
                )}
              <br />
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.value}
                maxLength={1}
              />{" "}
              <Button size="lg" type="submit" value="Submit">
                Submit
              </Button>{" "}
              {this.state.showOverrideWord === true && (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={this.manualWordEntry}
                >
                  Override Word
                </Button>
              )}
              {gameResultMessage === "" && gameLeftMessage}
              {gameResultMessage === "" && this.lifeBar()}
            </form>
          )}

          {/* display game result message*/}
          {gameResultMessage !== "" && (
            <div>
              <br />
              {gameResultMessage}
            </div>
          )}
          <br />
          <br />

          {/* display score of all past games*/}
          {this.state.gameRound > 0 && (
            <Container
              fluid
              style={{
                border: "1px solid white",
              }}
            >
              <h3
                style={{
                  border: "1px solid white",
                }}
              >
                Score Board
              </h3>
              <h3>Win Rate: {this.state.winPercentage}%</h3>
              <Row
                style={{
                  border: "1px solid white",
                }}
              >
                <Col>Round</Col>
                <Col>Word</Col>
                <Col>Result</Col>
                <Col>Guesses Left</Col>
              </Row>
              {playerGameScoreTracker}
            </Container>
          )}
        </header>
      </div>
    );
  }
}

export default App;
