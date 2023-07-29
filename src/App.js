//This line imports the necessary modules from the "react" library. Specifically, it imports the React object and the useState function.
//`React` is required for creating React components, and useState is a hook that allows us to add state to functional components.
import React, { useState } from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import { TextField, Button } from "@mui/material";

const App = () => {
  const [currWord, setCurrWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [submittedLetter, setSubmittedLetter] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [roundsWon, setRoundsWon] = useState(0);

  const generateWordDisplay = () => {
    //Following line creates an empty array named wordDisplay that will store the letters of the word to display.
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    //`for (.of.) {` loop that iterates over each letter in the currWord variable, which is the current word to be guessed.
    //if (..) {: This checks if the current letter is already guessed by checking if it is included in the guessedLetters state. If it is guessed, we will display the letter in the word display.
    //wordDisplay.push(letter);: If either of the conditions is true (the letter has been guessed or the user has run out of guesses), it means we can reveal the letter. So, the letter is added to the wordDisplay array.
    //else { wordDisplay.push("_"); }: If the letter is not guessed, we add an underscore "_" to the wordDisplay array to represent that the letter is still unknown.
    for (let letter of currWord) {
      if (
        guessedLetters.includes(letter) ||
        //This part checks if the guessesLeft in the component's state is equal to 0. It checks if the user has run out of guesses.
        guessesLeft === 0
      ) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    //return wordDisplay.toString();: Finally, we convert the wordDisplay array to a string using the toString() method and return it.
    //The result will be a string with letters and underscores, representing the current state of the word being guessed.
    //For example, if the word is "HELLO" and the guessed letters are "L" and "O", the function may return "_ _ L L O" (assuming the spaces between each underscore and letter are separated by a space).
    return wordDisplay.toString();
  };

  //setSubmittedLetter(e.target.value);: When the user types something in the input field, this line updates the state variable submittedLetter with the value of the input field. e.target.value represents the value entered by the user.
  const handleChange = (e) => {
    setSubmittedLetter(e.target.value);
  };

  //This line prevents the default behavior of a form submission, which is to refresh the page.
  const handleSubmit = (e) => {
    e.preventDefault();
    // the line of code takes the first letter that the user has submitted as input, converts it to lowercase, and stores it in the variable inputLetter.
    //[0]: This is an array access operation. It retrieves the first character (letter) from the submittedLetter string.
    const inputLetter = submittedLetter[0].toLowerCase();
    // This line updates the guessedLetters state. It uses the functional form of setGuessedLetters, which takes a function as an argument.
    //The function receives the current value of guessedLetters as guessedLetters, and it returns a new array containing all the elements from the existing guessedLetters array (spread operator ...guessedLetters) and the new inputLetter. This ensures that the new guessed letter is added to the existing guessed letters in the state.
    setGuessedLetters((guessedLetters) => [...guessedLetters, inputLetter]);
    //This line sets the submittedLetter state to an empty string, clearing the input field after submission.
    setSubmittedLetter("");
    // This line updates the guessesLeft state by decrementing its value by 1. It uses the functional form of setGuessesLeft similar to the previous line.
    setGuessesLeft((guessesLeft) => guessesLeft - 1);
  };

  const checkHasUserGuessedWord = () => {
    //This line creates a copy of the guessedLetters array using the spread operator .... It ensures that we are not directly modifying the original guessedLetters array, so we can safely work with the copy.
    const guessedLettersCopy = [...guessedLetters];
    //This line starts a for...of loop that iterates through each letter of the currWord (current secret word) array. The loop will run once for each letter in the currWord.
    for (let letter of currWord) {
      //This line checks if the letter from the currWord is not included in the guessedLettersCopy array. The ! before guessedLettersCopy.includes(letter) negates the condition. In other words, it checks if the letter has not been guessed yet.
      //return false;: If the condition in the previous line is true (meaning the letter has not been guessed), the function immediately returns false, indicating that the user has not guessed the entire word yet.
      if (!guessedLettersCopy.includes(letter)) {
        return false;
      }
    }
    //If the loop completes without encountering a return false;, it means all the letters in the currWord have been guessed (i.e., they are all included in guessedLettersCopy).
    //In this case, the function returns true, indicating that the user has successfully guessed the entire word.
    return true;
  };

  const resetGame = () => {
    //This line is responsible for setting the state variable currWord to a new randomly generated word
    setCurrWord(getRandomWord());
    setGuessedLetters([]);
    setGuessesLeft(10);
    setSubmittedLetter("");
    setRoundsPlayed(roundsPlayed + 1);
    // The checkHasUserGuessedWord function is called.
    //Inside the function, it checks whether the user has guessed all the letters of the word correctly.
    //If the user has guessed all the letters correctly, the function returns true.
    if (checkHasUserGuessedWord()) {
      setRoundsWon(roundsWon + 1);
    }
  };

  const hasUserGuessedWord = checkHasUserGuessedWord();
  const playAgainButton = <button onClick={resetGame}>Play Again</button>;
  //This boolean variable will be true if either hasUserGuessedWord is true (the user has guessed the word) or if guessesLeft === 0 is true (the user has run out of guesses). Otherwise, it will be false.
  const shouldDisableInput = hasUserGuessedWord || guessesLeft === 0;

  return (
    <div className="app">
      <header className="app-header">
        <h2>Guess The Word 🚀</h2>
        <h4>Word Display</h4>
        {generateWordDisplay()}
        <h4>Guessed Letters</h4>
        {/* In summary, this code checks if there are any guessed letters in the
          guessedLetters array. If there are, it converts the array into a
          comma-separated string and displays it. If there are no guessed
          letters yet, it displays a hyphen ("-") as a placeholder. */}
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <p>Num guesses left: {guessesLeft}</p>
        {/* Congrats message if user guesses word */}
        {hasUserGuessedWord && (
          <div>
            <p>Congrats on guessing the word!🎉</p>
            {playAgainButton}
          </div>
        )}
        {/*If the user runs out of guesses, reveal the word and tell them they have lost.*/}
        {guessesLeft === 0 && !hasUserGuessedWord && (
          <div>
            <p>Sorry, you ran out of guesses.</p>
            {playAgainButton}
          </div>
        )}
        <p>
          Rounds played: {roundsPlayed}, Rounds won: {roundsWon}
        </p>
        <h3>Input</h3>
        <p>Please submit 1 letter at a time.</p>
        {/* value={submittedLetter}: This sets the value of the input
          field to the value of the submittedLetter field in the component's
          state. This allows us to control the input field and keep it in sync
          with the state. */}
        {/* <input type="submit" value="Submit">: type="submit": This specifies that this input is a submit button, which is used to submit the form.
           value="Submit": This sets the text displayed on the submit button to "Submit".*/}
        <form onSubmit={handleSubmit} id="inputContainer">
          <TextField
            id="customTextField"
            variant="outlined"
            type="text"
            value={submittedLetter}
            onChange={handleChange}
            disabled={shouldDisableInput}
          />
          <Button
            id="customButton"
            variant="contained"
            type="submit"
            color="primary"
            disabled={shouldDisableInput}
          >
            Submit
          </Button>
        </form>
      </header>
    </div>
  );
};

export default App;
