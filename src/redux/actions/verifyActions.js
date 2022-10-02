import axios, { axiosCredentials } from "../../Utils/api/axios";
import actionTypes from "../action-types/actionTypes";

const verifyActions = () => async (dispatch) => {
  try {
    const { data } = await axiosCredentials.get("/auth/is-user-verified");

    console.log("~~~ {data} INSIDE verifyActions: ", data);

    dispatch({ type: actionTypes.IS_USER_AUTHORIZED, payload: data });
  } catch (err) {
    console.log("verifyActions error: ", err.response.data);
    dispatch({ type: actionTypes.FAILED_TO_FETCH, payload: err.response.data });
  }
};

export default verifyActions;

export const logoutUserAction = () => async (dispatch) => {
  try {
    const { data } = await axios.delete("/auth/logout", {
      withCredentials: true,
    });
    console.log("~~~ {data} INSIDE logoutUserAction: ", data);
    dispatch({ type: actionTypes.LOGOUT_USER, payload: data });
  } catch (err) {
    console.log("logoutUserAction error: ", err);
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
    console.log("~~~ {data} INSIDE logoutUserAllSessionsAction: ", data);
    dispatch({ type: actionTypes.LOGOUT_USER_ALL_SESSIONS, payload: data });
  } catch (err) {
    console.log("logoutUserAllSessionsAction error: ", err);
    dispatch({
      type: actionTypes.LOGOUT_USER_ALL_SESSIONS_ERROR,
      payload: err.response.data,
    });
  }
};
