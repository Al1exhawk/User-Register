import { createStore, combineReducers, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userState, userReducer, addUserAction } from "./users";

export type GenericState = {
  usersState: userState;
};

export const GenericReducer: Reducer<
  GenericState,
  addUserAction
> = combineReducers({
  usersState: userReducer
});

export const store = createStore(GenericReducer, composeWithDevTools());

export * from "./users";
