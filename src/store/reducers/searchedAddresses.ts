import { SET_SEARCHED_ADDRESSES } from "../constants";

const initialState = {
  searchedAddresses: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  if (type === SET_SEARCHED_ADDRESSES) {
    return { ...state, searchedAddresses: payload };
  }

  return state;
}
