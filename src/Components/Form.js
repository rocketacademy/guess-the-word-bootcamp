import React from 'react';

function Form(){

  return(
    <form onSubmit={handleSubmit}>
      <label>Type one letter below</label>
      <br/>
      <input 
        name="inputLetter"
        type="text"
        maxLength={1}
        minLength={1}
        size={1}
        value={state.inputLetter}
        onChange={handleChange}
      />
      <br/>
      <input
        type= 'submit'
        value = 'Press to guess!'
      /> 
    </form>
  );
}

export default Form;