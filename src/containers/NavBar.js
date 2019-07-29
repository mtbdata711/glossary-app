import React, { Component } from "react";

import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import ls from "local-storage";
import "./Navbar.css";
import Routes from "../Routes";

class NavBar extends Component {
  logoutUser = () => {
    ls.remove("currentUser");
    const location = `/`;

    this.props.history.push(location, { loggedout: true });
    // this.props.history.replace(location);
  };

  render() {
    return (
      <div className="App ">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/Home">
                <img
                  alt="Code your future logo"
                  src="http://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
                  style={{ width: 200 }}
                />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/Home">
                <NavItem>Home</NavItem>
              </LinkContainer>
              {ls.get("currentUser") ? null : (
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
              )}
              {ls.get("currentUser") ? null : (
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              )}
              {!ls.get("currentUser") ? null : (
                <LinkContainer to="/new">
                  <NavItem>Add Term</NavItem>
                </LinkContainer>
              )}
              {!ls.get("currentUser") ? null : (
                <LinkContainer to="/savedterms">
                  <NavItem>Saved Terms</NavItem>
                </LinkContainer>
              )}
              {!ls.get("currentUser") ? null : (
                <LinkContainer to="/myterms">
                  <NavItem>My Terms</NavItem>
                </LinkContainer>
              )}
              {!ls.get("currentUser") ? null : (
                <NavItem onClick={this.logoutUser}>Logout</NavItem>
              )}
              {ls.get("currentUser") ? null : (
                <NavItem href="https://codeyourfuture.io/about/">
                  About Us
                </NavItem>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes />
      </div>
    );
  }
}

export default withRouter(NavBar);
