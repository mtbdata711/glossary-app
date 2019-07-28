import React, { Component, Fragment } from "react";
import "./Home.css";
import Search from "./Search";
import SingleSearchResult from "./SingleSearchResult";
import "./Grid.css";
import ls from "local-storage";
import { withRouter } from "react-router-dom";
// import Data from"./Definitions.json"
import Term from "./Term";
class Home extends Component {
  state = { searchData: [], loggedin: null, newLogin: null };
  componentDidMount() {
    fetch("https://cyf-glossary-api.glitch.me/api/getall")
      .then(response => response.json())
      .then(data => {
        this.setState({ searchData: data });
        //console.log(data); // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error));

    if (this.props.location.state) {
      if (this.props.location.state.loggedout === true) {
        this.setState({
          loggedin: false
        });
      } else {
        if (this.props.location.state.loggedin === true) {
          this.setState({
            loggedin: true
          });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.loggedin === true && !ls.get("currentUser")) {
      this.setState({
        loggedin: false
      });
    }
  }

  UserLoggedOutAlert = () => {
    return (
      <div className="sm-col-6 utility-margin-auto">
        <div className="alert alert-success" role="alert">
          You have successfully logged out!
        </div>
      </div>
    );
  };

  UserLoggedInAlert = () => {
    return (
      <div className="sm-col-6 utility-margin-auto">
        <div className="alert alert-success" role="alert">
          You have successfully logged in!
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="Home">
        <div className="lander">
          {this.state.loggedin === false ? this.UserLoggedOutAlert() : null}
          {this.state.loggedin === true && ls.get("currentUser")
            ? this.UserLoggedInAlert()
            : null}
          <h1 className="heading-black">
            <span className="heading-red">CYF</span> Glossary
          </h1>
          <Search />
        </div>
        <div className="flext-container">
          <div className="results-wrapper">
            {this.state.searchData.map((result, key) => {
              return (
                <Fragment key={key}>
                  <SingleSearchResult
                    term={result.term}
                    definition={result.definition}
                    topic={result.topic}
                    termSlug={result.term_slug}
                    topicSlug={result.topic_slug}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
