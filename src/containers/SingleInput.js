import React, { Component, Fragment } from "react";

class SingleInput extends Component {
  callback = e => {
    e.preventDefault();
    const value = e.target.value;
    this.props.controlFunc(value, this.props.name);
  };

  render() {
    return (
      <Fragment>
        <div className="loginEmail">
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <input
            placeholder={this.props.placeholder}
            type={this.props.type}
            name={this.props.name}
            onChange={this.callback}
            noValidate
          />
        </div>
      </Fragment>
    );
  }
}

export default SingleInput;
