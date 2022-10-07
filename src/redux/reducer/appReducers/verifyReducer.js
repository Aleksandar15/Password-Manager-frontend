import allActionTypes from "../../action-types/actionTypes";

const initialState = {
  isUserAuthorized: "Loading",
};
const verifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case allActionTypes.USER_IS_AUTHORIZED:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.USER_IS_NOT_AUTHORIZED:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.LOGOUT_USER:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.LOGOUT_USER_ERROR:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.LOGOUT_USER_ALL_SESSIONS:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.LOGOUT_USER_ALL_SESSIONS_ERROR:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.USER_AUTH_ENDED:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    default:
      return state;
  }
};

export default verifyReducer;
