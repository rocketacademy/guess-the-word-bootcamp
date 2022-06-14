import words from "./words.json";

let word = "";

export const getRandomWord = () => {
  // Lowercase words for simplicity
  word = words[Math.floor(Math.random() * words.length)];
  return word.toLowerCase();
};
