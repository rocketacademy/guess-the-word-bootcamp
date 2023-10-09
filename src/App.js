import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import Header from "./components/Header.js";
import { Button, Container, Grid, styled } from "@mui/material";
import WordDisplay from "./components/WordDisplay.js";
import GuessedLetters from "./components/GuessedLetters.js";
import GuessesLeft from "./components/GuessesLeft.js";
import GuessForm from "./components/GuessForm.js";

function isAllLetters(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    if (inputtxt.match(letters)) return true;
    return false;
}

const StyledButton = styled(Button)({
    backgroundColor: "#B5EBC6",
    color: "#49443a",
    fontWeight: "700",
    fontSize: "2rem",
    padding: "1rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    "&:hover": {
        backgroundColor: "#61D8A8",
    },
});

class App extends React.Component {
    constructor(props) {
        // Always call super with props in constructor to initialise parent class
        super(props);
        this.state = {
            // currWord is the current secret word for this round. Update this with this.setState after each round.
            currWord: getRandomWord(),
            // guessedLetters stores all letters a user has guessed so far
            guessedLetters: [],

            correctGuesses: 0,

            guessesLeft: 6,
            guessInput: "",
            error: false,
            errorMsg: "",
        };
    }

    generateWordDisplay = () => {
        const wordDisplay = [];
        // for...of is a string and array iterator that does not use index
        for (let letter of this.state.currWord) {
            if (this.state.guessedLetters.includes(letter)) {
                wordDisplay.push(letter);
            } else {
                wordDisplay.push("_");
            }
        }
        return {
            wordWithSpace: wordDisplay.join(" "),
            wordWithoutSpace: wordDisplay.join(""),
        };
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let input = e.target[0].value.toLowerCase();

        // check for duplicates => YES? show error and end prematurely
        if (this.state.guessedLetters.indexOf(input) !== -1) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    errorMsg: "Oops, you've typed in a duplicate letter!",
                };
            });
            return;
        }

        // check for non-alphabets => YES? show error and
        if (!isAllLetters(input)) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    errorMsg: "Only enter alphabets please!",
                };
            });
            return;
        }

        this.setState((prevState) => {
            // check if guess is correct => YES? update guessedLetters array, reset input field, DONT decrease guessesLeft
            if (prevState.currWord.includes(input)) {
                return {
                    ...prevState,
                    guessedLetters: [...prevState.guessedLetters, input],
                    guessInput: "",
                };
            }

            // check if guess is correct => NO? update guessedLetters array, reset input field, decrease guessesLeft
            return {
                ...prevState,
                guessedLetters: [...prevState.guessedLetters, input],
                guessInput: "",
                guessesLeft: prevState.guessesLeft - 1,
            };
        });
    };

    handleChange = (e) => {
        this.setState((prevState) => {
            let input = e.target.value;

            // check if length of input > 1 => YES? show error message
            if (input.length > 1) {
                return {
                    ...prevState,
                    error: true,
                    errorMsg: "Only enter 1 character please!",
                };
            }

            // check if length of input > 1 => NO? update form states
            return {
                ...prevState,
                guessInput: e.target.value,
                error: false,
            };
        });
    };

    restartGame = () => {
        this.setState({
            // currWord is the current secret word for this round. Update this with this.setState after each round.
            currWord: getRandomWord(),
            // guessedLetters stores all letters a user has guessed so far
            guessedLetters: [],

            correctGuesses: 0,

            guessesLeft: 6,
            guessInput: "",
            error: false,
            errorMsg: "",
        });
    };

    render() {
        let { wordWithSpace, wordWithoutSpace } = this.generateWordDisplay();

        let gameResult;
        if (wordWithoutSpace === this.state.currWord) gameResult = "win";
        else if (this.state.guessesLeft === 0) gameResult = "lose";

        return (
            <div className="App">
                <Container>
                    <header className="App-header">
                        <Grid container spacing={2}>
                            <Header />
                            <WordDisplay wordWithSpace={wordWithSpace} />
                            <GuessedLetters
                                guessedLetters={this.state.guessedLetters}
                            />
                            <GuessesLeft
                                guessesLeft={this.state.guessesLeft}
                                gameResult={gameResult}
                            />
                            <Grid item xs={12}>
                                {gameResult && (
                                    <StyledButton onClick={this.restartGame}>
                                        Play Again
                                    </StyledButton>
                                )}
                                {gameResult == null && (
                                    <h3>Type a letter here:</h3>
                                )}
                            </Grid>
                            {gameResult == null && (
                                <GuessForm
                                    handleSubmit={this.handleSubmit}
                                    guessInput={this.state.guessInput}
                                    gameResult={gameResult}
                                    handleChange={this.handleChange}
                                    error={this.state.error}
                                    errorMsg={this.state.errorMsg}
                                />
                            )}
                        </Grid>
                    </header>
                </Container>
            </div>
        );
    }
}

export default App;
