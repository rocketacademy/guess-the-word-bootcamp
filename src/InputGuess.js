import React from "react";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userWord: "",
    };
  }

  handleChange = (e) => {
    let { value } = e.target;
    if ((value.match(/^[a-z]+$/) && value.length === 1) || value === "") {
      this.setState({ userWord: value });
    }
  };

  handleSubmit = (e) => {
    let { userWord } = this.state;
    e.preventDefault();
    if (userWord === "") {
      return;
    } else {
      this.props.updateGuess(userWord);
      this.setState({
        userWord: "",
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={this.state.userWord}
          onChange={this.handleChange}
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
