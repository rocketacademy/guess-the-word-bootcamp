
import * as React from "react";
import Button from "@mui/material/Button";

export function GameOver({ currWord, gameRestarted }) {
  return (
    <div>
      <h1>GAME OVER!</h1>
      <p>The word is...</p>
      <p>{currWord}</p>
      <h3>Restart game?</h3>
      <Button
        size="large"
        variant="contained"
        color="error"
        onClick={gameRestarted}
      >
        RESTART
      </Button>
    </div>
  );
}