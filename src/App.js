import React, {useState,useEffect, useCallback} from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

function App(){
    const [state, setState] = useState({
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      //getRandomWord() to get a random word, use fixed word to test first...
      currWord: 'apple',
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numGuesses: 10,
      // Insert form input state here
      inputLetter:"", 
      // Validator Flag to disable submit button to check for input on change
      validFlag:true,
      // add a win flag to track win status
      winFlag: false,
    });


  const generateWinDisplay = () => {
    if (state.numGuesses===0) {
      return <h3>You Lost! ☹️</h3>
    }else if(state.winFlag===false){
      return <h3>You got this!💪  </h3>
    }else {
      return <h3>You Won!💀</h3>
    }
  }
  
  
  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    if(state.numGuesses>0){
      for (let letter of state.currWord) {
        if (state.guessedLetters.includes(letter)) {
          wordDisplay.push(letter);
        } else {
          wordDisplay.push(" _");
        }
      }
      return wordDisplay.join("");
    }else{
      return state.currWord
    }
  };

  useEffect(()=>{
      if (!generateWordDisplay().includes(" _")){
        setState({...state,
          winFlag:true})}
  },[state.numGuesses,state.guessedLetters])

  // Insert form callback functions handleChange and handleSubmit here

  const handleChange = (e)=>{
    const {name,value}=e.target
    // setState({...state,[name]:value});
    if(state.guessedLetters.includes(value)){
      setState({...state,
        [name]:value,
        validFlag:true});
    }else{
      setState({...state,
        [name]:value,
        validFlag:false});
    }
    console.log(name,value)
    console.log(state.validFlag)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setState({...state,
      guessedLetters: [...state.guessedLetters,(state.inputLetter)],
      inputLetter:"",
      numGuesses: state.currWord.includes(state.inputLetter)?state.numGuesses:state.numGuesses - 1,
    })
  }

  const handleReset = () =>{
    setState({...state,
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      //getRandomWord() to get a random word, use fixed word to test first...
      currWord: 'apple',
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numGuesses: 10,
      // Insert form input state here
      inputLetter:"", 
      // Validator Flag to disable submit button to check for input on change
      validFlag:true,
      winFlag:false,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word 🚀</h1>
        {generateWinDisplay()}
        {state.numGuesses>0?<h3>Tries Remaining:{state.numGuesses}</h3>:<h3>You ran out of tries! The word is:</h3>}
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {state.guessedLetters.length > 0
          ? state.guessedLetters.toString()
          : "-"}
        <h3>Guess your letter</h3>
        {state.numGuesses===0||state.winFlag===true?<button onClick={handleReset}>Reset</button>:<form onSubmit={handleSubmit}>
          <label>Type one letter below</label>
          <br/>
          <input 
            name="inputLetter"
            type="text"
            maxLength={1}
            minLength={1}
            size={1}
            value={state.inputLetter}
            onChange={handleChange}
          />
          <br/>
          <input
            type= 'submit'
            value = 'Press to guess!'
            disabled={state.validFlag}
          /> 
        </form>}
      </header>
    </div>
  );
}

export default App;
