import { Request } from "./request";


const BASE_URL = process.env.REACT_APP_AUTH_API;


export const signUp = auth => {
  return Request(
    BASE_URL,
    "",
    auth,
    "post"
  );
};

export const signIn = auth => {
  return Request(
    BASE_URL,
    "/sign_in",
    auth,
    "post"
  );
};

export const signOut = () => {
  return Request(BASE_URL, "/sign_out",{}, "delete", getToken());
};

export const createToken = res => {
  localStorage.setItem(
    "member",
    JSON.stringify({
      "access-token": res.headers["access-token"],
      client: res.headers["client"],
      uid: res.data.data.uid,
      "token-type": "Bearer"
    })
  );
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("member"));
};

export const clearToken = () => {
  return localStorage.removeItem("member");
};

export const isLoggedIn = () => {
  if (localStorage.getItem('member')) {
      return true;
  }
  else {
    return false;
  }
};