import { combineReducers } from "redux";
import { SET_ACCESS, SET_USER } from "../actions/";
import ThemeOptions from './ThemeOptions';

const user = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const access = (state = [], action) => {
  switch (action.type) {
    case SET_ACCESS:
      return action.access;
    default:
      return state;
  }
};

const rootReducer = combineReducers({ user, access,ThemeOptions });
export default rootReducer;
