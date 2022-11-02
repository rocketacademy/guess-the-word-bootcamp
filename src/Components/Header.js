import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <>
        <h2>🚀 Guess The Word!</h2>
        <p style={{fontStyle:"italic"}}> Find the word by typing a letter...</p>
      </>
    );
  }
}

export default Header;
