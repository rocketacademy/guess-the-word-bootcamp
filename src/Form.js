import React, { useState } from 'react';
import Button from '@mui/material/Button';

export const Form = ({ guesses, handleGuess, guessedLetters }) => {
	const [input, setInput] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isBlank, setIsBlank] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);
	const handleChange = (e) => {
		console.log(guessedLetters);
		const userInput = e.target.value;
		const letterRegex = /^[a-zA-Z]+$/;

		if (userInput === '' || letterRegex.test(userInput)) {
			setInput(userInput);
			setIsValid(false);
			setIsBlank(false);
		} else {
			setIsValid(true);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (input.trim() === '') {
			setIsBlank(true);
			return;
		}

		if (guessedLetters.includes(input)) {
			setIsRepeat(true);
			setInput('');
			return;
		}
		setIsRepeat(false);
		handleGuess(input);
		setInput('');
	};

	return (
		<>
			<form onSubmit={handleSubmit} guesses={guesses}>
				<label>Guess</label>
				<input
					value={input}
					type='text'
					name='guess'
					onChange={handleChange}
					maxLength={1}
				></input>
				<Button variant='contained'> submit </Button>
			</form>
			{isValid && (
				<div className='warning'>
					{' '}
					Numbers and special chars are invalid guess
				</div>
			)}
			{isBlank && <p className='warning'>Submissions cannot be blank</p>}
			{isRepeat && (
				<p className='warning'>
					Ooops! Looks like you already guessed that letter
				</p>
			)}
		</>
	);
};
