import React, { Component, Fragment } from "react";
import AddNewResource from "./AddNewResource";
import AddNewRelated from "./AddNewRelated";
import SingleInput from "./SingleInput";
import SingleTextArea from "./SingleTextArea";
import GeneratedLink from "./GeneratedLink";
import GeneratedError from "./GeneratedError";
import "./AddNewTerm.css";
import ls from "local-storage";

class AddNewTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      generatedLink: null,
      generateError: false
    };
    this.handleSingle = this.handleSingle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = this.state.formData;
    const reqBody = {
      term: formData.term,
      definition: formData.definition,
      topic: formData.topic,
      resources_url: Object.values(formData.resourcesURL),
      resources: Object.values(formData.resources),
      related_terms: Object.values(formData.related),
      term_slug: this.createSlug(formData.term),
      topic_slug: this.createSlug(formData.topic),
      user: ls.get("currentUserId"),
      user_name: ls.get("currentUser")
    };
    console.log(reqBody);
    this.sendFetch(reqBody);
    // this.inputRef.scrollIntoView(true , {behavior: "smooth"})
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  // generateDataStructure = (single, label) => {
  //   const obj =  [{
  //     field: label,
  //     user: 'Default User',
  //     timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
  //     value: single
  //   }]
  //
  //   console.log(obj)
  //
  // }

  sendFetch(obj) {
    return fetch("https://cyf-glossary-api.glitch.me/api/addterm", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        // console.log(response);
        // this.setState({
        //   generatedLink: [response.topic_slug, response.term_slug]
        // });
        if (response._id) {
          this.setState({
            generatedLink: [
              response.topic_slug,
              response.term_slug,
              response.term
            ]
          });
        } else {
          this.setState({
            generateError: true
          });
        }
      });
  }

  createSlug = input => {
    const output = input.toLowerCase();
    return output.replace(/\W/g, "");
  };

  handleSingle = (value, name) => {
    this.setState(prevState => ({
      formData: {
        // object that we want to update
        ...prevState.formData, // keep all other key-value pairs
        [name]: value // update the value of specific key
      }
    }));
  };

  handleMultiple = (value, name, index) => {
    this.setState(prevState => ({
      formData: {
        // object that we want to update
        ...prevState.formData, // keep all other key-value pairs
        [name]: { ...prevState.formData[name], [index]: value }
      }
    }));
  };

  render() {
    return (
      <div>
        <div className="results-container-column justify-content-center">
          {this.state.generatedLink === null ? null : (
            <GeneratedLink
              topic={this.state.generatedLink[0]}
              term={this.state.generatedLink[1]}
              topicName={this.state.generatedLink[2]}
            />
          )}
          {this.state.generateError === false ? null : <GeneratedError />}

          <form onSubmit={this.handleSubmit} id="addNew">
            <h1 className="add-new-heading">Add New Term</h1>
            <div className="add-new-wrapper">
              <SingleInput
                label="Term"
                placeholder="Term"
                type="text"
                name="term"
                controlFunc={this.handleSingle}
              />
              <SingleTextArea
                name="definition"
                label="Definition"
                controlFunc={this.handleSingle}
              />
              <SingleInput
                label="Topic"
                placeholder="Topic"
                type="text"
                name="topic"
                controlFunc={this.handleSingle}
              />
              <AddNewResource
                controlFunc={this.handleMultiple}
                url="resourcesURL"
                name="resources"
              />
              <AddNewRelated controlFunc={this.handleMultiple} name="related" />
              <button
                type="submit"
                form="addNew"
                value="Submit"
                className="submit-new"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddNewTerm;
