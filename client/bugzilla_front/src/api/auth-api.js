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

export const createMemeberInfo = res => {
  const {data} = res.data
  localStorage.setItem (
    'member_name', data.name
  );
  localStorage.setItem (
    'member_role', data.role
  );
}

export const getMemberRole = () =>  {
  return localStorage.getItem('member_role');
}
export const getMemberName = () => {
  return localStorage.getItem('member_name');
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem("member"));
};

export const clearToken = () => {
  localStorage.removeItem("member");
  localStorage.removeItem("member_role");
  return localStorage.removeItem("member_name");

};

export const isLoggedIn = () => {
  if (localStorage.getItem('member')) {
      return true;
  }
  else {
    return false;
  }
};