import React, { Component, Fragment } from "react";



class SingleTextArea extends Component {

callback = (e) => {
  e.preventDefault()
  const value = e.target.value;
  this.props.controlFunc(value, this.props.name)
}

    render() {
        return (
          <Fragment>
          <label htmlFor={this.props.name}>{this.props.label}</label>
<textarea rows="3" name={this.props.name} onChange={this.callback} />

          </Fragment>
        );
    }
}

export default SingleTextArea
