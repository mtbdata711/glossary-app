import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Grid.css"

class GeneratedLink extends Component {
  render() {
    return (
        <div className='sm-col-6'>
        <div className="alert alert-success" role="alert">
          <Link
            className="text-center"
            to={{
              pathname: `/term/${this.props.term}`,
              state: { post: this.props.term }
            }}
          >
            {this.props.topicName} was added to CYF Glossary!
          </Link>
        </div>
        </div>
    );
  }
}

export default GeneratedLink;
