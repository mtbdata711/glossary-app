import React, { Component, Fragment } from "react";
import SingleRelatedInput from "./SingleRelatedInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { Fetcher } from "./fetcher.js";
import ls from "local-storage";
const fetcher = new Fetcher();

export default class SingleRelated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      terms: this.props.content,
      addRelated: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      this.setState({
        terms: this.props.content
      });
      const newState = this.state.count.slice(0, this.state.count.length - 1);
      this.setState(prevState => ({
        count: newState,
        addRelated: false
      }));
    }
  }

  addContent = () => {
    return this.state.count.map((single, key) => {
      return (
        <SingleRelatedInput
          name={this.props.name}
          placeholder={this.props.placeholder}
          key={key}
          id={this.props.id}
          handleUpdate={this.props.handleUpdate}
        />
      );
    });
  };

  HandleRemove = e => {
    const currentState = this.state.count;
    const newState = currentState.slice(0, currentState.length - 1);
    this.setState(prevState => ({
      count: newState,
      addRelated: false
    }));
  };

  HandleClick = e => {
    this.setState(prevState => ({
      count: [...prevState.count, "add"],
      addRelated: true
    }));
  };

  ResourceContent = () => {
    if (this.state.terms) {
      return (
        <Fragment>
          {this.state.terms.map((related, index) => {
            return (
              <li key={index}>
                <a className="link" href={`/term/${fetcher.slugify(related)}`}>
                  {related}{" "}
                </a>
              </li>
            );
          })}
        </Fragment>
      );
    }
  };

  render() {
    return (
      <div className="sm-col-12">
        <ul className="list-margin">
          {this.ResourceContent()}
          {this.state.count.length > 0 ? this.addContent() : null}
        </ul>
        {!ls.get("currentUser") ? null : (
          <div className="icon-container">
            <span className="icon">
              <FontAwesomeIcon
                icon={faPlusSquare}
                onClick={this.HandleClick}
                size="2x"
              />{" "}
            </span>
            {!this.state.addRelated ? null : (
              <span className="icon">
                <FontAwesomeIcon
                  icon={faMinusSquare}
                  onClick={this.HandleRemove}
                  size="2x"
                />{" "}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}
