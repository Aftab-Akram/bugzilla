import { Request } from "./request";
import {getToken} from './auth-api'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createBug = (proj_id, bug) => {
  return Request(
    BASE_URL,
    `/projects/${proj_id}/bugs`,
    bug,
    "post",
    getToken()
  );
};

export const fetchBugs = proj_id => {
  return Request(
    BASE_URL,
    `/projects/${proj_id}/bugs`,
    {},
    "get",
    getToken()
  );
};

export const showBug = (proj_id, id) => {
  return Request(
    BASE_URL,
    `/projects/${proj_id}/bugs/${id}`,
    {},
    "get",
    getToken()
  );
};

export const deleteBug = (proj_id, id) => {
  return Request(
    BASE_URL,
    `/projects/${proj_id}/bugs/${id}`,
    {},
    "delete",
    getToken()
  );
};
export const editBug = (proj_id,id, bug) => {
  return Request(
    BASE_URL,
    `/projects/${proj_id}/bugs/${id}`,
    bug,
    "patch",
    getToken()
  );
};

export const change_status = (proj_id,id, status) => {
    return Request(
      BASE_URL,
      `/projects/${proj_id}/bugs/${id}/change_status`,
      status,
      "patch",
      getToken()
    );
  };



