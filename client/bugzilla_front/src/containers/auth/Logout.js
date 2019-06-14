import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { LogOut } from "../../actions/AuthAction";
import { isLoggedIn } from "../../api/auth-api";
import { redirectDisable } from "../../actions/VisualAction";

const Logout = props => {
  let logout_action;
  if (isLoggedIn()) {
    logout_action = (
      <div className="container">
        <div className="error">{props.errors}</div>
        {props.logoutUser()}
      </div>
    );
  } else {
    logout_action = <Redirect to="/" />;
  }

  return props.isRedirect ? <Redirect to="/" /> : logout_action;
};

const mapStateToProps = state => {
  return {
    errors: state.error.data,
    isRedirect: state.auth.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(LogOut());
    },
    flushRedirect: () => {
      dispatch(redirectDisable());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
