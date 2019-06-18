import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { ChangeStatusData } from "../../actions/BugAction";
import { getMemberRole } from "../../api/auth-api";

class Bug extends Component {
  change_status = () => {
    const { id, bug_id } = this.props.location.state;
    const { feature_type } = this.props.location.state.bug;
    let status = { status: "completed" };
    if (feature_type === "bug") {
      status = { ...status, status: "resolved" };
    }

    this.props.change_status(id, bug_id, status);
  };

  render() {
    const {
      name,
      deadline,
      image_url,
      status,
      feature_type,
      description
    } = this.props.location.state.bug;
    return (
      <div className="container">
        <div className="alert alert-danger alert-dismissible">
          {this.props.errors}
        </div>
        <h3>Title : {name}</h3>
        <h5>status: {status}</h5>
        <h5>Type: {feature_type}</h5>
        <h4>description : {description ? description : "Not Available"}</h4>
        <h4>Deadline: {deadline ? deadline : "Not Available"}</h4>
        <div>
          <h5>Screenshots</h5>
          <p>
            <img
              src={image_url}
              className="img-thumbnail"
              alt="Screenshots"
              width="304"
              height="236"
            />
          </p>
          {getMemberRole() === "developer" && (
            <button onClick={this.change_status}>
              {" "}
              Mark As {feature_type === "bug" ? "Resolved" : "Complete"}
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.error.data
  };
};

const mapDispatchToProps = disptach => {
  return {
    change_status: (id, bug_id, status) => {
      disptach(ChangeStatusData(id, bug_id, status));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bug)
);
