import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SignUp } from "../../actions/AuthAction";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: ""
    };
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      role: this.state.role
    };
    this.props.createUser(user);
  };

  render() {
    return (
      <div className="container">
        {this.props.isRedirect ? (
          <Redirect to="login" />
        ) : (
          <div className="container">
            <div className="error">{this.props.errors}</div>
            <h2>User Detail</h2>
            <form onSubmit={this.handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
              <br />
              <br />
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
              <br />
              <br />
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
              <br />
              <br />
              <label>Role</label>
              <select
                name="role"
                onChange={this.handleChange}
                value={this.state.role}
              >
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="qa">Quality Assurance</option>
              </select>
              <input type="submit" value="Sign Up" />
            </form>
          </div>
        )}
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
    createUser: user => {
      dispatch(SignUp(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
