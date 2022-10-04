import React from "react";

class GuessDisplay extends React.Component{
  render(){
    let display = ''
    for(let i = 0; i < this.props.letters.length; i++){
      display += `${this.props.letters[i]} `
    }
    return(
      <div>
        <p style={{margin: 4}}>Gussed Letters:</p>
        {display}
      </div>
    )
  }
}

export default GuessDisplay