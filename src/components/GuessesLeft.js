import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { Component } from "react";
import dog from "../assets/img/dog_1f415.png";
import knifeImg from "../assets/img/kitchen-knife_1f52a.png";
import potImg from "../assets/img/pot-of-food_1f372.png";

class GuessesLeft extends Component {
    render() {
        let knife = <img src={knifeImg} alt="dog face" height={70} />;

        let guessWord = this.props.guessesLeft === 1 ? "guess" : "guesses";

        let placeholders = ["x", "x", "x", "x", "x", "x"];
        console.log(this.props.guessesLeft);

        if (this.props.guessesLeft !== 0)
            placeholders.splice(this.props.guessesLeft - 1, 1, knife);
        return (
            <Grid item xs={12}>
                <Paper sx={{ backgroundColor: "#ECFFE8" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            padding: "1rem",
                        }}
                    >
                        {this.props.gameResult === "lose" ? (
                            <img src={potImg} alt="pot of food" height={120} />
                        ) : (
                            <img
                                src={dog}
                                alt="dog face"
                                height={120}
                                style={{ transform: "scaleX(-1)" }}
                            />
                        )}
                        {placeholders.map((elem) => {
                            return (
                                <div key={crypto.randomUUID()} width={120}>
                                    {elem}
                                </div>
                            );
                        })}
                    </Box>
                    {this.props.gameResult === "lose" && (
                        <Typography
                            variant="h4"
                            component="h4"
                            p={2}
                            sx={{ fontWeight: "700" }}
                        >
                            Game Over... oh no.... 😭
                        </Typography>
                    )}
                    {this.props.gameResult === "win" && (
                        <Typography
                            variant="h4"
                            component="h4"
                            p={2}
                            sx={{ fontWeight: "700" }}
                        >
                            Phew... The dog is saved! 🥰🐕
                        </Typography>
                    )}
                    {this.props.gameResult == null && (
                        <Typography
                            variant="h5"
                            component="h4"
                            p={2}
                            sx={{ fontWeight: "700" }}
                        >
                            You have {this.props.guessesLeft} {guessWord} left
                            before the dog dies 😨
                        </Typography>
                    )}
                </Paper>
            </Grid>
        );
    }
}

export default GuessesLeft;
