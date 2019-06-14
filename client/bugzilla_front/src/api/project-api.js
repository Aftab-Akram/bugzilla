import { Request } from "./request";
import {getToken} from './auth-api'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createProject = project => {
  return Request(
    BASE_URL,
    "/projects",
    project,
    "post",
    getToken()
  );
};

export const fetchProjects = () => {
  return Request(
    BASE_URL,
    "/projects",
    {},
    "get",
    getToken()
  );
};

export const showProject = id => {
  return Request(
    BASE_URL,
    `/projects/${id}`,
    {},
    "get",
    getToken()
  );
};

export const deleteProject = id => {
  return Request(
    BASE_URL,
    `/projects/${id}`,
    {},
    "delete",
    getToken()
  );
};
export const editProject = (id, project) => {
  return Request(
    BASE_URL,
    `/projects/${id}`,
    project,
    "patch",
    getToken()
  );
};


