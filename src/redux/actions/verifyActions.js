import axios, { axiosCredentials } from "../../Utils/api/axios";
import actionTypes from "../action-types/actionTypes";

const verifyActions = () => async (dispatch) => {
  try {
    const { data } = await axiosCredentials.get("/auth/is-user-verified");

    dispatch({ type: actionTypes.USER_IS_AUTHORIZED, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.USER_IS_NOT_AUTHORIZED,
      payload: err.response.data,
    });
  }
};

export default verifyActions;

export const logoutUserAction = () => async (dispatch) => {
  try {
    const { data } = await axios.delete("/auth/logout", {
      withCredentials: true,
    });
    dispatch({ type: actionTypes.LOGOUT_USER, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.LOGOUT_USER_ERROR,
      payload: err.response.data,
    });
  }
};

export const logoutUserAllSessionsAction = () => async (dispatch) => {
  try {
    const { data } = await axios.delete("/auth/logoutallsessions", {
      withCredentials: true,
    });
    dispatch({ type: actionTypes.LOGOUT_USER_ALL_SESSIONS, payload: data });
  } catch (err) {
    dispatch({
      type: actionTypes.LOGOUT_USER_ALL_SESSIONS_ERROR,
      payload: err.response.data,
    });
  }
};
