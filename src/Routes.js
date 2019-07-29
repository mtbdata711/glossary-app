import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Search from "./containers/Search";
import SearchResults from "./containers/SearchResults";
import SingleTerm from "./containers/SingleTerm";
import AddNewTerm from "./containers/AddNewTerm";
import ls from "local-storage";
import { Fetcher } from "./containers/fetcher";
import SavedTerms from "./containers/SavedTerms";
import UserTerms from "./containers/UserTerms";
const fetcher = new Fetcher();

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    };
  }
  HandleUserLogin = obj => {
    const url = `https://cyf-glossary-api.glitch.me/api/login`;
    return fetch(url, {
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
          ls.set("currentUser", response.firstName);
          ls.set("currentUserId", response._id);
          this.HandleRedirect();
        }
      });
  };

  HandleRedirect = () => {
    const location = `/`;

    this.props.history.push(location, { loggedin: true });
  };

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Home" exact component={Home} />
        <Route
          path="/login"
          render={props => (
            <Login {...props} HandleCallback={this.HandleUserLogin} />
          )}
        />
        <Route path="/Signup" exact component={Signup} />
        <Route path="/Search" exact component={Search} />
        <Route path="/new" component={AddNewTerm} />
        <Route path="/search/:query" component={SearchResults} />
        <Route path="/savedterms" component={SavedTerms} />
        <Route path="/term/:query" component={SingleTerm} />
        <Route path="/myterms" component={UserTerms} />
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    );
  }
}
export default withRouter(Routes);
