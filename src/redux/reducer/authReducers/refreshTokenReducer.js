import allActionTypes from "../../action-types/actionTypes";

const initialState = {
  accessToken: "",
  statusCode: "",
};

export const refreshTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case allActionTypes.NEW_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        statusCode: action.payload.status,
      };
    case allActionTypes.ERROR_NEW_ACCESS_TOKEN:
      return {
        ...state,
        statusCode: action.payload.status,
      };
    case allActionTypes.LOGIN_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case allActionTypes.REFRESH_HOOK_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
