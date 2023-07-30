import React from 'react';
import Button from '@mui/material/Button';

export const GameWin = ({
	guessesRemaining,
	resetGame,
	rounds,
	setRounds,
	setIsGameWinActive,
	setHasWon,
	currWord,
	roundsWon,
	setRoundsWon,
}) => {
	const winReset = () => {
		setRounds(rounds + 1);
		resetGame();
		setHasWon(false);
		setIsGameWinActive(false);
		setRoundsWon(roundsWon + 1);
	};
	return (
		<div>
			<div className='game-over'>
				<div className='inner-content'>
					<h1> Congratulations, You won</h1>
					<p>
						You managed guess the word with only:{' '}
						{currWord.length + 3 - guessesRemaining} wrong guesses
					</p>
					<Button variant='contained' color='success' onClick={winReset}>
						{' '}
						Next Round{' '}
					</Button>
				</div>
			</div>
		</div>
	);
};
