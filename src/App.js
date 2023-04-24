import React from 'react';
import { getRandomWord } from './utils.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessesLeft: 10,
      input: '',
      reset: false,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push('_ ');
      }
    }
    return wordDisplay.toString();
  };

  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numGuessesLeft: 10,
      input: '',
      reset: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.guessedLetters.includes(this.state.input)) {
      alert('You guessed the letter before. Please try another letter');
      this.setState({
        input: '',
      });
    } else
      this.setState({
        guessedLetters: this.state.guessedLetters.concat(this.state.input),
        numGuessesLeft: this.state.numGuessesLeft - 1,
        input: '',
      });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.numGuessesLeft === 0) {
      alert('You ran out of guesses! Please reset the game.');
    }

    if (this.state.guessedLetters !== prevState.guessedLetters) {
      const myCurrWordSet = new Set([...this.state.currWord]);
      //for every letter, delete word from set
      for (let i = 0; i < this.state.guessedLetters.length; i++) {
        if (myCurrWordSet.has(this.state.guessedLetters[i])) {
          myCurrWordSet.delete(this.state.guessedLetters[i]);
        }
      }

      if (myCurrWordSet.size === 0 || myCurrWordSet == null) {
        this.setState({
          reset: true,
        });
      }
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : '-'}

          {/* Insert form element here */}
          <form>
            <input
              type='text'
              value={this.state.input}
              onChange={this.handleChange}
              name='input'
              disabled={
                this.state.reset === true || this.state.numGuessesLeft === 0
              }
            ></input>
            <input
              type='submit'
              value='Submit'
              onClick={this.handleSubmit}
              disabled={
                this.state.reset === true || this.state.numGuessesLeft === 0
              }
            />
            <h4>You have {this.state.numGuessesLeft} guesses remaining.</h4>

            {this.state.reset && (
              <div>
                <p>Congratulations! You guessed the word.</p>
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
            <button onClick={this.state.reset === true ? this.resetGame : null}>
              {' '}
              {this.state.reset === true || this.state.numGuessesLeft === 0
                ? `Reset`
                : null}
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
