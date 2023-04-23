import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      numOfGuesses: 10,
      // Insert form input state here
      value: "",
      winCondition: false,
      score: 0,
      displayNumber: 0,
    };
    this.handleChange = this.handleChange.bind(this);
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

  generateImgDisplay = () => {
    let displayOrder = require(`./hangman/${this.state.displayNumber}.jpg`);

    return <img src={displayOrder} alt="hangman" />;
  };

  displayFinalWord = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      wordDisplay.push(letter);
    }

    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    let inputValue = event.target.value.toLowerCase();
    inputValue.length < 2 && inputValue !== event.target.value.toUpperCase() //ECMAScript Case Transformation to check if thats a letter
      ? this.setState({ value: inputValue })
      : this.setState({ value: "" });

    if (inputValue.length >= 2) {
      alert("Please input only one letter.");
    } else if (inputValue === event.target.value.toUpperCase()) {
      alert("Please input letters only.");
    }
  }

  checkMatched = (inputLetter) => {
    for (let letter of this.state.currWord) {
      if (inputLetter === letter) {
        return true;
      }
    }
    return false;
  };

  checkRepeated = (VALUE, ARRAY) => {
    const guessedLettersArray = this.state.guessedLetters;
    let boolean = false;

    for (let i = 0; i < guessedLettersArray.length; i++) {
      if (guessedLettersArray[i] === VALUE) {
        boolean = true;
      }
    }

    if (boolean === true) {
      alert("You already have inputted this letter before.");
      this.setState({ value: "" });
    } else {
      ARRAY.push(VALUE);
      if (this.state.numOfGuesses === 0) {
        this.setState({ displayNumber: 11 });
      }
      this.setState((state) => ({
        guessedLetters: ARRAY,
        numOfGuesses: this.checkMatched(VALUE)
          ? state.numOfGuesses
          : state.numOfGuesses - 1,
        value: "",
        displayNumber: this.checkMatched(VALUE)
          ? state.displayNumber
          : state.displayNumber + 1,
      }));
    }
  };

  restart = () => {
    this.setState((state) => ({
      currWord: getRandomWord(),
      guessedLetters: [],
      numOfGuesses: 10,
      value: "",
      winCondition: false,
      score: state.winCondition === true ? state.score + 1 : state.score,
      displayNumber: 0,
    }));
  };

  submit = () => {
    const inputArray = [...this.state.guessedLetters];
    let inputValue = this.state.value.trim();

    this.state.numOfGuesses !== 0 && inputValue === ""
      ? alert("Do not input an empty string.")
      : this.checkRepeated(inputValue, inputArray);
  };

  handleSubmit(event) {
    const found = this.generateWordDisplay().indexOf("_");

    found === -1 && this.setState({ winCondition: true });

    this.state.numOfGuesses === 0 || found === -1
      ? this.restart()
      : this.submit();

    event.preventDefault();
  }

  componentDidUpdate() {
    console.log(JSON.stringify(this.state.numOfGuesses));
    console.log(JSON.stringify(this.state.value.trim()));
    console.log(JSON.stringify(this.state.currWord));
    console.log(JSON.stringify(this.state.winCondition));
  }

  render() {
    const found = this.generateWordDisplay().indexOf("_");

    const winMessage = <h3>You have guessed the character correctly!</h3>;

    const loseMessage = this.state.numOfGuesses === 0 && (
      <h3>You have guess wrongly! Too bad.</h3>
    );

    return (
      <div className="App">
        <header className="App-header">
          <Container fluid className="header">
            <Row>
              <Col>
                <h1>Guess The Word</h1>
              </Col>
              <Col>Score : {this.state.score}</Col>
            </Row>
          </Container>
          <Container fluid className="body">
            <Row>
              <Col>
                <h3>Word Display</h3>
              </Col>
              <Col>
                {found === -1 || this.state.numOfGuesses === 0
                  ? this.displayFinalWord()
                  : this.generateWordDisplay()}
              </Col>
              <Col>
                {(found !== -1 || this.state.numOfGuesses !== 0) &&
                  this.generateImgDisplay()}
              </Col>
            </Row>
          </Container>
          <Container fluid className="displayGuess">
            <Row>
              <Col>
                <h3>Guessed Letters</h3>
              </Col>
              <Col>
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.toString()
                  : "-"}
              </Col>
            </Row>
          </Container>
          <Container fluid className="message">
            <Row>{found === -1 ? winMessage : loseMessage}</Row>
          </Container>
          <Container fluid className="submitField">
            <Row>
              <Col>
                <h3>Input</h3>
              </Col>
              <Col>
                <form onSubmit={this.handleSubmit}>
                  <label>Letter : </label>
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  {found === -1 || this.state.numOfGuesses === 0 ? (
                    <input type="submit" value="Restart" />
                  ) : (
                    <input type="submit" value="Submit" />
                  )}
                </form>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
