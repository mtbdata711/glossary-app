import React, { Component, Fragment } from "react";

class AddNewResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Resource: ["default"]
    };
  }

  addNew = e => {
    this.setState(prevState => ({
      Resource: [...prevState.Resource, "new"]
    }));
  };

  callback = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    let type;
    if(name.includes('name')){
      type = this.props.name
    }else{
      type = this.props.url
    }
    this.props.controlFunc(value, type, name);
  };

  ResourceContent = () => {
    return this.state.Resource.map((single, index) => {
      return (
        <Fragment key={index}>
          <div className="loginEmail">
          <label htmlFor="Resource">Resource Name</label>
            <input
              placeholder="Resource Name"
              type="text"
              name={`resource_name${index}`}
              noValidate
              onChange={this.callback}
            />
            
            <label htmlFor="Resource">Resource URL</label>
            <input
              placeholder="Resource URL"
              type="text"
              name={`resource_URL${index}`}
              noValidate
              onChange={this.callback}
            />
          </div>
        </Fragment>
      );
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.Resource === null ? null : this.ResourceContent()}
        <div onClick={this.addNew} className="plus">
          +
        </div>
      </Fragment>
    );
  }
}

export default AddNewResource;
