import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: 1,
      guess: 5,
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.handleRound = this.handleRound.bind(this);
  }

  handleGuess = (e) => {
    this.setStat({
      rounds: e.target.value,
    });
  };

  handleRound = (e) => {
    this.setStat({
      rounds: e.target.value,
    });
  };

  sendGameData = () => {
    const data = {
      rounds: this.state.rounds,
      guess: this.state.guess
    }

    this.props.onChange(data)
  }

  render() {
    return (
      <forms>
        <label>
          Number of Rounds:
          <input
            type="number"
            min="1"
            max="10"
            value={this.state.rounds}
            onChange={this.handleRound}
          />
        </label>
        <label>
          Number of Guess:
          <input
            type="number"
            min="5"
            max="15"
            value={this.state.guess}
            onChange={this.handleGuess}
          />
        </label>
      </forms>
    );
  }
}

export default Input