import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Scoreboard from "./Component/Scoreboard.js";
import GenerateHearts from "./Component/GenerateHearts.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // current user guess
      guess: "",
      // Insert num guesses left state here
      numGuessLeft: 10,
      totalWins: 0,
      totalRounds: 0,
      // isGameOver: false,
      isWordGuessed: false,

      // scoreboard for prev scores
      scoreData: [],
    };
    // bind handleChange and handleSubmit methods to component instance,to keep the reference
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    // console.log(this.state.currWord);
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    console.log(this.state.currWord);
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange
  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // handleSubmit to check validation of input
  handleSubmit = (e) => {
    e.preventDefault();
    const { guessedLetters, guess, numGuessLeft } = this.state;
    const regex = /^[a-zA-Z]+$/;
    // alert if length of guess is greater than 1 or not a letter
    // does not allow repeat of letters
    if (guess.length !== 1 || !regex.test(guess)) {
      alert("Uh oh! Input a letter instead");
    } else if (guessedLetters.includes(guess)) {
      alert(
        `uh oh! "${guess}" has been entered previously. Key in a different letter!`
      );
    } else {
      this.setState({
        guessedLetters: [...guessedLetters, guess.toLowerCase()],
        guess: "",
        numGuessLeft: numGuessLeft - 1,
      });
    }
  };

  handleRestart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guess: "",
      numGuessLeft: 10,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const isWordGuessed =
      this.generateWordDisplay().replace(/,/g, "") === this.state.currWord;
    if (prevState.numGuessLeft !== this.state.numGuessLeft) {
      console.log(`is word guessed: ${isWordGuessed}`);
      if (this.state.numGuessLeft === 0 && !isWordGuessed) {
        this.setState({
          scoreData: [
            ...prevState.scoreData,
            { round: this.state.currWord, guess: "LOSE" },
          ],
          totalRounds: this.state.totalRounds + 1,
        });
      } else if (isWordGuessed) {
        this.setState({
          scoreData: [
            ...prevState.scoreData,
            { round: this.state.currWord, guess: "WIN" },
          ],
          totalRounds: this.state.totalRounds + 1,
          totalWins: this.state.totalWins + 1,
        });
      }
    }
  }

  render() {
    const { numGuessLeft, totalRounds, totalWins, scoreData } = this.state;
    const isWordGuessed =
      this.generateWordDisplay().replace(/,/g, "") === this.state.currWord;
    // console.log(this.generateWordDisplay().replace(/,/g, ""));

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          {numGuessLeft === 0 && !isWordGuessed ? (
            <div>
              <h3>
                GameOver! <br />
                The word is {this.state.currWord}
                <br />
                <button onClick={this.handleRestart}>Restart</button>
              </h3>
            </div>
          ) : isWordGuessed ? (
            <div>
              <h3>
                You Win! <br />
                The word is {this.state.currWord} <br />
                <button onClick={this.handleRestart}>Restart</button>
              </h3>
            </div>
          ) : (
            <div>
              <h3>{this.generateWordDisplay()}</h3>

              <form onSubmit={this.handleSubmit}>
                <label>
                  <input
                    name="guess"
                    type="text"
                    value={this.state.guess}
                    onChange={this.handleChange}
                    onFocus={() => this.setState({ guess: "" })}
                    placeholder="key in your guess here"
                    maxLength={1}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
              <p>
                Guessed Letters
                <br />
                {this.state.guessedLetters.length > 0
                  ? this.state.guessedLetters.toString()
                  : "-"}
                <br />
                {/* {numGuessLeft} guesses left */}
                <GenerateHearts numGuessLeft={numGuessLeft} />
              </p>
            </div>
          )}
          <br />

          <div>
            {scoreData.length === 0 ? null : (
              <>
                <h3>
                  Scoreboard <br />
                  <p>
                    You win {totalWins} out of {totalRounds} rounds!
                    <br />
                    <Scoreboard scoreData={scoreData} />
                  </p>
                </h3>
              </>
            )}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
