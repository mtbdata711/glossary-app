import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import ls from "local-storage";
import { withRouter } from "react-router-dom";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      status: null,
      confirmPassword: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        status: "",
        confirmPassword: ""
      }
    };
  }
  handleConfirmPassword = event => {
    if (event.target.value !== this.state.password) {
      this.setState({ confirmPassword: event.target.value });
    }
  };
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      // console.log(`
      //   --SUBMITTING--
      //   First Name: ${this.state.firstName}
      //   Last Name: ${this.state.lastName}
      //   Email: ${this.state.email}
      //   Password: ${this.state.password}
      //   Status:${this.state.status}
      //   Confirm Password:${this.state.confirmPassword}
      // `);
      const regObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.status
      };

      if (this.state.password !== this.state.confirmPassword) {
        alert("The passwords doesn't match");
        return false; // The form won't submit
      } else {
        return this.SubmitUserRegistration(regObj);
      }
    } else {
      alert("FORM INVALID ");
    }
    // The form will submit
  };

  SubmitUserRegistration = obj => {
    const url = `https://cyf-glossary-api.glitch.me/api/register`;
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
          ls.set("currentUser", response._id);
          this.handleRedirect();
        }
      });
  };

  handleRedirect = () => {
    const location = `/`;

    this.props.history.push(location);
    this.props.history.replace(location);
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "status":
        formErrors.status = value.length < 3 ? "enter student or mentor" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 className="signupTitle">Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="name"
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="name"
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="status">
              <label htmlFor="status">Are you a student or a mentor?</label>
              <input
                className={formErrors.status.length > 0 ? "error" : null}
                placeholder="Student Or Mentor"
                type="text"
                name="status"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.status.length > 0 && (
                <span className="errorMessage">{formErrors.status}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email:</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="confirmPassword">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="confirmPassword"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
              {/* {formErrors.confirmPassword.length > 0 && (
                            <span className="errorMessage">{formErrors.confirmPassword}</span>
                        )} */}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <Link id="haveaccount" to="/Login">
                Already Have an Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
