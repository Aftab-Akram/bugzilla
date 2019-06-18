import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../actions/VisualAction";
import { getMemberName} from '../api/auth-api'

const AppRoutes = props => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Bugzilla
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/sign-up">
              <span className="glyphicon glyphicon-user" /> Not {getMemberName()} ( Sign
              Up )
            </Link>
          </li>
          {props.isLoggedIn() || props.islogged_in ? (
            <li>
              <Link to="/logout">
                <span className="glyphicon glyphicon-log-out" /> Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <span className="glyphicon glyphicon-log-in" /> Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedIn: () => {
      if (localStorage.getItem("member")) {
        dispatch(login());
        return true;
      } else {
        return false;
      }
    }
  };
};

const mapStateToProps = state => {
  return {
    islogged_in: state.auth.logged_in
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoutes);
