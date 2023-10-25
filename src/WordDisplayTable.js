import { TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";

export default class WordDisplay extends React.Component {
  generateWordDisplay = () => {
    const { currWord, guessedLetters, result } = this.props.info;
    const wordDisplay = [];

    for (let letter of currWord) {
      if (guessedLetters.includes(letter) || result === "lose") {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  render() {
    return (
      <TableContainer align="center">
        <TableRow sx={{ border: 1 }}>
          <TableCell sx={{ border: 1 }}>
            <h2>Word Display</h2>
          </TableCell>
          <TableCell sx={{ border: 1 }}>{this.generateWordDisplay()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ border: 1 }}>
            <h2>Guessed Letters</h2>
          </TableCell>
          <TableCell te sx={{ border: 1 }}>
            {this.props.info.guessedLetters.length
              ? this.props.info.guessedLetters.toString()
              : "-"}
          </TableCell>
        </TableRow>
      </TableContainer>
    );
  }
}
