import React, {useState} from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import GenerateWordDisplay from "./components/GenerateWordDisplay.js";
import FormElem from "./components/FormElem.js";

// class App extends React.Component {
//   constructor(props) {
//     // Always call super with props in constructor to initialise parent class
//     super(props);
//     this.state = {
//       // currWord is the current secret word for this round. Update this with this.setState after each round.
//       currWord: getRandomWord(),
//       // guessedLetters stores all letters a user has guessed so far
//       guessedLetters: [],
//       // Insert num guesses left state here
//       // Insert form input state here
//     };
//   }

//   generateWordDisplay = () => {
//     const wordDisplay = [];
//     // for...of is a string and array iterator that does not use index
//     for (let letter of this.state.currWord) {
//       if (this.state.guessedLetters.includes(letter)) {
//         wordDisplay.push(letter);
//       } else {
//         wordDisplay.push("_");
//       }
//     }
//     return wordDisplay.toString();
//   };

//   // Insert form callback functions handleChange and handleSubmit here

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1>Guess The Word 🚀</h1>
//           <h3>Word Display</h3>
//           {this.generateWordDisplay()}
//           <h3>Guessed Letters</h3>
//           {this.state.guessedLetters.length > 0
//             ? this.state.guessedLetters.toString()
//             : "-"}
//           <h3>Input</h3>
//           {/* Insert form element here */}
//           Todo: Insert form element here
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

let guessNum = 10;

function App() {
  // const [currWord, setCurrWord] = useState(getRandomWord());
  const [currWord, setCurrWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessNum);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);


  const newGame = () => {
    (guessedLetters === currWord && setScore(score+1));
    setRound(round+1);
    setCurrWord(getRandomWord());
    setGuessedLetters("");
    setCorrectLetters([]);
    setGuesses(guessNum);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        <h3>Letters Guessed</h3>
        <GenerateWordDisplay currWord={currWord} correctLetters={correctLetters}/>
        <br/>
        {(guesses === 0 || guessedLetters === currWord ? 
          <div className='game-end'>
            {(guessedLetters === currWord ? <h3 style={{color: 'lime',}}>You got it right!</h3> : <h3 style={{color: 'red',}}>Try again...</h3>)}
            <div>Word: {currWord}</div>
          </div> 
          : <FormElem setGuessedLetters={setGuessedLetters} guesses={guesses} setGuesses={setGuesses} correctLetters={correctLetters}/>
        )}

        <div>Previous Guess: {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}</div>
        <div>Guesses Remaining: {guesses}/{guessNum}</div>
        <div>Score: {score} guessed out of {round} rounds</div>
        <button onClick={newGame}>New Round</button>
        
      </header>
    </div>
  )
}

export default App;