import React from "react";
import { getRandomWord } from "./utils.js";
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
      // Insert num guesses left state here
      NUM_GUESS: 10,
      // Insert form input state here
      formInput: '',
      verdict: 0, //0: ongoing, 1: win, 2: lose
      buttonText: 'Submit',
      answer: 0, //Counter for the scores
      rounds: 0, //Counter for number of rounds
      winRounds: 0, //Counter for wins
    };
    this.handleChange = this.handleChange.bind(this); //to bind to the button
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generateWordDisplay = () => {//Display letter
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

  checkHasUserGuessedWord = () => {
    // Create new array with spread operator because we do not wish to alter this.state.guessedLetters
    const guessedLetters = [...this.state.guessedLetters];
    for (let letter of this.state.currWord) {
      if (!guessedLetters.includes(letter)) {
        return false;
      }
    }
    // Return true if guessedLetters contains all letters in this.state.currWord
    return true;
  };

  animateImage = () =>{
    //checks if the person gets it right or wrong
    let classRef = this.checkHasUserGuessedWord() ? 'box box-right' : 'box box-normal'
    if (this.wordState()===2){ //lose
      classRef = 'box box-wrong'
    }
    console.log(classRef)
    //include the word display in
    return <div className={classRef}>
    {this.generateWordDisplay()} 
  </div>
  }

  wordState(){ //evaluate the current status
    let numTurns = this.state.NUM_GUESS-1;
    let win = this.checkHasUserGuessedWord();
    console.log([numTurns,win]);
    if (win){
      return 1
    }
    else if (numTurns === 0){ //run out of turns
      return 2
    }
    else {
      return 0
    }
  }

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    //console.log(event)
    //console.log(event.target.value)
    this.setState({
      formInput: event.target.value
    });
    console.log(this.state.currWord)
  }

 
  handleSubmit(event) {
    let inputL = [...this.state.formInput][0].toLowerCase();//first letter
    let guessL = [...this.state.guessedLetters,inputL];//add to output
    let winCounter = this.state.winRounds; 
    let roundCount = this.state.rounds;
    let numTurns = this.state.NUM_GUESS-1;
    console.log(guessL);
    console.log([winCounter,roundCount]);

    roundCount += 1; //roundCount increased by 1

    //if the game is over
    if (this.wordState() === 1 || this.wordState() === 2 ){
      //Evaluate the verdict
      let verdict = (this.checkHasUserGuessedWord() ? 'win!' : 'lose!');
      let output = "Game has ended! You " + verdict + "\nThe word is " + this.state.currWord+".";
      if (this.wordState()===1){ //If it wins then the scores will be displayed
        winCounter += 1; //Increase by 1
      }


      alert(output)
      
      this.setState({
        NUM_GUESS: 10,
        buttonText: 'Restart',
        guessedLetters: [],
        currWord: getRandomWord(),
        rounds: roundCount,
        winRounds: winCounter
      });
    }

    else{

      this.setState({
        guessedLetters: guessL,
        NUM_GUESS: numTurns,
        buttonText: 'Submit'
      });
      //alert('Letter: ' + event.target.value);
    }
    

    event.preventDefault();
  }

  

  render() {
    let firstLetter = this.state.formInput.charAt(0) //showfirst letter only

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.animateImage()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3 id='inputText'>Input</h3>
          {/* Insert form element here */}
          <h4>Turns Left: {this.state.NUM_GUESS}</h4>
          <h4>Winning Streak: {this.state.winRounds}/{this.state.rounds}</h4>
          <form onSubmit={this.handleSubmit}>
            <h4>Please Submit 1 Letter at a Time</h4>
            <input type='search' value={firstLetter.toLowerCase()} onChange={this.handleChange}/>
            <input type='submit' value={this.state.buttonText}/>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
