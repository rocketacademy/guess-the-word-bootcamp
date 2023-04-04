import React from "react";
import LetterDisplay from "./LetterDisplay";
export default class GuessedLetters extends React.Component {
  render() {
    const listItems =
      this.props.guessedLetters.length > 0 ? (
        this.props.guessedLetters.map((letter, i) => (
          <div key={i}>
            <LetterDisplay size="small">{letter}</LetterDisplay>
          </div>
        ))
      ) : (
        <LetterDisplay size="small">-</LetterDisplay>
      );
    return (
      <div>
        <h3>Guessed Letters</h3>
        <div className="guessed-letters">{listItems}</div>
      </div>
    );
  }
}
