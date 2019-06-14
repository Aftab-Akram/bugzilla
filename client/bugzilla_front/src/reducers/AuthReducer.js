import { LOGIN, LOGOUT, REDIRECTDIS, REDIRECTEN } from '../actions/types';
import { InitialState } from './InitialState';

export const AuthReducer = (state = InitialState.auth, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, logged_in: true};
    case LOGOUT:
      return {...state, logged_in: false};
    case REDIRECTEN:
      return {...state, redirect: true }
    case REDIRECTDIS:
      return {...state, redirect: false }
    default:
      return state;
  }
};