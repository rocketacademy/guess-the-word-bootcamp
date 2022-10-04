import React from "react";

class Score extends React.Component {
  render() {
    return (
      <div>
        <h3>Round {this.props.currentRound}</h3>
        <h4> Score: {this.props.score} / {this.props.currentRound}</h4>
      </div>
    );
  }
}

export default Score;