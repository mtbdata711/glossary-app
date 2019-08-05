import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ls from "local-storage";
import { Fetcher } from "./fetcher.js";
import { throwStatement } from "babel-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import GenerateSuccess from "./GenerateSuccess";
const fetcher = new Fetcher();

export default class UserTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      success: null,
      deleted: null
    };
  }

  async componentDidMount() {
    const results = await fetcher.fetchTermsByUser(ls.get("currentUserId"));
    this.setState({
      results: results
    });
  }

  HandleDelete = e => {
    const termId = e.target.closest("span").getAttribute("data-id");

    return this.deleteUserTerm(termId);
  };

  HandleUpdate = termId => {
    this.setState(prevState => ({
      results: prevState.results.filter(single => single._id != termId)
    }));
  };

  deleteUserTerm(termId) {
    return fetch(
      `https://cyf-glossary-api.glitch.me/api/deleteterm?id=${termId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.HandleUpdate(termId);
        this.setState({
          success: true
        });
      });
  }

  generateResults = () => {
    if (this.state.results.length) {
      return this.state.results.map((result, index) => {
        return (
          <div className="sm-col-12 single-result" key={index}>
            <Link
              className="single-result-link"
              to={`/term/${result.term_slug}`}
            >
              {result.term}
            </Link>
            <div className="content">
              <p>{result.definition}</p>
            </div>
            <div className="sm-col-12 single-container">
              <div className="sm-col-10">
                <Link to={`/search/${result.topic}`}>
                  <span className="badge result-badge-topic result-badge-margin">
                    {result.topic.toUpperCase()}
                  </span>
                </Link>
              </div>
              <div className="sm-col-2">
                <span className="icon" data-id={result._id}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={this.HandleDelete}
                    size="2x"
                  />{" "}
                </span>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="sm-col-12">
          <h2 className="no-results">You have not added any terms</h2>

          <p className="text-center utility-margin-top">
            Why not <Link to={`/new`}>Add New Term</Link>?
          </p>
        </div>
      );
    }
  };

  render() {
    const currentUser = ls.get("currentUser");
    console.log(ls.get('currentUserId'))
    return (
      <Fragment>
        <div className="results-wrapper sm-col-10">
          {this.state.success ? (
            <GenerateSuccess
              term={"Term"}
              message="removed from CYF Glossary!"
            />
          ) : null}
          <div className="single-container sm-col-12">
            <h1>{currentUser}'s Terms</h1>
          </div>
        </div>
        <div className="results-container">
          <div className="single-container sm-col-12">
            <div className="results-wrapper">
              {this.state.results === null ? null : this.generateResults()}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
