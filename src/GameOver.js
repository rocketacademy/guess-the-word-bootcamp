import React from 'react';
import Button from '@mui/material/Button';

export const GameOver = ({ currWord, resetGame, setRounds, rounds }) => {
	const handleClick = () => {
		resetGame();
		setRounds(rounds + 1);
	};

	return (
		<>
			<div className='game-over'>
				<div className='inner-content'>
					<h1>Game Over</h1>
					<p> better luck next time</p>
					<p>
						{' '}
						The correct word was: <span>{currWord}</span>
					</p>
					<Button variant='contained' color='error' onClick={handleClick}>
						Reset
					</Button>
				</div>
			</div>
		</>
	);
};
