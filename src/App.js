import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numGuessesLeft:9,
      // Insert form input state here
      input:"",
    
      reset:false
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

  resetGame =()=> {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessesLeft:9,
      input:"",
    
      reset:false

    })
  }
  // Insert form callback functions handleChange and handleSubmit here
handleChange=(e)=>{
  console.log("handlechange func",e.target.value)
// let {name}= e.target;
// this.setState({
//   [name]:e.target.value
// });
this.setState({
  // [e.target.name]:e.target.value
  [e.target.name]:(e.target.value)})}

  handleSubmit=(e)=>{
  //take the input in, add it to guessedLetter state
//use spread operator when adding it
  console.log("handlesubmit func", this.state.guessedLetters)
e.preventDefault();

if(this.state.guessedLetters.includes(this.state.input)){
  alert("it already exist, try again")
  this.setState({
  input:""})
}
else this.setState({
  //guessedLetter:[...this.state.guessedLetters, this.state.input]
  guessedLetters:this.state.guessedLetters.concat(this.state.input),
  numGuessesLeft:this.state.numGuessesLeft-1,
  input:""
})
}

 componentDidUpdate(_,prevState){

  if(this.state.numGuessesLeft===0){
    alert("u ran out of guesses, press Reset to try again")
  }

  if(this.state.guessedLetters!==prevState.guessedLetters){

const myCurrWordSet= new Set([...this.state.currWord]);
    //for every letter, delete word from set
     for (let j = 0; j < this.state.guessedLetters.length; j++) {
      
      if (myCurrWordSet.has(this.state.guessedLetters[j])) {
        myCurrWordSet.delete(this.state.guessedLetters[j]);
      }}

       if(myCurrWordSet.size===0 || myCurrWordSet==null){
      this.setState({
        reset:true
      })
    }
  }
  
 }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
            {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}

          {/* Insert form element here */}
           <form>
        <label>
          Input a word:
         </label>
        <input type="text" value={this.state.input} onChange={this.handleChange} name="input" disabled={this.state.reset==true || this.state.numGuessesLeft==0}></input>
        <input type="submit" value="Submit" onClick={this.handleSubmit} disabled={this.state.reset==true || this.state.numGuessesLeft==0}/>
       <h4>Num of guesses left: {this.state.numGuessesLeft}</h4>
      
       {this.state.reset && (
            <div>
              <p>You have guessed correctly!!! Congratulations!</p>
            </div>
          )}

          {this.state.numGuessesLeft === 0 && !this.state.reset && (
            <div>
              <p>
                Sorry, you have maxed out your guesses. The word was "
                {this.state.currWord}". <br /> 
              </p>
            </div>
          )}
<button onClick={this.state.reset===true ? this.resetGame : null}> {this.state.reset===true || this.state.numGuessesLeft===0 ? `Reset` : null}</button>
     
      </form>
        </header>
      </div>
    );
  }
}

export default App;
