import {
  createBug,
  deleteBug,
  fetchBugs,
  editBug,
  change_status
} from "../api/bug-api";
import { redirectEnable, redirectDisable } from "./VisualAction";
import { addError, removeError } from "./ErrorAction";
import { FETCH_BUG, CURRENT_PROJECT } from "./types";

const renderBug = data => {
  return {
    type: FETCH_BUG,
    data: data
  };
};

export const setcurrentProject = id => {
  return {
    type: CURRENT_PROJECT,
    data: id
  };
};

export const createBugData = (proj_id, bug) => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    createBug(proj_id, bug)
      .then(res => {
        dispatch(setcurrentProject(proj_id));
        dispatch(redirectEnable());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const fetchBugsData = proj_id => {
  return dispatch => {
    dispatch(removeError([]));

    fetchBugs()
      .then(res => {
        dispatch(renderBug(res.data));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const UpdateBugData = (proj_id, id, bug) => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    editBug(proj_id, id, bug)
      .then(res => {
        dispatch(redirectEnable());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const ChangeStatusData = (proj_id, id, status) => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    change_status(proj_id, id, status)
      .then(res => {
        dispatch(fetchBugsData());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const DeleteBugData = (proj_id, id) => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    deleteBug(proj_id, id)
      .then(res => {
        dispatch(fetchBugsData());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
