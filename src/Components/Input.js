import React from "react";

export class Input extends React.Component {
  render() {
    console.log(this.props.letter)
    return (
      <div>
        <div>
          <input style={{textAlign:"center"}} type="text" value={this.props.letter} onKeyDown={this.props.onKeyDown} maxLength={1} placeholder="Type One Letter Only"/>
        </div>
      </div>
    );
  }
}

export default Input;
