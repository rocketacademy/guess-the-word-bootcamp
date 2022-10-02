import Input from "./input"
import React from "react"

class Start extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rounds: 0,
      guess: 0,
    }
  }

  getGameData = (data) => {
    this.setState(
      {
        rounds: data.numOfrounds,
        guess: data.numOfguess,
      },
      console.log(this.state.rounds, this.state.guess)
    );
  }

  setGame = () => {
    const getData = {
      gameMode: "Game",
      rounds: this.state.rounds,
      guess: this.state.guess,
    }
    console.log(this.state.rounds, this.state.guess)
    this.props.setUp(getData)
  }

  render(){
    return (
      <div>
        <Input onChange={this.getGameData}/>
        <button onClick={this.setGame}>Start</button>
      </div>
    );

  }
}

export default Start