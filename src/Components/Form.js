import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="input"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
