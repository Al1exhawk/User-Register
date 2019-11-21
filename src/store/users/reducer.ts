import { Reducer } from "redux";
import { addUserAction, User, ADD_USER } from "./action";

export interface userState {
  users: ReadonlyArray<User>;
}

const initialState: userState = {
  users: []
};

export const userReducer: Reducer<userState, addUserAction> = (
  state = initialState,
  action: addUserAction
): userState => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    }
    default: {
      return state;
    }
  }
};
