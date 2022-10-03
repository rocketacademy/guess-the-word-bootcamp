import React from "react";

class Display extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    const letterArr = this.props.display
    const word = this.props.word.split('')
    let display = word.map((letter, ) => (
      <div className="displayLetters">
        {letterArr.indexOf(letter) >= 0 ? letter : "_"}
      </div>
    ));
    
    console.log(display);
    return(
      <div className="display">
        {display}
      </div>
    );
  }
}

export default Display;