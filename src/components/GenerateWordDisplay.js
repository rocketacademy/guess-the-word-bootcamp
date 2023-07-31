export default function GenerateWordDisplay({currWord, correctLetters}) {
  const wordDisplay = [];

  for (let i=0; i<currWord.length; i++) {
    if (correctLetters.includes(currWord[i])) {
      wordDisplay.push(currWord[i]);
    } else {
      wordDisplay.push("_");
    }
  }

  return <div>{wordDisplay.toString()}</div>;  
}
// export default function generateWordDisplay({currWord, guessedLetters}) {
//   const wordDisplay = [];
//   for (let letter of currWord) {
//     if (guessedLetters.includes(letter)) {
//       wordDisplay.push(letter);
//     } else {
//       wordDisplay.push("_");
//     }
//   }
//   return wordDisplay.toString();  
// }