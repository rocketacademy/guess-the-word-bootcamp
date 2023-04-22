import React from "react";
export default class Scoreboard extends React.Component {
  render() {
    return (
      <div className="scoreboard">
        {this.props.scoreData.map((item, index) => (
          <div className="scoreboard-inner" key={index}>
            {" "}
            <h3>{`R${index + 1}: ${item.round}`}</h3>
            <p>{`${item.guess}`}</p>
          </div>
        ))}
      </div>
    );
  }
}
