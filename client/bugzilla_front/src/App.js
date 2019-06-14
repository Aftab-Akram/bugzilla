import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"

import "./App.css";
import AppRoutes from './containers/Routes';

import Login from './containers/auth/Login';
import Logout from './containers/auth/Logout';
import Sign_up from './containers/auth/SignUp';

import projects from './containers/project/ProjectContainer';
import editproject from './containers/project/EditProject';
import createproject from './containers/project/CreateProject';
import ProjectDetail from './containers/project/ProjectDetail';

import bugs from './containers/bug/BugsContainer';
import create_bug from './containers/bug/CreateBug';
import show_bug from './containers/bug/BugDetail';

const App = () => {
  return (
    <Router>
    <div className="App">
      <AppRoutes />
      <Route exact path="/"  component= {Home} />
      <Route path="/create_project"  component= {createproject} />
      <Route path="/login"  component= {Login} />
      <Route path="/sign-up"  component= {Sign_up} />
      <Route path="/projects"  component= {projects} />
      <Route path="/logout"  component= {Logout} />
      <Route path="/edit_project"  component= {editproject} />
      <Route path="/show_project"  component= {ProjectDetail} />
      <Route path="/bugs"  component= {bugs} />
      <Route path="/create_bug"  component= {create_bug} />
      <Route path="/show_bug"  component= {show_bug} />

    </div>
    </Router>
  );
}

const Home = () => {
  return(
    
    <div className="container"><p>Welcome To Bugzilla</p></div>
  );
}

export default App;
