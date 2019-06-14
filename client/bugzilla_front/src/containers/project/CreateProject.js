import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { createProjectsData } from "../../actions/ProjectAction";
import { Redirect } from "react-router-dom";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let project = {
      name: this.state.name
    };
    this.props.createProject(project);
  };

  render() {
    if (this.props.isRedirect) {
      return <Redirect to="projects" />;
    }
    return (
      <div className="container">
        <div className="error">{this.props.errors}</div>
        <h2>Project Detail</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.error.data,
    isRedirect: state.auth.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => {
      dispatch(createProjectsData(project));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
