import { connect } from "react-redux";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { fetchProjectBugsData } from "../../actions/AssignAction";
import Bug from "./Bugs";

import { redirectDisable } from "../../actions/VisualAction";

class BugList extends Component {
  componentDidMount() {
    this.props.fetchProjectsBugs(this.props.location.state.id  );
  }
  create_bug = () => {
    this.props.history.push({
        pathname: '/create_bug',
        state: {
          id: this.props.location.state.id 
        }
      })
}

  render() {
    if(this.props.location.state=== undefined) {
      return <Redirect to="projects" />    }
    
    const id =  this.props.location.state.id ;
    let assignList = this.props.assign_bugs.map(bug => {
      return (
        <Bug
          key={bug.id}
          id={id}
          bug_id={bug.id}
          bug={bug}
        />
      );
    });
    let unassignList = this.props.unassign_bugs.map(bug => {
        return (
          <Bug
          key={bug.id}
          id={id}
          bug_id={bug.id}
          bug={bug}
        />
        );
      });
    
    return <div className="container">
      <div className="alert alert-danger alert-dismissible">{this.props.errors}</div>
      <h1>Assign Bugs</h1>
      <table className="table">
        <tbody>
          {assignList}
        </tbody>
      </table>
      <h1>Unassign Bugs</h1>
      <table className="table">
        <tbody>
          {unassignList}
        </tbody>
      </table>

    <button onClick = {this.create_bug} > Create</button>
    </div>;
  }
}

const mapStateToProps = state => {
  const { assign_bugs,
    unassign_bugs} = state.projects;
  return {
    assign_bugs: assign_bugs,
    unassign_bugs: unassign_bugs,
    errors: state.error.data,
    isRedirect: state.auth.redirect
  };
};

const mapDispatchToProps = disptach => {
  return {
    fetchProjectsBugs: id => {
      disptach(fetchProjectBugsData(id));
    },
    flushRedirect: () => {
      disptach(redirectDisable());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BugList);