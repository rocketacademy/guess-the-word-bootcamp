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
      message: "Guess a character below to start!",
      playingState: true,
      cheatState: false,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
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

  componentDidMount() {
    // Add keydown event listener
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    // Remove keydown event listener when the component unmounts
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    // Get the pressed key (letter) from the event
    const letter = event.key.toUpperCase();

    // Check if the key pressed is a valid letter or "🚀"
    if (/^[A-Z🚀]$/.test(letter)) {
      if (!this.state.guessedLetters.includes(letter)) {
        // Trigger the handleSubmit function for the corresponding letter
        this.handleSubmit(event, letter);
      }
    }
  };

  handleSubmit = (event, letter) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (letter === "🚀") {
      // If input is "🚀", trigger the cheating function
      this.cheating(letter);
    } else {
      // Input guessed letter
      this.setState({ guessedLetters: [...this.state.guessedLetters, letter] });
      console.log(this.state.cheatState);
      this.setState(
        {
          remainingGuesses: this.state.currWord.includes(letter)
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
      <div className=" bg-slate-200 h-auto text-center flex flex-col min-h-screen">
        {/* Header */}
        <header className=" fixed top-0 left-0 right-0 w-full text-center bg-accent p-2 shadow-md">
          <h1 className="text-lg font-semibold text-white">Hang Sheep? 🐏</h1>
        </header>
        <body className="container mx-auto p-5 h-auto bg-white rounded-xl shadow-lg gap-5 mt-20">
          {/* How to Play */}
          <header className="justify-center items-center flex text-s h-auto bg-accent-focus rounded-xl text-slate-50">
            <p className="text-white w-2/3">
              🚀How to Play:🚀<br></br>You have a limited number of guesses to
              figure out the secret word <br></br>Guess one letter at a time and
              figure out this puzzle before its too late!
            </p>
          </header>

          <main className="container mx-auto p-5 bg-slate-300 rounded-xl shadow-lg grid grid-cols-2 gap-5">
            {/* Left Section */}
            <section className="bg-slate-300">
              {/* Hangman Image */}
              <div className="flex flex-col justify-center items-center">
                <img
                  src={hangsheep[remainingGuesses]}
                  alt="Hangman"
                  className="w-auto h-full max-h-[240px] p-0 m-0 shadow-lg"
                />
                {/* Secret Word */}
                <h3 className="p=0 m-0">Secret Word:</h3>
                <p>{this.generateWordDisplay()}</p>
                <br></br>
              </div>
            </section>
            {/* Right Section */}
            <section>
              <form className="bg-slate-300">
                {/* Cheat popup card */}
                <div
                  className={`card text-white w-full bg-accent-focus shadow-xl ${
                    this.state.cheatState ? "" : "hidden"
                  }`}
                >
                  Answer: {this.state.currWord}
                </div>
                <figure className="grid grid-cols-2">
                  <h2 className="text-xs md:text-lg">Guessed Letters:</h2>
                  <p className="overflow-scroll">
                    {this.state.guessedLetters.length > 0
                      ? this.state.guessedLetters.toString()
                      : "-"}
                  </p>
                  <h2 className="text-xs md:text-lg left-0 right-0">
                    Remaining Guesses:
                  </h2>
                  <p>{this.state.remainingGuesses}</p>
                </figure>
                {/* Game State Message */}
                <div className="grid items-center justify-center left-0 right-0">
                  <Message message={this.state.message} />
                </div>
                {/* Input Keyboard */}
                <figure className=" flex items-center justify-center">
                  <div className="grid-cols-5 grid-rows-6 sm:grid-cols-9 sm:grid-rows-3 grid gap-0 items-center justify-center button">
                    {" "}
                    {/* grid lg:grid-cols-9 sm:grid-cols-7 */}
                    {playingState
                      ? letters.map((letter, index) => (
                          <button
                            key={index}
                            value={letter}
                            tabIndex={0}
                            onClick={(event) =>
                              this.handleSubmit(event, letter)
                            }
                            className="text-xl btn w-1 btn-outline btn-accent"
                            disabled={guessedLetters.includes(letter)}
                          >
                            {letter}
                          </button>
                        ))
                      : //Disable all buttons if playingState=false
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
                </figure>
                {/* Reset Button */}
                <button className="bg-slate-400 rounded-md m-1 w-1/2">
                  Reset Game
                </button>
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
