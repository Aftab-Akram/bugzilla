import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { DeleteProjectData } from "../../actions/ProjectAction";
import { getMemberRole } from "../../api/auth-api";

class Project extends Component {
  update_project = () => {
    this.props.history.push({
      pathname: "/edit_project",
      state: {
        id: this.props.id,
        name: this.props.name
      }
    });
  };

  show_project = () => {
    this.props.history.push({
      pathname: "/show_project",
      state: {
        id: this.props.id
      }
    });
  }

  show_bugs = () => {
    this.props.history.push({
      pathname: "/bugs",
      state: {
        id: this.props.id
      }
    });
  };

  delete_project = () => {
    this.props.deleteProject(this.props.id);
  };

  render() {
    const { name } = this.props;
    return (
      <tr>
        <td>{name}</td>
        {getMemberRole() === "manager" && (
          <td>
            <button onClick={this.update_project}> Edit</button>
          </td>
        )}
        {getMemberRole() === "manager" && (
          <td>
            <button onClick={this.delete_project}> Delete</button>
          </td>
        )}

        <td>
          <button onClick={this.show_project}> Show Project</button>
        </td>

        <td>
          <button onClick={this.show_bugs}> Show Bugs</button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = disptach => {
  return {
    deleteProject: id => {
      disptach(DeleteProjectData(id));
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Project)
);
