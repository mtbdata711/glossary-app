import React, { Component, Fragment } from "react";
import "./Grid.css"

class GenerateSuccess extends Component {
  render() {
    return (
        <div className='sm-col-6 center-block'>
        <div className="alert alert-success" role="alert">
            {this.props.term} {this.props.message}
        </div>
        </div>
    );
  }
}

export default GenerateSuccess;
