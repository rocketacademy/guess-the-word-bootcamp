import React from "react";
import hangbot from "./hangbot.png";

export default class Message extends React.Component {
  render() {
    return (
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full shadow-lg">
            <img src={hangbot} alt="hangman" />
          </div>
        </div>
        <div className=" shadow-lg min-w-full chat-bubble text-[9px]">
          {this.props.message}
        </div>
      </div>
    );
  }
}
