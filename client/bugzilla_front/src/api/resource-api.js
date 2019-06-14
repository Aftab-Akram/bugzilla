import { Request } from "./request";
import {getToken} from './auth-api'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const RESOURCE_URL = `/projects`


export const fetchProjectResources = id => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/resources`,
      {},
      "get",
      getToken()
    );
  };
export const fetchAvailResources = id => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/all_resource`,
      {},
      "get",
      getToken()
    );
  };

export const addProjectResource = (id, resource) => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/resources`,
      resource,
      "post",
      getToken()
    );
  };

export const deleteProjectResource = (id, resource_id) => {
    return Request(
      BASE_URL,
      `${RESOURCE_URL}/${id}/resources/${resource_id}`,
      {},
      "delete",
      getToken()
    );
  };