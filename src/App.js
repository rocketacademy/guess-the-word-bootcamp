import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    const roundsPlayed =
      parseInt(localStorage.getItem("roundsPlayed"), 10) || 0;
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessesLeft: 10,
      inputValue: "",
      gameWon: false,
      gameOver: false,
      wrongGuesses: 0,
      roundsPlayed: roundsPlayed,
      roundsWon: 0,
    };
  }

  updateLocalStorageRoundsPlayed(roundsPlayed) {
    localStorage.setItem("roundsPlayed", roundsPlayed);
  }

  startNewRound = () => {
    this.setState(
      (prevState) => ({
        currWord: getRandomWord(),
        guessedLetters: [],
        numGuessesLeft: 10,
        inputValue: "",
        gameWon: false,
        gameOver: false,
        wrongGuesses: 0,
        roundsPlayed: prevState.roundsPlayed + 1, // Increment roundsPlayed
      }),
      () => {
        this.updateLocalStorageRoundsPlayed(this.state.roundsPlayed);
      }
    );
  };

  componentDidMount() {
    this.componentIsMounted = true;
    this.startNewRound(); // Start a new round when the component is mounted
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = this.state.inputValue.trim().toLowerCase();

    if (inputValue.length === 1 && /^[a-z]$/.test(inputValue)) {
      if (!this.state.guessedLetters.includes(inputValue)) {
        const guessedLetters = [...this.state.guessedLetters, inputValue];
        this.setState(
          {
            guessedLetters,
            inputValue: "",
          },
          () => {
            this.checkLetterInWord(inputValue);
          }
        );
      } else {
        alert("You've already guessed this letter!");
      }
    } else {
      alert("Please enter a single letter.");
    }
  };

  checkLetterInWord = (letter) => {
    const currWord = this.state.currWord;
    if (currWord.includes(letter)) {
      const wordSet = new Set(currWord.split(""));
      const guessedSet = new Set(this.state.guessedLetters);
      if (Array.from(wordSet).every((c) => guessedSet.has(c))) {
        this.setState(
          (prevState) => ({
            gameWon: true,
            roundsWon: prevState.roundsWon + 1,
          }),
          () => {
            setTimeout(this.startNewRound, 2000); // Delay starting a new round
          }
        );
      }
    } else {
      this.setState((prevState) => ({
        numGuessesLeft: prevState.numGuessesLeft - 1,
        wrongGuesses: prevState.wrongGuesses + 1,
      }));

      if (this.state.numGuessesLeft === 0) {
        this.setState(
          {
            gameOver: true,
          },
          () => {
            setTimeout(this.startNewRound, 2000); // Delay starting a new round
          }
        );
      }
    }
  };

  handleRoundPlayedIncrement = () => {
    this.setState(
      (prevState) => ({
        roundsPlayed: prevState.roundsPlayed + 1,
      }),
      () => {
        this.updateLocalStorageRoundsPlayed(this.state.roundsPlayed);
      }
    );
  };

  generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(" "); // Join the array into a string
  };

  render() {
    const { gameWon, gameOver, wrongGuesses, roundsWon } = this.state;

    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h1 className="mt-3 mb-3">Guess The Word 🚀</h1>
              <h3>Word Display</h3>
              <p className="word-display">{this.generateWordDisplay()}</p>
              <h3>Guessed Letters</h3>
              <p>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.join(", ")
                  : "-"}
              </p>
              {!gameOver && !gameWon && (
                <>
                  <h3>Input</h3>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        maxLength="1"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Guess
                    </Button>
                  </Form>
                </>
              )}
              {gameWon && (
                <div>
                  <p>Congratulations! You've won this round!</p>
                </div>
              )}
              {gameOver && (
                <div>
                  <p>
                    Sorry, you've run out of guesses. The word was{" "}
                    {this.state.currWord}.
                  </p>
                </div>
              )}
              {(gameWon || gameOver) && (
                <Button variant="primary" onClick={this.startNewRound}>
                  Next Round
                </Button>
              )}
            </Col>
            <Col>
              <h3>Guesses Left</h3>
              <div className="guesses-left">
                {Array.from(
                  { length: this.state.numGuessesLeft },
                  (_, index) => (
                    <Image
                      key={index}
                      src="./heart.png" // Relative path to your image within the project directory
                      alt="Heart"
                      className={`heart-image ${
                        index < wrongGuesses ? "gray" : ""
                      }`}
                    />
                  )
                )}
              </div>
            </Col>
            <Col>
              <h3>Round Stats</h3>
              <p>Rounds Played: {this.state.roundsPlayed}</p>
              <p>Rounds Won: {roundsWon}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
