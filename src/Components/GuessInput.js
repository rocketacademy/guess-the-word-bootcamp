import React from "react";

export default class GuessInput extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} autoComplete="off">
        <label>
          <h3>Enter guess here:</h3>
        </label>
        <input
          type="text"
          name="guessInput"
          value={this.props.guessInput}
          onChange={this.props.handleChange}
        />
        <button type="submit" name="submit">
          Submit
        </button>
      </form>
    );
  }
}
