import allActionTypes from "../../action-types/actionTypes";

const initialState = {
  isUserAuthorized: "Loading",
};
const verifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case allActionTypes.IS_USER_AUTHORIZED:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.LOGOUT_USER:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    case allActionTypes.FAILED_TO_FETCH:
      return {
        ...state,
        isUserAuthorized: action.payload,
      };
    default:
      return state;
  }
};

export default verifyReducer;
