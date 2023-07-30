import React, { useState, useEffect } from 'react';
import { getRandomWord } from './utils';
import correctAnswer from './sounds/correctAnswer.mp3';
import wrongAnswer from './sounds/wrongAnswer.mp3';
import winGame from './sounds/winGame.mp3';
import loseGame from './sounds/loseGame.mp3';
import './App.css';
import { Form } from './Form';
import { GameOver } from './GameOver';
import { ConfettiComp } from './Confetti';
import { GameWin } from './GameWin';
import {
	playAudio,
	generateWordDisplay,
	manageGuesses,
	handleLoss,
	handleWin,
} from './GameFunctions';

const App = () => {
	const [displayedWord, setDisplayedWord] = useState([]);
	const [currWord, setCurrWord] = useState(getRandomWord());
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [guessesRemaining, setGuessesRemaining] = useState(currWord.length + 3);
	const [hasGuessed, setHasGuessed] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [hasWon, setHasWon] = useState(false);
	const [isGameWinActive, setIsGameWinActive] = useState(false);
	const [rounds, setRounds] = useState(0);
	const [roundsWon, setRoundsWon] = useState(0);

	const handleGuess = (userGuess) => {
		setGuessedLetters([...guessedLetters, userGuess]); // add the guessed letter to the list of guessed letters
		let correctGuess = false;
		const newDisplayedWord = [...displayedWord]; // make a copy of the displayed word array
		for (let i = 0; i < currWord.length; i++) {
			if (currWord[i] === userGuess) {
				newDisplayedWord[i] = userGuess; // replace the blank with the guessed letter
				correctGuess = true;
			}
		}

		if (correctGuess) {
			playAudio(correctAnswer);
		} else {
			playAudio(wrongAnswer);
			manageGuesses(setHasGuessed, setGuessesRemaining);
		}
		setDisplayedWord(newDisplayedWord);
	};

	const resetGame = () => {
		setGuessesRemaining(currWord.length + 3);
		setIsGameOver(false);
		setGuessedLetters([]);
		setCurrWord(getRandomWord());
		generateWordDisplay(currWord, setDisplayedWord);
	};

	useEffect(() => {
		generateWordDisplay(currWord, setDisplayedWord);
		console.log([...currWord]);
	}, [currWord]);

	useEffect(() => {
		handleLoss(guessesRemaining, setIsGameOver, playAudio, loseGame);
	}, [guessesRemaining, isGameOver]);

	useEffect(() => {
		handleWin(displayedWord, playAudio, winGame, setHasWon, setIsGameWinActive);
	}, [displayedWord, hasGuessed]);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Guess The Word 🚀</h1>
				<h3>
					Rounds Won: {roundsWon}/{rounds}
				</h3>
				<h3>Word Display</h3>
				<div class='word-container'>
					{displayedWord.map((letter, index) => (
						<div key={`${letter}${index}`} class='letter-container'>
							<div class='letter-box'>{letter}</div>
						</div>
					))}
				</div>
				<h3>Guessed Letters</h3>
				{guessedLetters.length > 0 ? guessedLetters.join(' ') : '-'}

				<div>{guessesRemaining}</div>

				<Form
					guesses={guessedLetters}
					setguesses={setGuessedLetters}
					manageGuesses={manageGuesses}
					handleGuess={handleGuess}
					guessedLetters={guessedLetters}
				/>
			</header>
			{isGameOver && (
				<GameOver
					currWord={currWord}
					resetGame={resetGame}
					setRounds={setRounds}
					rounds={rounds}
				/>
			)}
			{hasWon && <ConfettiComp />}
			{isGameWinActive && (
				<GameWin
					guessesRemaining={guessesRemaining}
					resetGame={resetGame}
					rounds={rounds}
					setRounds={setRounds}
					setHasWon={setHasWon}
					setIsGameWinActive={setIsGameWinActive}
					currWord={currWord}
					roundsWon={roundsWon}
					setRoundsWon={setRoundsWon}
				/>
			)}
		</div>
	);
};

export default App;
