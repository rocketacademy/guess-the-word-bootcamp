import { Alert, Button, Grid, Paper, Stack, styled } from "@mui/material";
import React, { Component } from "react";

class GuessForm extends Component {
    render() {
        return (
            <Grid item xs={12}>
                <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <input
                            required
                            name="guessInput"
                            type="text"
                            value={this.props.guessInput}
                            onChange={this.props.handleChange}
                            disabled={
                                this.props.gameResult === "lose"
                                    ? true
                                    : this.props.gameResult === "win"
                                    ? true
                                    : false
                            }
                        />

                        {/* <StyledButton
                            disableRipple
                            variant="contained"
                            type="submit"
                            disabled={
                                this.props.gameResult === "lose"
                                    ? true
                                    : this.props.gameResult === "win"
                                    ? true
                                    : false
                            }
                        >
                            Guess!
                        </StyledButton> */}
                        {this.props.error && (
                            <Alert
                                variant="filled"
                                severity="error"
                                sx={{
                                    backgroundColor: "#F64F4F",
                                }}
                            >
                                {this.props.errorMsg}
                            </Alert>
                        )}
                    </Stack>
                </form>
            </Grid>
        );
    }
}

export default GuessForm;
