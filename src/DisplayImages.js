import React from "react";

export default class DisplayImages extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {};
  }
  render() {
    const { cGuess, wGuess, length } = this.props;
    let correct = cGuess;
    let wrong = wGuess;
    let max = length;
    if (correct === 0) {
      max = 0;
    // } else if (correct === max) {
    //   correct = 0;
    //   max = 1;
     }
    if (wrong > 7) {
      wrong = 7;
    }

    const myImage = require(`./images/${correct}${wrong}${max}.png`);

    return <img src={myImage} width="350px" alt="scene here" />;
  }
}
