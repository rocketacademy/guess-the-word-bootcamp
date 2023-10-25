import React from "react";
import InputGuess from "./InputGuess.js";
import { Button } from "@mui/material";

export default class PlayArea extends React.Component {
  detPlayArea = () => {
    let { numGuess } = this.props;
    if (this.props.result === "win") {
      return (
        <div>
          <h3>Congratulations, You win with {10 - numGuess} guess.</h3>
          <Button
            onClick={this.props.reset}
            variant="contained"
            color="secondary"
          >
            Replay
          </Button>
        </div>
      );
    }
    if (this.props.result === "lose") {
      return (
        <div>
          <h3>Oh, You have no guess chance left. You lose.</h3>
          <Button
            onClick={this.props.reset}
            variant="contained"
            color="secondary"
          >
            Replay
          </Button>
        </div>
      );
    }

    return (
      <div>
        <h3>Guess letter left: {numGuess}</h3>
        <h3>Please guess one alphabet letter</h3>
        <InputGuess updateGuess={this.props.updateGuess} />
      </div>
    );
  };

  render() {
    return this.detPlayArea();
  }
}
