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

    this.updateGuessAndWins = this.updateGuessAndWins.bind(this);
    this.nextGame = this.nextGame.bind(this)
    this.restart = this.restart.bind(this)
  }
  
  //Update user's guess
  //there will be a lot of temp variable with similar name as state which is used to update the state
  async updateGuessAndWins(userGuess){
    //if user was trying to guess the word
    if (userGuess.length === this.state.currWord.length) {
      if (userGuess === this.state.currWord) {
        let gamesWon = this.state.wins;
        await this.setState({
          wins: gamesWon + 1,
          isRoundDone: true,
        });
      } else {
        let guessLeft = this.state.numOfGuess;
        await this.setState({
          numGuess: guessLeft + 1,
        });
      }
    }
    //User guessing a letter (reject if user's guess length is more than 1)
    else if (userGuess.length === 1) {
      let updateGuess = this.state.guessedLetters;
      //check if user has guessed the letter
      if (updateGuess.indexOf(userGuess, 0) >= 0) {
        alert("You have already guessed that letter!");
      }
      updateGuess.push(userGuess);
      //if guessed letter is in word, update the display letter
      if (this.state.currWord.includes(userGuess)) {
        let updateDisplay = this.state.displayLetters;
        updateDisplay.push(userGuess);
        await this.setState({
          displayLetters: updateDisplay,
          gussedletters: updateGuess,
        });
      } else {
        let numGuess = this.state.numOfGuess;
        await this.setState({
          guessedLetters: updateGuess,
          numOfGuess: numGuess + 1,
          //isRoundDone: numGuess + 1 === this.state.numOfAllowedGuess ? true : false 
        });
      }
    }
    //rejects
    //catch numbers
    else if(isNaN(userGuess) !== true){
      alert("Please eneter a SINGLE letter or the word you want to guess.");
    }
    else{
      alert("Please eneter a SINGLE letter or the word you want to guess.");
      console.log(this.state)
    }

    //Update win condition (letters)
    const letterToWin = new Set(...this.state.currWord)
    if(this.state.numOfGuess === this.state.numOfAllowedGuess || letterToWin.size === this.state.displayLetters.length){
      let win = this.state.wins
      //loss
      if(this.state.numOfGuess === this.state.numOfAllowedGuess){
        this.setState({
          isRoundDone: true,
        });
      }
      //win
      else if (letterToWin.size === this.state.displayLetters.length){
        this.setState({
          isRoundDone: true,
          wins: win + 1,
        });
      }
      else{
        console.log("I don't know how you managed to get to here.")
      }
    }
    console.log(this.state.isRoundDone)
  };

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
        <Input getGuess={this.updateGuessAndWins} />
        {this.state.isRoundDone && button}
        <Hangman numGuess={this.state.numOfAllowedGuess} guessLeft={this.state.numOfGuess}/>
      </div>
    );
  }
}

export default Game