import React from "react";

export class Popup extends React.Component {

  checkWin(correct, wrong, word) {
    let status = "win";
    // check for win
    word
      .toString()
      .split("")
      .forEach((letter) => {
        if (!correct.includes(letter)) {
          status = "";
        }
      });
    // check for lose
    if (wrong.length === 6) status = "lose";
    return status;
  }

  render() {
    let winLoseMessage = "";
    let revealWord = "";
    let playable = this.props.startGame

    if (
      this.checkWin(
        this.props.correctLetters,
        this.props.wrongLetters,
        this.props.currWord
      ) === "win"
    ) {
      winLoseMessage = "Congrats! You won!";
      playable = false;
    } else if (
      this.checkWin(
        this.props.correctLetters,
        this.props.wrongLetters,
        this.props.currWord
      ) === "lose"
    ) {
      winLoseMessage = "Unfortunately, you lost!";
      revealWord = `... the word was ${this.props.currWord}`;
      playable = false;
    }


    return (
      <div
        className="popup-container"
        style={winLoseMessage !== "" ? {display: "flex" } : {}}
      >
        <div className="popup">
          <h2>{winLoseMessage}</h2>
          <h3>{revealWord}</h3>
          <button onClick={this.props.resetGame}>Play Again </button>
        </div>
      </div>
    );
  }
}

export default Popup;
