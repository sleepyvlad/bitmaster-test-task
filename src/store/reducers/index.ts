import { combineReducers } from "redux";
import searchedAddresses from "./searchedAddresses";

const reducers = {
  searchedAddresses,
};

export default combineReducers(reducers);
