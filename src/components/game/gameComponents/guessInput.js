import React from "react";

class Input extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      guess: ""
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput = (e) => {
    this.setState({
      guess: e.target.value
    })
  }

  submitGuess = () => {
    this.props.getGuess(this.state.guess);
    this.setState({
      guess: ""
    }
    )
  }

  render() {
    return(
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <input type="text" value={this.state.guess} onChange={this.handleInput}/>
        <input type="submit" value="guess" onClick={this.submitGuess}/>
      </form>
    );
  }
}

export default Input;