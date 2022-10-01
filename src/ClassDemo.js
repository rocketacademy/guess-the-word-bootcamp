import React from "react";
import "./App.css";

class ClassDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      gender: "",
      favouriteFood: "",
    };
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    // prevent form from making a request to a certain url
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ padding: "16px 32px" }}>
        <h3>My First Form</h3>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-item">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={this.state.name}
              id="name"
              onChange={(e) => this.handleFormChange(e)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="age">Age</label>
            <input
              name="age"
              value={this.state.age}
              id="age"
              onChange={(e) => this.handleFormChange(e)}
            />
          </div>

          <div className="form-item">
            <label>Gender</label>
            <input
              name="gender"
              value="male"
              type="radio"
              onChange={(e) => this.handleFormChange(e)}
            />
            Male
            <input
              name="gender"
              value="female"
              type="radio"
              onChange={(e) => this.handleFormChange(e)}
            />
            Female
          </div>

          <div className="form-item">
            <label>Favorite Food</label>
            <select
              onChange={(e) => this.handleFormChange(e)}
              value={this.state.favoriteFood}
              name="favoriteFood"
            >
              <option name="Chicken" value="chicken">
                Chicken
              </option>
              <option name="Pork" value="pork">
                Pork
              </option>
              <option name="Beef" value="beef">
                Beef
              </option>
            </select>
          </div>

          <div className="form-item">
            <label htmlFor="description">Short description of myself</label>
            <textarea
              rows={5}
              name="description"
              style={{ width: "300px" }}
              onChange={(e) => this.handleFormChange(e)}
            ></textarea>
          </div>

          <button type="submit">Submit </button>
        </form>
      </div>
    );
  }
}

export default ClassDemo;
