import React from "react";

export default class InputGuess extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleChange, handleSubmit, userWord } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Input
          value={userWord}
          onChange={handleChange}
          maxlength={1}
          placeholder="One alphabet letter only"
          variant="standard"
          color="primary"
        />
        <Button type="submit" variant="contained" color="secondary">
          Guess!
        </Button>
      </form>
    );
  }
}
