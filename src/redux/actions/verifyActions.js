import actionTypes from "../action-types/actionTypes";

import api from "../api/rootApi";

const verifyActions = () => async (dispatch) => {
  try {
    const data = await api.isUserAuthorized();

    dispatch({ type: actionTypes.IS_USER_AUTHORIZED, payload: data });
  } catch (err) {
    console.log("verifyActions error: ", err.message);
    dispatch({ type: actionTypes.FAILED_TO_FETCH, payload: err.message });
  }
};

export default verifyActions;

export const logoutUserAction = (logout) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGOUT_USER, payload: logout });
  } catch (err) {
    console.log("logoutUser error: ", err);
    dispatch({ type: actionTypes.LOGOUT_USER, payload: err.message });
  }
};

export const logoutUserAllSessionsAction = (logout) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGOUT_USER_ALL_SESSIONS, payload: logout });
  } catch (err) {
    console.log("logoutUser error: ", err);
    dispatch({
      type: actionTypes.LOGOUT_USER_ALL_SESSIONS,
      payload: err.message,
    });
  }
};
