import React from "react";

export class Notification extends React.Component {
  render() {
    return (
      <div className={`notification-container ${this.props.showNotification ? 'show' : ''}`}>
        <p>You have already entered this letter</p>
      </div>
    );
  }
}

export default Notification;
