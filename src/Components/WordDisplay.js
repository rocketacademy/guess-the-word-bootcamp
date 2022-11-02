import React from "react";

export class WordDisplay extends React.Component {
  render() {
    return (
      <div className="word">
        {/* Split the words into their characters. Map through the selected words and checking to see each letter is inside the correctLetters Array. Do conditional rendering - if it includes, display the letter, if not return blank*/}

        {this.props.currWord.split("").map((letter, i) => (
          <span className="letter" key={i}>
            {this.props.correctLetters.includes(letter) ? letter : ""}
          </span>
        ))}

      </div>
    );
  }
}

export default WordDisplay;
