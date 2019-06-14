import { ADD_ERROR,REMOVE_ERROR } from '../actions/types';
import { InitialState } from './InitialState';

export const ErrorReducer = (state = InitialState.error, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {...state, data: action.data};
    case REMOVE_ERROR:
      return {...state, data: action.data};
    default:
      return state;
  }
};