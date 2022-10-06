import { searchBarTypes } from "../action-types/actionTypes";

export const searchPassword = (searchField) => async (dispatch) => {
  dispatch({
    type: searchBarTypes.SEARCH_PASSWORD,
    payload: searchField,
  });
};
