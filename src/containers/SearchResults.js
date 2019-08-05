import React, { Component, Fragment } from "react";
import SingleSearchResult from "./SingleSearchResult";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Fetcher } from "./fetcher.js";
const fetcher = new Fetcher();

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    };
  }

  async componentDidMount() {
    const results = await fetcher.fetchTermsByParams(this.props);
    this.setState({
      results: results
    });
  }

  generateResults = () => {
    const currentQuery = this.props.match.params.query;
    if(this.state.results.length){
      return this.state.results.map((result, key) => {
        return (
          <SingleSearchResult
            key={key}
            term={result.term}
            definition={result.definition}
            topic={result.topic}
            termSlug={result.term_slug}
            topicSlug={result.topic_slug}
          />
        );
      });
    }else{
      return(
        <div className="sm-col-12">
          <h2 className="no-results">No results found for&nbsp;<b>{currentQuery}</b>!</h2>

          <p className="text-center utility-margin-top">
            Why not <Link to={`/new`}>add {currentQuery} to CYF Glossary</Link>?
          </p>
          </div>
      )
    }
    }


  render() {
    return (
      <Fragment>
        <div className="results-container-column">
          <h1>Search Results</h1>
          <div className="results-wrapper">
            {this.state.results === null ? null : this.generateResults()}
          </div>
        </div>
      </Fragment>
    );
  }
}
