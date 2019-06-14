import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createBugData } from "../../actions/BugAction";

class CreateBug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "new_task",
      feature_type: "bug",
      screenshot: null,
      deadline: "1-1-2000",
      description: ""
    };
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handlefileChange = evt => {
    this.setState({ [evt.target.name]: evt.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const bug = new FormData();
    bug.append("bug[name]", this.state.name);
    bug.append("bug[status]", this.state.status);
    bug.append("bug[feature_type]", this.state.feature_type);
    bug.append("bug[project_id]", this.props.location.state.id);
    bug.append("bug[screenshot]", this.state.screenshot);
    bug.append("bug[description]", this.state.description);
    this.props.createBug(this.props.location.state.id, bug);
  };

  render() {
    if (this.props.isRedirect) {
      const location = {
        pathname: "/bugs",
        state: { id: this.props.location.state.id }
      };
      return <Redirect to={location} />;
    }
    return (
      <div className="container">
        <div className="error">{this.props.errors}</div>
        <h2>Feature Detail</h2>

        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label className="control-label col-sm-2" for="email">
              Title:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2" for="pwd">
              Description:
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                rows="5"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div class="form-group">
            <label className="control-label col-sm-2" for="email">
              Deadline:
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" for="pwd">
              Type:
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                name="feature_type"
                onChange={this.handleChange}
                value={this.state.feature_type}
              >
                <option value="feature">Feature</option>
                <option value="bug">Bug</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" for="pwd">
              Status:
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                name="status"
                onChange={this.handleChange}
                value={this.state.status}
              >
                <option value="new_task">New</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" for="pwd">
              Screenshot:
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                name="screenshot"
                onChange={this.handlefileChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </div>
          </div>
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
    createBug: (id, bug) => {
      dispatch(createBugData(id, bug));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBug);
