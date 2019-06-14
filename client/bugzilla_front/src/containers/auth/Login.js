import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { SignIn } from "../../actions/AuthAction";
import { Redirect } from "react-router-dom";
import { redirectDisable } from "../../actions/VisualAction";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  render() {
    if (this.props.isRedirect) {
      
        this.props.flushRedirect();
  
      return <Redirect to="projects" />;
    } else {
      return (
        <div className="container">
          <div className="error">{this.props.errors}</div>
          <h2>User Detail</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input type="submit" value="Login" />
          </form>
        </div>
      );
    }
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
    loginUser: user => {
      dispatch(SignIn(user));
    },
    flushRedirect: () => {
      dispatch(redirectDisable());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
