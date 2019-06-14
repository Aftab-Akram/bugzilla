import {
  FETCH_PROJECT,
  EDIT_PROJECT,
  FETCH_RESOURCES,
  CLEAR_STATE,
  FETCH_AVAIL_RESOURCES,
  ASSIGN_BUG,
  DEASSIGN_BUG,
  CURRENT_PROJECT
} from "../actions/types";
import { InitialState } from "./InitialState";

export const ProjectReducer = (state = InitialState.projects, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return { ...state, data: action.data };
    case EDIT_PROJECT:
      let update_state = state.data.map(
        obj => action.data.find(o => o.id === obj.id) || obj
      );
      return { ...state, data: update_state };
    case FETCH_RESOURCES:
      return {
        ...state,
        developers: action.data.developers,
        qas: action.data.qas
      };
    case CLEAR_STATE:
      return InitialState.projects;

    case FETCH_AVAIL_RESOURCES:
      return {
        ...state,
        unassign_developers: action.data.developers,
        unassign_qas: action.data.qas
      };
    case ASSIGN_BUG:
    return {
      ...state,
      assign_bugs: action.data.assign_bugs
    };
    case DEASSIGN_BUG:
      return {
        ...state,
        unassign_bugs: action.data.unassign_bugs
      }
    case CURRENT_PROJECT:
      return {
        ...state,
        current: action.data
      }

    default:
      return state;
  }
};
