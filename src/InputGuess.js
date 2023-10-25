import React from "react";
import App from "./App";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

export default class InputGuess extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={App.handleSubmit}>
        <Input
          value={App.state.userWord}
          onChange={App.handleChange}
          maxlength={1}
          placeholder="One alphabet letter only"
          variant="standard"
          color="primary"
        />
        <Button type="submit" variant="contained" color="secondary">
          Guess!
        </Button>
      </form>
    );
  }
}
