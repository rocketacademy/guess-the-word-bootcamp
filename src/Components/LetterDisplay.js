import React from "react";

export default class LetterDisplay extends React.Component {
  render() {
    const { color = "grey", size = "large" } = this.props;
    return (
      <div className={`letter ${color} ${size}`}>
        {this.props.children.toUpperCase()}
      </div>
    );
  }
}
