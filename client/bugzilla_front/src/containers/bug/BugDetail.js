import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {} from '../../actions/BugAction'
import { ChangeStatusData } from "../../actions/BugAction";


class Bug extends Component {
  change_status = () => {
    const {id, bug_id} = this.props.location.state;
    this.props.assign_bug(id, bug_id);
  };

  render() {
    const { name, deadline, image_url, status, feature_type, description } = this.props.location.state.bug;
    return (
        <div className = "container">
            <h3>Title : {name}</h3>
            <h5>status: {status}</h5>
            <h5>Type: {feature_type}</h5>
            <h4>description : {description ? description: 'Not Available'}</h4>
            <h4>Deadline: {deadline ? deadline: 'Not Available'}</h4>
            <div><h5>Screenshots</h5>
            <p><img src={image_url}  className="img-thumbnail" alt="Screenshots" width="304" height="236"/></p>
            <button onClick = {this.change_status} > Mark As Complete</button>
            </div>

        </div>
    );
  }
}

const mapDispatchToProps = disptach => {
  return {
    assign_bug: (id, bug_id) => {
        disptach(ChangeStatusData(id,bug_id,{"status": "completed"}));
    } 
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Bug)
);
