import React from "react";
import "./App.css";
import Wordle from "./Components/Wordle";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 id="game-title">Guess The Word!</h1>
        <Wordle />
      </div>
    );
  }
}

export default App;
