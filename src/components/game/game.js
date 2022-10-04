import Input from "./gameComponents/guessInput"
import Hangman from "./gameComponents/hangman"
import Display from "./gameComponents/letterDisplay"
import Score from "./gameComponents/scoreRoundDisplay"
import GuessDisplay from "./gameComponents/guessDisplay"
import React  from "react"
import {getRandomWord} from "../../utils"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWord: "overcook",
      guessedLetters: [],
      displayLetters: [], 
      numOfAllowedGuess: this.props.guess,
      numOfGuess: 0,
      userGuess: "",
      currRound: 1,
      rounds: this.props.rounds,
      wins: 0,
      isRoundDone: false,
    };

    this.updateRoundData = this.updateRoundData.bind(this);
    this.nextGame = this.nextGame.bind(this)
    this.restart = this.restart.bind(this)
    this.isRoundComplete =this.isRoundComplete.bind(this)
  }
  
  //Update Current Round Data
  updateRoundData = (userGuess) => {
    //Update Guess
    let letters_guess = this.state.guessedLetters
    let letters_display = this.state.displayLetters
    let guessLeft = this.state.numOfGuess
    let word = this.state.currWord
    //If user is guessing the word
    if(userGuess.length === word.length){
      if(userGuess !== this.state.currWord){
        guessLeft += 1
      }
    }
    else if(userGuess.length === 1 && isNaN(userGuess) === true){
      letters_guess.push(userGuess)
      if(word.includes(userGuess)){
        letters_display.push(userGuess)
      }
      else{
        guessLeft += 1
      }
    }
    else{
      alert("Please eneter a SINGLE letter or the word you want to guess.");
    }
    //Update Round and win
    const [wins, roundDone] = this.isRoundComplete(userGuess, guessLeft, letters_display)
    this.setState({
      guessedLetters: letters_guess,
      displayLetters: letters_display,
      numOfGuess: guessLeft,
      isRoundDone: roundDone,
      wins: wins,
    })
  }

  isRoundComplete = (userguess, guessLeft, display) =>{
    const letterToWin = new Set(this.state.currWord)
    console.log(letterToWin)
    if(userguess === this.state.currWord){
      console.log("a trigger"); 
      return [this.state.wins + 1,  true]
    }
    if(guessLeft === this.state.numOfAllowedGuess){
      console.log("b trigger"); 
      return [this.state.wins,  true] 
    }
    if(display.length === letterToWin.size){
      console.log("c trigger"); 
      return [this.state.wins + 1, true]; 
    }
    console.log("d trigger"); 
    return [this.state.wins, false] 
  }
  
  nextGame = () => {
    const nextRound = this.state.rounds
    this.setState({
      currWord: "destiny",
      guessedLetters: [],
      displayLetters: [],
      numOfGuess: 0,
      userGuess: "",
      currRound: 1,
      rounds: nextRound + 1,
      isRoundDone: false,
    });
  }

  restart = () => {
    this.props.restart()
  }

  render() {
    let button = <p></p>
    if(this.state.currRound === this.state.rounds){
      button = <button onClick={this.restart}>Replay Game</button>
    }
    else{
      button = <button onClick={this.nextGame}>Next Game</button>
    }
    console.log(this.state.numOfGuess, this.state.numOfAllowedGuess)
    return (
      <div>
        <Score score={this.state.wins} currentRound={this.state.currRound} />
        <Display word={this.state.currWord} display={this.state.displayLetters} />
        <GuessDisplay letters={this.state.guessedLetters}/>
        <Input getGuess={this.updateRoundData} />
        {this.state.isRoundDone && button}
        <Hangman numGuess={this.state.numOfAllowedGuess} guessLeft={this.state.numOfGuess}/>
      </div>
    );
  }
}

export default Game