import React from "react";
import { getRandomWord } from "./utils.js";
import WordInput from "./components/WordInput.js";
import Card from "./components/Card.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      guessedMatchCount: 0,
      guessesChanceLeft: 10,
      currWordInput: "",
      wordDisplay: [],
      validate: false,
      matchWon: 0
    };
  }

  handleChange = (wordInput) => {
    this.setState({
      currWordInput: wordInput
    });
  };

  handleSubmit = () => {
    //Get the state
    const {guessedLetters} = this.state;
    let {currWordInput} = this.state;

    console.log(guessedLetters);
    console.log(currWordInput);

    //If else statement controlling the input
    if (currWordInput === "") {
      alert("Please input your guess.");

    } else if (currWordInput.length >= 2){
      alert("Please input only 1 alphabet at a time.");
      this.setState({
        currWordInput: ""
      });

    //push the letter into array.
    } else if (!guessedLetters.includes(currWordInput)) {
      this.setState({
          guessedLetters: [...guessedLetters, currWordInput]
        }, this.initializeWordDisplay);

    } else {
      alert("You have guessed this word before");
      this.setState({
        currWordInput: ""
      });
    }
  };

  // Initialize wordDisplay on every run.
  initializeWordDisplay = () => {
    this.setState({
      wordDisplay: [],
      guessedMatchCount: 0
    }, this.generateWordDisplay)
  }

  generateWordDisplay = () => {
    let { currWord, guessedMatchCount, matchWon} = this.state;
    const { guessedLetters, wordDisplay } = this.state;

    console.log(typeof guessedLetters);
    console.log(guessedLetters);

    //Pushing in correct guessed letter and "_" into the array
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
        guessedMatchCount = guessedMatchCount + 1;
      } else {
        wordDisplay.push("_");
      };
    }

    //handles if the user guess all the words correct
    if (guessedMatchCount === currWord.length) {
      this.setState({
        wordDisplay: wordDisplay,
        guessedMatchCount: guessedMatchCount,
        validate: true,
        matchWon: matchWon + 1
      }, this.initializeGuessessChanceLeft);
    } else {
      this.setState({
        wordDisplay: wordDisplay,
        guessedMatchCount: guessedMatchCount,
        validate: false,
      }, this.initializeGuessessChanceLeft);
    };
  };

  // Initialize GuessessChanceLeft on every run to 10
  initializeGuessessChanceLeft = () => {
    this.setState({
      guessesChanceLeft: 10
    }, this.handleGuessesLeft)
  }

  handleGuessesLeft = () => {
    let { guessedLetters, guessedMatchCount, guessesChanceLeft } = this.state;
    
    console.log(guessedMatchCount);
    console.log(guessesChanceLeft);
    
    let result = guessesChanceLeft - guessedLetters.length + guessedMatchCount;
    this.setState( {
      guessesChanceLeft: result,
      // Make the input textbox empty
      currWordInput: ""
    });
  };

  restart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessedMatchCount: 0,
      guessesChanceLeft: 10,
      currWordInput: "",
      wordDisplay: [],
      validate: false,
    })
  }

  render() {
    let { currWord, guessedLetters, guessesChanceLeft, currWordInput, wordDisplay, validate, matchWon } = this.state;
    let announcement, inputStatus, restartButton, mappedWordDislplay

    mappedWordDislplay = wordDisplay.map((alphabet) => {
      return <Card status="onGoing">{alphabet.toUpperCase()}</Card>
    })

    if (validate) {
      announcement = (
        <div>
          <p>Congratulations, you win the game!</p>
          <p>Match Won : {matchWon}</p>
        </div>
      )
      inputStatus = "disabled";
      restartButton = <button class="btn w-full" onClick={this.restart}>Restart</button>
      mappedWordDislplay = Array.from(currWord).map((alphabet) => {
        return <Card status="won">{alphabet.toUpperCase()}</Card>
      });

    } else if (guessesChanceLeft === 0) {
      announcement = (
        <div>
          <p>Sorry you have run out your guesses!</p>
          <p>The correct answer is "{currWord}"</p>
        </div>
      )
      inputStatus = "disabled";
      restartButton = <button class="btn w-full" onClick={this.restart}>Restart</button>
      mappedWordDislplay = Array.from(currWord).map((alphabet) => {
        return <Card status="lose">{alphabet.toUpperCase()}</Card>
      });

    } else {
      announcement = (
        <div>
          <p>Number guesses left : {guessesChanceLeft}</p>
          <p>Match Won : {matchWon}</p>
        </div>
      )
    }

    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="text-4xl">🚀 Guess The Word 🚀</h1>
          </header>
          <br />
        </div>
        <div>
          <section className="flex flex-col gap-5 justify-center content-center items-center">
            <div className="flex flex-row gap-2 justify-center content-center items-center">
              {mappedWordDislplay}
            </div>
            {announcement}
            <div>
              Word Guessed : {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
            </div>
            <div className="flex flex-col gap-2">
              <WordInput
                status={inputStatus}
                input={currWordInput}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
              {restartButton}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
