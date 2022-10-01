import GuessBtn from"./gameComponents/guessBtn"
import Input from "./gameComponents/guessInput"
import Hangman from "./gameComponents/hangman"
import Display from "./gameComponents/letterDisplay"
import Score from "./gameComponents/scoreRoundDisplay"
import React  from "react"
import {getRandomWord} from "../../utils"

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      numOfAllowedGuess: 0,
      numOfGuess: 0,
      userGuess: "",
      currRound: 1,
      rounds: 10,
    };
  }

  render(){
    return (
      <div>
        <Score />
        <Display />
        <Input />
        <GuessBtn />
        <Hangman />
      </div>
    );
  }
}

export default Game