import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./SingleSearchResult.css";
import "./Grid.css";

export default class SingleSearchResult extends Component {
  render() {
    return (
      <div className="sm-col-12 single-result">
        <Link
          className="single-result-link"
          to={`/term/${this.props.termSlug}`}
        >
          {this.props.term}
        </Link>
        <div className="content">
          <p>{this.props.definition}</p>
        </div>
        <Link to={`/search/${this.props.topic}`}>
          <span className="badge result-badge-topic result-badge-margin">
            {this.props.topic.toUpperCase()}
          </span>
        </Link>
      </div>
    );
  }
}
