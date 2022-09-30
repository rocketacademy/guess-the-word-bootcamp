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
    this.setState({
      rounds: data.rounds,
      guess: data.guess
    })
  }

  setGame = () => {
    const getData = {
      gameMode: "Game",
      rounds: this.state.rounds,
      guess: this.state.guess,
    }

    this.props.setGameUp(getData)
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