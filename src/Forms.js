import React, { Component } from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: "",
      numberOfGuesses: 10,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    alert("Submitted letter:" + " " + this.state.letter);

    this.setState({
      numberOfGuesses: this.state.numberOfGuesses - 1,
      letter: "",
    });
    if (this.state.numberOfGuesses === 1) {
      alert("you have no more guesses left!");
    }
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h5>number of guesses left: {this.state.numberOfGuesses}</h5>
          <label>Guess the next letter:</label>
          <input
            type="text"
            name="letter"
            value={this.state.letter}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
