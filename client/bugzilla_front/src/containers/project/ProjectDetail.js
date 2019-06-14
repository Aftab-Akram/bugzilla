import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchResource, removeResource } from "../../actions/ResourceAction";
import ResourceEditor from "../resource/ResourceEditor";

class ProjectDetail extends Component {
  componentDidMount() {
    this.props.getProjectResources(this.props.location.state.id);
  }

  show_bugs = () => {
    this.props.history.push({
      pathname: "/bugs",
      state: {
        id: this.props.location.state.id
      }
    });
  };

  remove_res = (id, res_id) => {
    this.props.removeProjectResources(id, res_id);
  };

  render() {
    const id = this.props.location.state.id;

    const no_qas_msge = <tr>There are no QA's for this project</tr>;
    const no_dev_msge = <tr>There are no Developers's for this project</tr>;
    const { developers, qas } = this.props;
    let developersList = developers.map(d => {
      return (
        <tr>
          <td>{d.name}</td>
          <td>
            <button onClick={() => this.remove_res(id, d.id)}> Remove</button>
          </td>
        </tr>
      );
    });
    let qasList = qas.map(d => {
      return (
        <tr>
          <td>{d.name}</td>
          <td>
            <button onClick={() => this.remove_res(id, d.id)}> Remove</button>
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <p>Bugs</p>
        <p><button onClick={this.show_bugs}> Show Bugs</button></p>
        <div className="alert alert-danger alert-dismissible">
          {this.props.errors}
        </div>
        <h4> Developers </h4>
        <table className="table">
          <tbody>
            {developersList.length === 0 && no_dev_msge}
            {developersList}
          </tbody>
        </table>
        <h4>Quality Assurance</h4>
        <table className="table">
          <tbody>
            {qasList.length === 0 && no_qas_msge}
            {qasList}
          </tbody>
        </table>

        <p />
        <p />
        <h3>More Resources</h3>
        <ResourceEditor project_id={id} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { developers, qas } = state.projects;
  return {
    developers: developers,
    qas: qas,
    errors: state.error.data
  };
};

const mapDispatchToProps = disptach => {
  return {
    getProjectResources: id => {
      disptach(fetchResource(id));
    },
    removeProjectResources: (project_id, res_id) => {
      disptach(removeResource(project_id, res_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
