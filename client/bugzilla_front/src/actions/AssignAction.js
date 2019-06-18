import { addError, removeError } from "./ErrorAction";
import {
  fetchProjectBugs,
  assignProjectBug,
  deleteProjectBug
} from "../api/assign_api";
import { ASSIGN_BUG, DEASSIGN_BUG } from "./types";
import { ChangeStatusData } from './BugAction';

export const renderAssign = data => {
  return {
    type: ASSIGN_BUG,
    data: data
  };
};
export const renderAvailBug = data => {
  return {
    type: DEASSIGN_BUG,
    data: data
  };
};

export const addBug = (id, bug_id) => {
  return dispatch => {
    dispatch(removeError([]));
    assignProjectBug(id, bug_id)
      .then(res => {
        dispatch(ChangeStatusData(id,bug_id, {status: 'started'}));
        dispatch(fetchProjectBugsData(id));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const removeBug = (id, bug_id) => {
  return dispatch => {
    dispatch(removeError([]));
    deleteProjectBug(id, bug_id)
      .then(res => {
        dispatch(fetchProjectBugsData(id));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const fetchProjectBugsData = id => {
  return dispatch => {
    dispatch(removeError([]));
    fetchProjectBugs(id)
      .then(res => {
        dispatch(renderAssign(res.data));
        dispatch(renderAvailBug(res.data));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
