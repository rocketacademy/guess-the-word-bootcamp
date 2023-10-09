import { Grid, Typography } from "@mui/material";
import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <Grid item xs={12}>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{ fontWeight: "700", padding: "0" }}
                >
                    Guess The Word!
                </Typography>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        margin: "0",
                        padding: "0",
                        letterSpacing: "7px",
                        fontWeight: "400",
                    }}
                >
                    (or the dog dies)
                </Typography>
            </Grid>
        );
    }
}

export default Header;
