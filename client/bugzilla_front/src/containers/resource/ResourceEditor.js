import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchAvailableResource, addResource } from "../../actions/ResourceAction";

class ResourceEditor extends Component {
  componentDidMount() {
    this.props.getResources(this.props.project_id);
  }

  add_res = (id, res_id) => {
    this.props.addProjectResources(id, res_id);
  };

  //   show_res = () => {

  //   }

  render() {
    const no_qas_msge = <tr>There are no QA's Available</tr>;
    const no_dev_msge = <tr>There are no Developers's Available</tr>;
    const { developers, qas, project_id } = this.props;
    let developersList = developers.map(d => {
      return (
        <tr>
          <td>{d.name}</td>
          <td>
            <button onClick={() => this.add_res(project_id, { id: d.id })}>
              {" "}
              Add
            </button>
          </td>
          {/* <td>
          <button onClick={this.show_res}> Show</button>
        </td> */}
        </tr>
      );
    });
    let qasList = qas.map(d => {
      return (
        <tr>
          <td>{d.name}</td>
          <td>
            <button onClick={() => this.add_res(project_id, { id: d.id })}>
              {" "}
              Add
            </button>
          </td>
          {/* <td>
          <button onClick={this.show_project}> Show</button>
        </td> */}
        </tr>
      );
    });
    return (
      <div >
        <h4> Available Developers </h4>
        <table className="table">
          <tbody>
            {developersList.length === 0 && no_dev_msge}
            {developersList}
          </tbody>
        </table>
        <h4> Available Quality Assurance</h4>
        <table className="table">
          <tbody>
            {qasList.length === 0 && no_qas_msge}
            {qasList}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { unassign_developers, unassign_qas } = state.projects;
  return {
    developers: unassign_developers,
    qas: unassign_qas,
    errors: state.error.data
  };
};

const mapDispatchToProps = disptach => {
  return {
    getResources: id => {
      disptach(fetchAvailableResource(id));
    },
    addProjectResources: (id, res_id) => {
      disptach(addResource(id, res_id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceEditor);
