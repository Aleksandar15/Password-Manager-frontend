import { searchBarTypes } from "../../action-types/actionTypes";

const initialState = {
  searchField: "",
};
export const searchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchBarTypes.SEARCH_PASSWORD:
      return {
        ...state,
        searchField: action.payload,
      };
    default:
      return state;
  }
};
