import { userInfoTypes } from "../action-types/actionTypes";

export const showNameEmailAction = (nameAndEmail) => async (dispatch) => {
  dispatch({ type: userInfoTypes.NAME_AND_EMAIL, payload: nameAndEmail });
};
