import React from "react";
import InputGuess from "./InputGuess.js";
import { Button } from "@mui/material";

export default class PlayArea extends React.Component {
  detPlayArea = () => {
    const { numGuess, result, reset, updateGuess } = this.props;
    if (result === "win") {
      return (
        <div>
          <h3>Congratulations, You win with {10 - numGuess} guess.</h3>
          <Button onClick={reset} variant="contained" color="secondary">
            Replay
          </Button>
        </div>
      );
    }
    if (result === "lose") {
      return (
        <div>
          <h3>Oh, You have no guess chance left. You lose.</h3>
          <Button onClick={reset} variant="contained" color="secondary">
            Replay
          </Button>
        </div>
      );
    }

    return (
      <div>
        <h4>Guess letter left: {numGuess}</h4>
        <h4>Please guess one alphabet letter</h4>
        <InputGuess updateGuess={updateGuess} />
      </div>
    );
  };
  render() {
    return this.detPlayArea();
  }
}
