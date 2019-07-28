import React, { Component, Fragment } from "react";

export default class SingleDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  editContent = () => {
    return (
      <Fragment>
        <div className="loginEmail">
          <label htmlFor="definition">Definition</label>
          <textarea name="definition">{this.props.definition.trim()}</textarea>
        </div>
      </Fragment>
    );
  };

  HandleClick = e => {
    this.setState(prevState => ({
      // prevState?
      edit: !prevState.edit
    }));
  };

  render() {
    return (
      <Fragment>
        {this.state.edit ? this.editContent() : <p>{this.props.definition}</p>}
        <span>
          <button onClick={this.HandleClick}>Edit</button>
        </span>
      </Fragment>
    );
  }
}
