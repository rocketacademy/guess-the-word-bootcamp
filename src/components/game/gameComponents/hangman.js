import React from "react";

class Hangman extends React.Component {
  render() {
    const hangmanStage = Math.floor(
      (this.props.guessLeft / this.props.numGuess) * 12
    );
    return(
      <div style={{marginTop: 30}}>
        <img src={require(`../../../../src/hangman/hangman_${hangmanStage}.png`)} alt = "hangman"/>
      </div>
    );
  }
}

export default Hangman;