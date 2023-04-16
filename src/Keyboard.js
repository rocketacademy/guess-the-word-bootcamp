import React from "react";
import "./Keyboard.css";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
      ],
      clickedKeys: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    const { onClick } = this.props;
    onClick(key.target.value);
    this.setState((prevState) => ({
      clickedKeys: [...prevState.clickedKeys, key.target.value],
    }));
  }

  componentDidUpdate() {
    console.log(this.state.clickedKeys);
  }

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     console.log(JSON.stringify(this.state.clickedKeys));
  //   }, 1000);
  // }

  render() {
    const { buttons, clickedKeys } = this.state;
    const firstRow = buttons.slice(0, 10);
    const secondRow = buttons.slice(10, 19);
    const thirdRow = buttons.slice(19);

    return (
      <div className="keyboard">
        <div className="row">
          {firstRow.map((key) => (
            <button
              value={key}
              onClick={this.handleClick}
              disabled={clickedKeys.includes(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="row">
          {secondRow.map((key) => (
            <button
              value={key}
              onClick={this.handleClick}
              disabled={clickedKeys.includes(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="row">
          {thirdRow.map((key) => (
            <button
              value={key}
              onClick={this.handleClick}
              disabled={clickedKeys.includes(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Keyboard;
