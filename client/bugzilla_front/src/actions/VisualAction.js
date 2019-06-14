import { LOGIN,LOGOUT, REDIRECTEN, REDIRECTDIS, CLEAR_STATE } from "./types";

export const login = () => {
  return {
    type: LOGIN
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const redirectEnable = () => {
  return {
    type: REDIRECTEN
  }
}
export const redirectDisable = () => {
  return {
    type: REDIRECTDIS
  }
}

export const flushPost = data => {
  return {
    type: CLEAR_STATE

  }
}