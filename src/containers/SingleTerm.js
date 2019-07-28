import React, { Component, Fragment } from "react";
import SingleResources from "./SingleResources";
import SingleRelated from "./SingleRelated";
import GenerateSuccess from "./GenerateSuccess";
import "./SingleTerm.css";
import "./SingleSearchResult.css";
import "./Grid.css";
import ls from "local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Fetcher } from "./fetcher.js";
const fetcher = new Fetcher();
export default class SingleTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null,
      edit: false,
      view: false,
      history: null,
      success: null
    };
  }

  ToggleHistory = e => {
    this.setState(prevState => ({
      view: !prevState.view
    }));
  };

  HistoryItems = () => {
    if (this.state.view && this.state.history !== null) {
      return this.state.history.map((single, key) => {
        if (key !== 0) {
          return (
            <li key={key}>
              <p className="text-muted">
                + <b>Definition: </b>
                {single.definition} <b>Added by: </b>
                {single.user_name}
              </p>
            </li>
          );
        }
      });
    }
  };

  ViewHistory = () => {
    return <ul className="history-list">{this.HistoryItems()}</ul>;
  };

  HandleUpdate = data => {
    // console.log("running")
    return this.setState({
      term: data
    });
  };

  toggleEditable = e => {
    this.setState(prevState => ({
      edit: !prevState.edit
    }));
  };

  NewDefinitionInput = e => {
    this.setState({
      userDefinition: e.target.value
    });
  };

  HandleNewDefinition = e => {
    const term = this.state.term;
    const obj = {};
    obj["definition"] = this.state.userDefinition;
    obj["id"] = term._id;
    obj["user"] = ls.get("currentUserId");
    obj["userName"] = ls.get("currentUser");
    this.sendFetch(obj);
  };

  sendFetch(obj) {
    const term = this.state.term;
    const id = term._id;
    return fetch(
      `https://cyf-glossary-api.glitch.me/api/pushDefinition/${id}`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        if (response._id) {
          this.HandleUpdate(response);
          this.setState({
            edit: false
          });
        }
      });
  }

  async componentDidMount() {
    const term = await fetcher.fetchTermByPath(this.props);
    this.setState({
      term: term
    });
    if (this.state.term !== null) {
      const history = await fetcher.fetchHistoryById(this.state.term._id);
      this.setState({
        history: history
      });
    }
  }

  saveTerm = e => {
    const user = ls.get("currentUserId");
    const reqObj = {
      id: this.state.term._id,
      user: user
    };
    this.saveFetch(reqObj);
  };

  saveFetch(obj) {
    const term = this.state.term;
    const id = term._id;
    return fetch(`https://cyf-glossary-api.glitch.me/api/saved/${id}`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        if (response._id) {
          this.setState({
            success: true
          });
        }
      });
  }

  SingleTermContent = () => {
    if (this.state.term === null) {
      return;
    }

    const term = this.state.term;

    return (
      <Fragment>
        {this.state.success ? (
          <GenerateSuccess term={this.state.term.term} message='was added to your saved terms!' />
        ) : null}
        <div className="results-wrapper single-result sm-col-10">
          <div className="single-container sm-col-12">
            <div className="single-container sm-col-12">
              <div className="lg-col-10 md-col-10 sm-col-12">
                <h1 className="term-heading">
                  <span className="term-icon">
                    <FontAwesomeIcon icon={faBook} size="1x" />{" "}
                  </span>
                  <span className="term-heading-decoration">{term.term}</span>
                </h1>
              </div>
              <div className="lg-col-2 md-col-2 sm-col-12">
                <div className="icon-container">
                  <span className="icon">
                    <FontAwesomeIcon
                      icon={faSave}
                      size="3x"
                      onClick={this.saveTerm}
                    />
                    {""}
                  </span>
                  {/* <span className="icon">
                <FontAwesomeIcon icon={faEdit} size="2x" />{" "}
              </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="single-container sm-col-10">
            <div className="content sm-col-12">
              <p className="text-muted">
                Added by:{" "}
                <b>
                  {this.state.history === null
                    ? term.user_name
                    : this.state.history[0].user_name}
                </b>
                {/* <b></b> {ls.get("currentUser")} */}
              </p>
              {this.state.edit === true ? (
                <Fragment>
                  <textarea
                    cols="30"
                    rows="8"
                    defaultValue={term.definition}
                    onChange={this.NewDefinitionInput}
                  />
                  <div className="sm-col-2">
                    <button onClick={this.HandleNewDefinition}>Save</button>
                  </div>
                </Fragment>
              ) : (
                <p>{term.definition}</p>
              )}
              <div className="def-icon-container">
                <span className="icon">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={this.toggleEditable}
                    size="2x"
                  />{" "}
                </span>
              </div>
              <div
                onClick={this.ToggleHistory}
                className="text-muted toggle-history"
              >
                {this.state.view ? "- View History" : "+ View History"}
              </div>
              {this.state.view ? this.ViewHistory() : null}
            </div>
          </div>
          <div className="single-container sm-col-12">
            <div className="sm-col-12">
              <div className="term-heading">
                <span className="term-icon">
                  <FontAwesomeIcon icon={faGlobe} size="1x" />{" "}
                </span>
                <span className="term-heading-decoration">Learn more</span>
              </div>
              <SingleResources
                content={term.resources}
                links={term.resources_url}
                url="resources_url"
                name="resources"
                placeholderURL="Resource URL"
                placeholderName="Resource Name"
                id={term._id}
                handleUpdate={this.HandleUpdate}
              />
            </div>
          </div>
          <div className="single-container sm-col-12">
            <div className="sm-col-12">
              <div className="term-heading">
                <span className="term-icon">
                  <FontAwesomeIcon icon={faLink} size="1x" />{" "}
                </span>
                <span className="term-heading-decoration">Related Terms</span>
              </div>
              <SingleRelated
                content={term.related_terms}
                name="related_terms"
                placeholder="Related Term"
                id={term._id}
                handleUpdate={this.HandleUpdate}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    return (
      <Fragment>
        {this.state.term !== null ? this.SingleTermContent() : null}
      </Fragment>
    );
  }
}
