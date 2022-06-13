import words from "./words.json";

export const getRandomWord = () => {
  // Lowercase words for simplicity
  return words[Math.floor(Math.random() * words.length)].toLowerCase();
};

export const countNumOfUniqueLetters = (word) => {
  let setOfUniqueLetters = new Set();

  for (let i = 0; i < word.length; i++) {
    setOfUniqueLetters.add(word[i]);
  }
  return setOfUniqueLetters.size;
};
