import React, { Component } from "react";

class Form extends Component {
  state = {
    selectMode: "",
    userName: ""
  };

  handleChange = e => {
    if (e.target.name === "selectMode") {
      this.props.drawField(e.target.value);
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { userName } = this.state;
    e.preventDefault();
    this.props.startPlay(userName);
  };

  render() {
    const { selectMode, userName } = this.state;
    const { optionsSelect, buttonPlay, disabled } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select
            required
            name="selectMode"
            onChange={this.handleChange}
            value={selectMode}
          >
            <option value="" disabled>
              Pick game mode
            </option>
            {optionsSelect.map(option => {
              return (
                <option key={option} value={option} label={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <input
            required
            name="userName"
            onChange={this.handleChange}
            placeholder="Enter your name"
            value={userName}
          ></input>
          <button type="submit" disabled={disabled}>
            {buttonPlay}
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
