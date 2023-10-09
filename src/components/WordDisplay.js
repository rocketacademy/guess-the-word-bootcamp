import {
    Grid,
    Paper,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import React, { Component } from "react";

const fontChange = createTheme({
    typography: {
        fontFamily: ["Inconsolata", "monospace"].join(","),
    },
});

class WordDisplay extends Component {
    render() {
        return (
            <Grid item xs={8}>
                <Paper
                    sx={{
                        backgroundColor: "#BAB6AE",
                        padding: "1.5rem",
                        height: "200px",
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: "#2E2B26",
                            color: "#74D144",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Inconsolata', monospace",
                        }}
                    >
                        <ThemeProvider theme={fontChange}>
                            <Typography variant="h1" component="h3">
                                {this.props.wordWithSpace}
                            </Typography>
                        </ThemeProvider>
                    </Paper>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={1}
                        mt={0.75}
                    >
                        <Paper
                            sx={{
                                borderRadius: "50%",
                                backgroundColor: "red",
                                width: "10px",
                                height: "10px",
                            }}
                        />
                        <Paper
                            sx={{
                                borderRadius: "50%",
                                backgroundColor: "green",
                                width: "10px",
                                height: "10px",
                            }}
                        />
                        <Paper
                            sx={{
                                borderRadius: "50%",
                                backgroundColor: "orange",
                                width: "10px",
                                height: "10px",
                            }}
                        />
                    </Stack>
                </Paper>
            </Grid>
        );
    }
}

export default WordDisplay;
