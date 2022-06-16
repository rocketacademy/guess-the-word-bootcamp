import words from "./words.json";

export const getRandomWord = () => {
  // Lowercase words for simplicity
  return words[Math.floor(Math.random() * words.length)].toLowerCase();
};

export const currLetter = (currWord) => {
  let letterToGuess = new Set();
  for (let i = 0; i < currWord.length; i++) {
    letterToGuess.add(currWord[i]);
  }
  return letterToGuess;
};
