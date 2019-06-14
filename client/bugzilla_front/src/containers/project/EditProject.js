import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { UpdateProjectData } from "../../actions/ProjectAction";
import { redirectDisable } from "../../actions/VisualAction";
import { Redirect } from "react-router-dom";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name
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
    this.props.updateProject(this.props.location.state.id, project);
  };

  render() {
    if (this.props.isRedirect) {
      this.props.flushRedirect()
      return <Redirect to="projects" />;
    }

    return (
      <div className="container">
        <div className="error">{this.props.errors}</div>
        <h2>User Detail</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Update" />
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
    updateProject: (id, project) => {
      dispatch(UpdateProjectData(id, project));
    },
    flushRedirect: () => {
      dispatch(redirectDisable());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProject);
