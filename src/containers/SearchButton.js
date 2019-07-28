import React, { Component, Fragment } from "react";

export default class SearchButton extends Component {
  render() {
    return (
      <Fragment>
        <button
          type="submit"
          value="submit"
          className="button-submit-query mt-2"
        >
          Search
        </button>
      </Fragment>
    );
  }
}
