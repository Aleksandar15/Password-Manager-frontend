import { searchBarTypes } from "../action-types/actionTypes";

export const searchPassword = (searchField) => async (dispatch) => {
  try {
    dispatch({
      type: searchBarTypes.SEARCH_PASSWORD,
      payload: searchField,
    });
  } catch (err) {
    console.log("searchPassword error: ", err);
    alert("Password Manager search error ~ Please try again");
  }
};
