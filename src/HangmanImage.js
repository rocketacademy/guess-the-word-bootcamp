import React from "react";
import { IMAGE_MAP } from "./constants";
export class HangmanImage extends React.Component {
  mappingNumberImage() {
    let image;
    let numGuessesLeft = this.props.numGuessesLeft;
    console.log(numGuessesLeft);
    if (numGuessesLeft <= 10 && numGuessesLeft >= 9) {
      image = IMAGE_MAP[0];
    } else if (numGuessesLeft <= 8 && numGuessesLeft >= 7) {
      image = IMAGE_MAP[1];
    } else if (numGuessesLeft <= 6 && numGuessesLeft >= 5) {
      image = IMAGE_MAP[2];
    } else if (numGuessesLeft <= 4 && numGuessesLeft >= 3) {
      image = IMAGE_MAP[3];
    } else if (numGuessesLeft === 2) {
      image = IMAGE_MAP[4];
    } else if (numGuessesLeft === 1) {
      image = IMAGE_MAP[5];
    } else {
      image = IMAGE_MAP[6];
    }
    console.log(image);
    return image;
  }

  render() {
    let image = this.mappingNumberImage();
    return (
      <div>
        <img
          className="hangman"
          src={image}
          alt={`${this.props.numGuessesLeft}`}
        />
      </div>
    );
  }
}
