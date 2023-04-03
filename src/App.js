import React from "react";
import "./App.css";
import Hangman from "./Components/Hangman";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 id="game-title">Guess The Word!</h1>
        <Hangman />
      </div>
    );
  }
}

export default App;
