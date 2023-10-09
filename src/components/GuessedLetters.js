import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { Component } from "react";

class GuessedLetters extends Component {
    render() {
        return (
            <Grid item xs={4}>
                <Paper
                    sx={{
                        backgroundColor: "#B5EBC6",
                        height: "100%",
                        color: "#49443a",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h4"
                        p={1}
                        sx={{ fontWeight: "700" }}
                    >
                        Guessed Letters
                    </Typography>
                    <Container
                        sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                        {this.props.guessedLetters.sort().map((letter) => {
                            return (
                                <Paper
                                    key={crypto.randomUUID()}
                                    sx={{
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "20px",
                                    }}
                                >
                                    <Typography
                                        sx={{ fontWeight: "700" }}
                                        variant="h4"
                                    >
                                        {letter}
                                    </Typography>
                                </Paper>
                            );
                        })}
                    </Container>
                    {/* {this.props.guessedLetters.length > 0
                        ? this.props.guessedLetters.join(", ")
                        : "-"} */}
                </Paper>
            </Grid>
        );
    }
}

export default GuessedLetters;
