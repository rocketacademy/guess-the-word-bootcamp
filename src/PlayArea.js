import React from "react";
import InputGuess from "./InputGuess";
import App from "./App";
import Button from "@mui/material/Button";

export default class ResultDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  detDisplay = () => {
    const { result, numGuess } = this.props.info;
    if (result === "win") {
      return (
        <div>
          <h3>Congratulations, You win with {10 - numGuess} guess.</h3>
          <Button onClick={App.reset} variant="contained" color="secondary">
            Replay
          </Button>
        </div>
      );
    }
    if (result === "lose") {
      return (
        <div>
          <h3>Oh, You have no guess chance left. You lose.</h3>
          <Button onClick={App.reset} variant="contained" color="secondary">
            Replay
          </Button>
        </div>
      );
    }

    return (
      <div>
        <h3>Guess letter left: {numGuess}</h3>
        <h3>Please guess one alphabet letter</h3>
        <InputGuess />
      </div>
    );
  };

  render() {
    return this.detDisplay();
  }
}
