import allActionTypes from "../../action-types/actionTypes";

const initialState = {
  accessToken: "",
  statusCode: "",
  errorAcccessToken: "",
};

export const refreshTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case allActionTypes.NEW_ACCESS_TOKEN:
      console.log(
        "action inside refreshTokenReducer ~ NEW_REFRESH_TOKEN Type: ",
        action
      );
      return {
        ...state,
        accessToken: action.payload.accessToken,
        statusCode: action.payload.status,
      };
    case allActionTypes.ERROR_NEW_ACCESS_TOKEN:
      console.log(
        "action inside refreshTokenReducer ~ ERROR_NEW_REFRESH_TOKEN Type: ",
        action
      );
      return {
        ...state,
        errorAcccessToken: action.payload.data,
        statusCode: action.payload.status,
      };
    case allActionTypes.LOGIN_ACCESS_TOKEN:
      console.log(
        "action inside refreshTokenReducer ~ LOGIN_ACCESS_TOKEN Type: ",
        action
      );
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
