import { SET_SEARCHED_ADDRESSES } from "../constants";

export const searchedAddresses = (value: string[]) => ({
  type: SET_SEARCHED_ADDRESSES,
  payload: {
    searchedAddresses: value,
  },
});
