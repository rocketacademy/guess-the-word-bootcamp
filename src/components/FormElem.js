import { useState } from "react";

export default function FormElem({setGuessedLetters, guesses, setGuesses, correctLetters}) {

  const [newGuess, setNewGuess] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setGuessedLetters(newGuess);
    setGuesses(guesses-1);
    for (let char of newGuess) {correctLetters.push(char)}
    setNewGuess("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id='input-text'
        type='text'
        required
        value={newGuess}
        onChange={(e) => {setNewGuess(e.target.value)}}
      />
      <input id='submit-button' type='submit' value='New Guess'/>
    </form>
  )
  // return (
  //   <form>
  //     <input
  //       type='text'
  //       required
  //       value={guessedLetters}
  //       onChange={(e) => {setGuessedLetters(e.target.value)}}
  //     />
  //   </form>
  // )
}