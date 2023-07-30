export const playAudio = (audioFilePath) => {
	const audio = new Audio(audioFilePath);
	audio.play();
	audio.addEventListener('ended', () => {
		audio.pause();
		audio.currentTime = 0;
	});
};

export const generateWordDisplay = (currentWord, displayFunction) => {
	// create and display blank spaces for word
	const wordDisplay = [];
	for (let i = 0; i < currentWord.length; i++) {
		wordDisplay.push(' ');
	}
	displayFunction(wordDisplay);
};

export const manageGuesses = (setHasGuessed, setGuessesRemaining) => {
	setHasGuessed(true);
	setGuessesRemaining((prevGuesses) => prevGuesses - 1);
};

export const handleLoss = (
	remainingGuesses,
	setGameOver,
	playAudio,
	AudioFile,
) => {
	if (remainingGuesses === 0) {
		setTimeout(() => {
			setGameOver(true);
			playAudio(AudioFile);
		}, 1000);
	}
};

export const handleWin = (
	displayedWord,
	playAudio,
	Audiofile,
	HasWonBool,
	GameWinActiveBool,
) => {
	const letterRegex = /^[a-z]+$/i;
	const displayedWordString = displayedWord.join('');
	const completedGuess = letterRegex.test(displayedWordString);

	if (completedGuess) {
		setTimeout(() => {
			playAudio(Audiofile);
			HasWonBool(true);
			setTimeout(() => {
				GameWinActiveBool(true);
			}, 5000);
		}, 500);
	}
};
