import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { addBug, removeBug } from "../../actions/AssignAction";
import { getMemberRole } from "../../api/auth-api";


class Bug extends Component {
  assign_bug = () => {
    this.props.assign_bug(this.props.id, this.props.bug_id);
  };

  delete_bug = () => {
    this.props.delete_bug(this.props.id, this.props.bug_id);
  };

  show_bug = () => {
    this.props.history.push({
      pathname: '/show_bug',
      state: {
        bug: this.props.bug,
        id: this.props.id,
        bug_id: this.props.bug_id
      }
    })
  }

  render() {
    const { name} = this.props.bug;
    
    const action = this.props.assign ? ( <td>
      <button onClick={this.assign_bug}> Assign</button>
    </td>) : (
        <td>
          <button onClick={this.delete_bug}> Delete</button>
        </td>)
      
    return (
      <tr>
        <td>{name}</td>
        {getMemberRole() === "developer" && action}
        <td>
          <button onClick={this.show_bug}> Show</button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = disptach => {
  return {
    delete_bug: (id, bug_id) => {
      disptach(removeBug(id,bug_id));
    },
    assign_bug: (id, bug_id) => {
        disptach(addBug(id,bug_id));
    } 
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Bug)
);
