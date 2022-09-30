import actionType from "../action-types/actionTypes";

import axios from "../../Utils/api/axios";

export const refreshAction = () => async (dispatch) => {
  try {
    const data = await axios.get(`/auth/refresh`, {
      withCredentials: true,
    });
    console.log("data INSIDE refreshTokenActions: ", data);
    dispatch({ type: actionType.NEW_ACCESS_TOKEN, payload: data });
  } catch (err) {
    const data = err.response;
    console.log("Error DATA inside rfershTokenAction: ", data);
    dispatch({
      type: actionType.ERROR_NEW_ACCESS_TOKEN,
      payload: data,
    });
  }
};

export const loginTokenAction = (accessToken) => async (dispatch) => {
  try {
    console.log(
      "accessToken INSIDE refreshTokenActions of loginTokenAction: ",
      accessToken
    );
    dispatch({ type: actionType.LOGIN_ACCESS_TOKEN, payload: accessToken });
  } catch (err) {
    console.log("Error of loginActionToken INSIDE refreshTokenActions: ", err);
  }
};
