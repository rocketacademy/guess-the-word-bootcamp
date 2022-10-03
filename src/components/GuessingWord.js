

export function GuessingWord({ handleSubmit, handleFormChange, afterGuessValue }) {
  return (
    <div>
      <h3>Input</h3>
      {/* Insert form element here */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="alphabet">Guess the letter!</label>
        <input
          name="alphabet"
          id="alphabet"
          onChange={(e) => handleFormChange(e)}
          value={afterGuessValue}
        />
        <button type="submit">Guess!</button>
      </form>
    </div>
  );
}