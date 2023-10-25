export default function detResult(currWord, guessedLetters, numGuess) {
  let hash = {};
  for (let i = 0; i < currWord.length; i++) {
    if (!(currWord[i] in hash)) {
      hash[currWord[i]] = false;
    }
  }
  for (let i = 0; i < guessedLetters.length; i++) {
    if (guessedLetters[i] in hash) {
      hash[guessedLetters[i]] = true;
    }
  }
  if (!Object.values(hash).includes(false)) {
    return "win";
  } else if (numGuess === 0) {
    return "lose";
  }
}
