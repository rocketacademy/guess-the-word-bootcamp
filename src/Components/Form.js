import React from "react";

const Form = ({ value, onChange, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          placeholder="Enter only one letter"
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Form;
