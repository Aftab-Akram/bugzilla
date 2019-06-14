import { connect } from "react-redux";
import React, { Component } from "react";

import { fetchProjectsData } from "../../actions/ProjectAction";
import Project from "./Project";

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }
  create_project = () => {
    this.props.history.push({
        pathname: '/create_project'
      })
}

  render() {
    let postList = this.props.projects.map(project => {
      return (
        <Project
          key={project.id}
          name={project.name}
          id={project.id}
        />
      );
    });
    
    return <div className="container">
      <div className="alert alert-danger alert-dismissible">{this.props.errors}</div>
      <table className="table">
        <tbody>
          {postList}
        </tbody>
      </table>
    <button onClick = {this.create_project} > Create</button>
    </div>;
  }
}

const mapStateToProps = state => {
  const { data } = state.projects;
  return {
    projects: data,
    errors: state.error.data
  };
};

const mapDispatchToProps = disptach => {
  return {
    fetchProjects: () => {
      disptach(fetchProjectsData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);