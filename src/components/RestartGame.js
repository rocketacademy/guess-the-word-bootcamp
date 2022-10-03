import * as React from "react";
import Button from "@mui/material/Button";

export function RestartGame({ gameRestarted }) {
  return (
    <div>
      <div>
        <h1>Well done!</h1>
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
    </div>
  );
}
