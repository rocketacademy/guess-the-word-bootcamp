import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Message from "./components/Message";
import { hangsheep } from "./img/img.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      guessedLetters: [],
      remainingGuesses: 10,
      input: "",
      message: "Guess a character below to start!",
      playingState: true,
      cheatState: false,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  checkGameState = () => {
    const { currWord, guessedLetters, remainingGuesses } = this.state;

    const isWordGuessed = [...currWord].every((letter) =>
      guessedLetters.includes(letter)
    );

    if (isWordGuessed) {
      this.setState({
        message: "Good Job - You saved me!",
        playingState: !this.state.playingState,
      });
    } else if (remainingGuesses < 1) {
      this.setState({
        message: `Its too late! The word was ${currWord}`,
        playingState: !this.state.playingState,
      });
    }
  };

  resetGame = () => {
    this.setState({
      remainingGuesses: 0,
      guessedLetters: [],
      input: "",
    });
  };

  cheating = (input) => {
    this.setState({
      guessedLetters: [...this.state.guessedLetters, input],
      cheatState: !this.state.cheatState,
    });
  };

  handleSubmit = (event, letter) => {
    const input = letter;

    event.preventDefault(); // Prevent the default form submission behavior
    if (input === "🚀") {
      // If input is "🚀", trigger the cheating function
      this.cheating(input);
    } else {
      // Input guessed letter
      this.setState({ guessedLetters: [...this.state.guessedLetters, input] });
      console.log(this.state.cheatState);
      this.setState(
        {
          remainingGuesses: this.state.currWord.includes(input)
            ? this.state.remainingGuesses
            : this.state.remainingGuesses - 1,
        },
        this.checkGameState
      );
    }
  };

  render() {
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "🚀",
    ];
    const { guessedLetters, playingState, remainingGuesses, cheatState } =
      this.state;
    return (
      <div className=" bg-slate-200 h-auto text-center flex flex-col">
        {/* Header */}
        <header className=" fixed top-0 left-0 right-0 w-full text-center bg-accent p-2 shadow-md">
          <h1 className="text-m font-semibold text-white">Hang Sheep? 🐏</h1>
        </header>
        <body className="container mx-auto p-5 bg-white rounded-xl shadow-lg gap-5 mt-20">
          {/* Game Title */}
          <header className="justify-center items-center flex text-[10px] h-14 bg-accent-focus rounded-xl text-slate-50">
            <p className="text-white w-2/3">
              🚀How to Play:🚀<br></br>You have a limited number of guesses to
              figure out the secret word <br></br>Guess one letter at a time and
              figure out this puzzle before its too late!
            </p>
          </header>

          <main className="container mx-auto p-5 bg-slate-300 rounded-xl shadow-lg grid grid-cols-2 gap-5">
            {/* Left Section */}
            <section className="bg-slate-300">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={hangsheep[remainingGuesses]}
                  alt="Hangman"
                  className="w-40 h-40 p-0 m-0"
                />
                <h3 className="p=0 m-0">Word Display</h3>
                <p>{this.generateWordDisplay()}</p>
                <br></br>
              </div>
            </section>
            {/* Right Section */}
            <section>
              <form className="bg-slate-300">
                <div
                  className={`card text-white w-full bg-accent-focus shadow-xl ${
                    this.state.cheatState ? "" : "hidden"
                  }`}
                >
                  Answer: {this.state.currWord}
                </div>
                <figure className="grid grid-cols-2">
                  <h2 className="text-sm">Guessed Letters:</h2>
                  {this.state.guessedLetters.length > 0
                    ? this.state.guessedLetters.toString()
                    : "-"}
                  <h2 className="text-sm left-0 right-0">Remaining Guesses:</h2>
                  <p>{this.state.remainingGuesses}</p>
                </figure>
                {/* Game State Message */}
                <div className="grid items-center justify-center left-0 right-0">
                  <Message message={this.state.message} />
                </div>
                {/* Input */}
                <figure className="items-center justify-center grid grid-row">
                  <div className="buttons">
                    {playingState
                      ? letters.map((letter, index) => (
                          <button
                            key={index}
                            value={letter}
                            tabIndex={0}
                            onClick={(event) =>
                              this.handleSubmit(event, letter)
                            }
                            // onKeyDown={(event) => this.handleSubmit(event, letter)}
                            className="btn w-1 btn-outline btn-accent"
                            disabled={guessedLetters.includes(letter)}
                          >
                            {letter}
                          </button>
                        ))
                      : //Disable all buttons if playingState
                        letters.map((letter, index) => (
                          <button
                            key={index}
                            className="btn w-1 btn-outline btn-accent"
                            disabled={letter}
                          >
                            {letter}
                          </button>
                        ))}
                  </div>
                  <button className="bg-slate-400 rounded-md m-1">
                    Reset Game
                  </button>
                </figure>
              </form>
            </section>
          </main>
        </body>
        <footer className=" text-center bg-white p-2 shadow-md mt-10">
          <p className="text-[10px]">Made by Gabriel Lim 🐷</p>
        </footer>
      </div>
    );
  }
}

export default App;
