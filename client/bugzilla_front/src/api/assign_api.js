import { Request } from "./request";
import {getToken} from './auth-api'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const RESOURCE_URL = `/projects`


export const fetchProjectBugs = id => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/all_bugs`,
      {},
      "get",
      getToken()
    );
  };

export const assignProjectBug = (id, bug_id) => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/bugs/${bug_id}/assign_resolver`,
      {},
      "post",
      getToken()
    );
  };

export const deleteProjectBug = (id, bug_id) => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/bugs/${bug_id}/remove_resolver`,
      {},
      "delete",
      getToken()
    );
  };