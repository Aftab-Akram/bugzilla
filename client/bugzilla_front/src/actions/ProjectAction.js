import {
  fetchProjects,
  createProject,
  showProject,
  editProject,
  deleteProject
} from "../api/project-api";
import { redirectEnable, redirectDisable } from "./VisualAction";
import { addError, removeError } from "./ErrorAction";
import { FETCH_PROJECT, CURRENT_PROJECT } from "./types";

const renderPost = data => {
  return {
    type: FETCH_PROJECT,
    data: data
  };
};

export const setcurrentProject = id => {
  return {
    type: CURRENT_PROJECT,
    data: id
  };
};

export const createProjectsData = project => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    createProject(project)
      .then(res => {
        dispatch(redirectEnable());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const fetchProjectsData = () => {
  return dispatch => {
    dispatch(removeError([]));

    fetchProjects()
      .then(res => {
        dispatch(renderPost(res.data));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const FetchProjectData = id => {
  return dispatch => {
    dispatch(removeError([]));
    showProject(id)
      .then(res => {
        dispatch(renderPost(res.data));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
export const UpdateProjectData = (id, project) => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    editProject(id, project)
      .then(res => {
        dispatch(redirectEnable());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
export const DeleteProjectData = id => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    deleteProject(id)
      .then(res => {
        dispatch(fetchProjectsData());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
