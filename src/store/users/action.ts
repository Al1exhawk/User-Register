import { Action } from "redux";

export const ADD_USER = "ADD_USER";

export interface User {
  fullName: string;
  creationDate: Date;
}

export interface addUserAction extends Action {
  type: typeof ADD_USER;
  payload: User;
}

export const addUser = (user: User): addUserAction => ({
  type: ADD_USER,
  payload: user
});
