import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";


import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
 
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
      letter: '', //this is the name given to the input field
      numGuessLeft: 9,
      wrongGuess: 0,
      wrongGuessArr: [],
       
      bodyPartsArr: [
      "roundHead", "torso", "leftArm", "rightArm", "leftLeg", "rightLeg", "leftEye", "rightEye", "frown"
      ],
      shownBodyPartsArr: []
      
    };
    /* console.log(this.state.currWord); */
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
 
  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) =>{
    /* console.log(event); */
    const { value, name } = event.target;
    /* console.log("value:", value);
    console.log("name:", name); */
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    /* console.log(e) */

    //create a variable to ensure that first letter submitted is lowercase
    const inputLetter = this.state.letter[0].toLowerCase();

   
    this.handleWrongGuess();
    //use prevState as parameter for both the setState 
    this.setState(prevState=>({
      guessedLetters: [...this.state.guessedLetters, inputLetter],
      numGuessLeft: this.state.currWord.includes(inputLetter) ? this.state.numGuessLeft : this.state.numGuessLeft-1,
      //resets the input field
      letter: "",
    }));
    /* this.setState({
      guessedLetters: [...this.state.guessedLetters, this.state.letter],
      letter: ''
    }) */
  }

  checkUserGuessedWord = (inputLetter) =>{
    // create spread array of guessedLetters without changing this.state.guessLetters
    const guessedLetters = [...this.state.guessedLetters, inputLetter];
    //loop through to scan whether letter appears inside currWord
    for(let letter of this.state.currWord){
      if(!guessedLetters.includes(letter)){
        return false;
      }
    }
    //Return true if guessedLetters contains all letters inside this.state.currWord
    return true;
  };    

  resetGame = () =>{
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessLeft: 9,
      input: "",
      shownBodyPartsArr: []
    })
  }

  
  handleWrongGuess = () =>{
    console.log(this.state.shownBodyPartsArr)
    this.setState(prevState=>({
      wrongGuess: this.state.wrongGuess+1,
      /*wrongGuessArr: [...this.state.wrongGuess, this.state.wrongGuess], */
      //wrongGuessArr adds 1
      /* wrongGuessArr: wrongGuessArr.push(wrongGuess), */
      shownBodyPartsArr: [...this.state.shownBodyPartsArr, this.state.bodyPartsArr[0]],
      bodyPartsArr: this.state.bodyPartsArr.slice(1)
     //use the index of the wrongGuessArr to match the index of the bodyPartsArr 
     //if(wrongGuessArr[] == bodyPartsArr[]){
     //
     //}
     //so if the wrongGuessArr's index is 0, it should match to the bodyPartsArr index of 0
     //and render the corresponding bodypart <p> in the return
     //make the <p> CSS display: visible
    }))
  }
  render() {
    //Check whether user has guessed correctly the word
    const hasUserGuessedWord = this.checkUserGuessedWord();
    const shouldDisableInput = hasUserGuessedWord || this.state.numGuessLeft === 0;
    const playAgainButton = (
      <button onClick={this.resetGame}>Play Again?</button>
    );
     

    
    



    return (
      <div className="App">
        <header className="App-header">
          <div className="row">
            <div className="col-md-4 hangmanCon">
              <h1 className="flex-item">Picture of hangman</h1>
              <div className="flex-item picCon">
                <div>
                  <p className="pole"></p>
                  <p className="horizonBar"></p>
                  <p className="shortBar"></p>
                  <div className="bodyParts">
                    {this.state.shownBodyPartsArr.map((bodypart)=>{
                      return <p className={bodypart} value={bodypart}></p>
                    })}
                  </div>
                  
                </div>
                 
              </div>
            </div>
            <div className="col-md-8 gameCon">
              <Alert key="primary" variant="primary"><h1>Guess The Word 🚀</h1></Alert>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          <Alert variant="info">{this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}</Alert>
          <p>Num guesses left: <Alert variant="danger">{this.state.numGuessLeft}</Alert></p>
          <h3>Input</h3>
          <p>Please submit 1 letter at a time.</p>
          {/* Insert form element here */}
          <form onSubmit={this.handleSubmit}>
            <label>
              Letter:
            </label>
             
              <input 
              type="text" 
              name="letter"
              value={this.state.letter} 
              onChange={this.handleChange}
              placeholder="Type in single letter here"
              disabled={shouldDisableInput}
              >
            </input>
            <br />
            <Button variant="primary" type='submit'>Submit Letter</Button>
          </form>
           {/* Show congratz message if user guesses word correctly*/}
            {hasUserGuessedWord && (
              <div>
                <p>Correct! You've guessed the word!</p>
                {playAgainButton}
              </div>
            )}
            {/*Show msg if user runs out of guesses */}
            {this.state.numGuessLeft === 0 && !hasUserGuessedWord && (
              <div>
                <p>Sorry, you ran out of guesses.</p>
                {playAgainButton}
              </div>
            ) } 
            </div>
          </div>
           

        </header>
      </div>
    );
  }
}
 
export default App;
