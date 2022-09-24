import { userInfoTypes } from "../action-types/actionTypes";

export const showNameEmailAction = (nameAndEmail) => async (dispatch) => {
  try {
    dispatch({ type: userInfoTypes.NAME_AND_EMAIL, payload: nameAndEmail });
  } catch (err) {
    console.log("showNameEmail error: ", err);
    alert("Password Manager error ~ Please try again");
  }
};
