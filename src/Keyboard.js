import React from "react";
import "./Keyboard.css";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedKeys: [],
    };
  }

  handleClick = (key) => {
    const { onClick } = this.props;
    onClick(key.target.value);
    this.setState((prevState) => ({
      clickedKeys: [...prevState.clickedKeys, key],
    }));
  };

  isKeyClicked = (key) => {
    return this.state.clickedKeys.includes(key);
  };

  render() {
    return (
      <div className="keyboard">
        <div className="row">
          <button
            className={this.isKeyClicked("Q") ? "grayed-out" : ""}
            value="q"
            onClick={this.handleClick}
          >
            Q
          </button>
          <button
            className={this.isKeyClicked("W") ? "grayed-out" : ""}
            value="w"
            onClick={this.handleClick}
          >
            W
          </button>
          <button
            className={this.isKeyClicked("E") ? "grayed-out" : ""}
            value="e"
            onClick={this.handleClick}
          >
            E
          </button>
          <button
            className={this.isKeyClicked("R") ? "grayed-out" : ""}
            value="r"
            onClick={this.handleClick}
          >
            R
          </button>
          <button
            className={this.isKeyClicked("T") ? "grayed-out" : ""}
            value="t"
            onClick={this.handleClick}
          >
            T
          </button>
          <button
            className={this.isKeyClicked("Y") ? "grayed-out" : ""}
            value="y"
            onClick={this.handleClick}
          >
            Y
          </button>
          <button
            className={this.isKeyClicked("U") ? "grayed-out" : ""}
            value="u"
            onClick={this.handleClick}
          >
            U
          </button>
          <button
            className={this.isKeyClicked("I") ? "grayed-out" : ""}
            value="i"
            onClick={this.handleClick}
          >
            I
          </button>
          <button
            className={this.isKeyClicked("O") ? "grayed-out" : ""}
            value="o"
            onClick={this.handleClick}
          >
            O
          </button>
          <button
            className={this.isKeyClicked("P") ? "grayed-out" : ""}
            value="p"
            onClick={this.handleClick}
          >
            P
          </button>
        </div>
        <div className="row">
          <button value="a" onClick={this.handleClick}>
            A
          </button>
          <button value="s" onClick={this.handleClick}>
            S
          </button>
          <button value="d" onClick={this.handleClick}>
            D
          </button>
          <button value="f" onClick={this.handleClick}>
            F
          </button>
          <button value="g" onClick={this.handleClick}>
            G
          </button>
          <button value="h" onClick={this.handleClick}>
            H
          </button>
          <button value="j" onClick={this.handleClick}>
            J
          </button>
          <button value="k" onClick={this.handleClick}>
            K
          </button>
          <button value="l" onClick={this.handleClick}>
            L
          </button>
        </div>
        <div className="row">
          <button value="z" onClick={this.handleClick}>
            Z
          </button>
          <button value="x" onClick={this.handleClick}>
            X
          </button>
          <button value="c" onClick={this.handleClick}>
            C
          </button>
          <button value="v" onClick={this.handleClick}>
            V
          </button>
          <button value="b" onClick={this.handleClick}>
            B
          </button>
          <button value="n" onClick={this.handleClick}>
            N
          </button>
          <button value="m" onClick={this.handleClick}>
            M
          </button>
        </div>
      </div>
    );
  }
}

export default Keyboard;
