import axios from 'axios';

export const Request = (baseURL, path, data,method,headers = {}) => {
  const config = {
      url: `${baseURL}${path}`,
      method: method,
      data: data,
      headers: headers
  }
  return axios(config);
}