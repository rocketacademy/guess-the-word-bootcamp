import React from "react"

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: "1",
      guess: "5",
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.handleRound = this.handleRound.bind(this);
  }

  handleGuess = (e) => {
    this.setState(
      {
        guess: e.target.value,
      },
      console.log(this.state.guess)
    );
  };

  handleRound = (e) => {
    this.setState(
      {
        rounds: e.target.value,
      },
      console.log(this.state.rounds)
    );
  };

  setGameMode = () => {
    const data = {
      gameMode: "Game",
      rounds: this.state.rounds,
      guess: this.state.guess,
    }
    this.props.setUp(data)
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.setGameMode();
            alert("You Submit");
          }}
        >
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
          <input type="submit" value="Start Hangman"/>
        </form>
      </div>
    );
  }
}

export default Start