import React from "react";

export default class Restart extends React.Component {
  render() {
    return (
      <div>
        <button
          disabled={this.props.gameStatus ? false : true}
          onClick={this.props.action}
        >
          Restart game
        </button>
      </div>
    );
  }
}
