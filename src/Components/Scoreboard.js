import React from "react";
export default class Scoreboard extends React.Component {
  render() {
    return (
      <div className="scoreboard">
        <div className="scoreboard-panel">
          <h3>Your score</h3>
          <p>{this.props.score}</p>
        </div>
        <div className="scoreboard-panel">
          <h3>Guesses left</h3>
          <p>{this.props.guessesLeft}</p>
        </div>
      </div>
    );
  }
}
