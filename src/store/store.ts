import { AnyAction, createStore, Store } from "redux";
import reducers from "./reducers";

export function configureStore(initialState = {}): Store<any, AnyAction> {
  return createStore(reducers, initialState);
}
