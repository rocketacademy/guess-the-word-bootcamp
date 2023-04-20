import React from "react";

export default class DisplayImages extends React.Component{
    constructor(props) {
        // Always call super with props in constructor to initialise parent class
        super(props);
        this.state = {
          
        };
    }
        render() {
            const { cGuess, wGuess, length } = this.props;
            
            //const classes = useStyles();
         
        
            const myImage = require(`./images/${cGuess}${wGuess}${length}.png`);
        
            return <img src={myImage} width="200px" alt="scene here" />;
          }
      }
