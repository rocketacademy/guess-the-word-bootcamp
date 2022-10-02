import React from "react";

export class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleSubmit(e) {
    this.props.onSubmit(e.target.value);
    e.preventDefault();
  }

  handleFormChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-item">
          <label htmlFor="guess">Guess:</label>
          <input
            name="guess"
            value={this.props.guess}
            id="guess"
            onChange={this.handleFormChange}
            maxLength={1}
          />
        </div>

        <button type="submit">Submit </button>
      </form>
    );
  }
}
