import { ADD_ERROR, REMOVE_ERROR } from "./types";

export const addError = error => {
  return {
    type: ADD_ERROR,
    data: error
  };
};

export const removeError = error => {
  return {
    type: REMOVE_ERROR,
    data: error
  };
};