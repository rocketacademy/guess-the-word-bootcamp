import React from "react";

const Form = ({ value, onSubmit, onChange }) => {
  return (
    <>
      <form onClick={onSubmit}>
        <input onChange={onChange} value={value} />
        <input type="submit" />
      </form>
    </>
  );
};

export default Form;
