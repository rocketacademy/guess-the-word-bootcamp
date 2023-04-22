import React from "react";
export default class GenerateHearts extends React.Component {
  render() {
    const hearts = "❤️ ".repeat(this.props.numGuessLeft);
    return <div className="hearts">{hearts}</div>;
  }
}
