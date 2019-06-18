import { addError, removeError } from "./ErrorAction";
import {
  login,
  logout,
  redirectEnable,
  redirectDisable,
  flushPost
} from "./VisualAction";
import {
  signIn,
  createToken,
  signUp,
  signOut,
  clearToken,
  createMemeberInfo
} from "../api/auth-api";

export const SignIn = auth => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    signIn(auth)
      .then(res => {
        createToken(res);
        createMemeberInfo(res);
        dispatch(login());
        dispatch(redirectEnable());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const LogOut = () => {
  return dispatch => {
    dispatch(redirectDisable());
    signOut()
      .then(res => {
        clearToken();
        dispatch(logout());
        dispatch(flushPost());
        dispatch(redirectEnable());
      })
      .catch(error => {
        clearToken();
        dispatch(logout());
        const res = error.response;
        dispatch(addError(res.data.errors));
      });
  };
};

export const SignUp = auth => {
  return dispatch => {
    dispatch(removeError([]));
    dispatch(redirectDisable());
    signUp(auth)
      .then(res => {
        dispatch(redirectEnable());
      })
      .catch(error => {
        const res = error.response;
        dispatch(addError(res.data.errors.full_messages));
      });
  };
};
