import { addError, removeError } from "./ErrorAction";
import {
  addProjectResource,
  deleteProjectResource,
  fetchProjectResources,
  fetchAvailResources
} from "../api/resource-api";
import { FETCH_RESOURCES, FETCH_AVAIL_RESOURCES } from "./types";

export const renderResource = data => {
  return {
    type: FETCH_RESOURCES,
    data: data
  };
};
export const renderAvailResource = data => {
  return {
    type: FETCH_AVAIL_RESOURCES,
    data: data
  };
};


export const addResource = (id, resource) => {
  return dispatch => {
    dispatch(removeError([]));
    addProjectResource(id, resource)
      .then(res => {
        dispatch(fetchResource(id));
        dispatch(fetchAvailableResource(id));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const removeResource = (id, res_id) => {
  return dispatch => {
    dispatch(removeError([]));
    deleteProjectResource(id, res_id)
      .then(res => {
        dispatch(fetchResource(id));
        dispatch(fetchAvailableResource(id));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const fetchResource = id => {
  return dispatch => {
    dispatch(removeError([]));
    fetchProjectResources(id)
      .then(res => {
        dispatch(renderResource(res.data))
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
export const fetchAvailableResource = id => {
  return dispatch => {
    dispatch(removeError([]));
    fetchAvailResources(id)
      .then(res => {
        dispatch(renderAvailResource(res.data));
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};
