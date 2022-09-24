import { userInfoTypes } from "../../action-types/actionTypes";

const initialState = {
  user_name: "Loading...",
  user_email: "Loading...",
  site_name: "",
  site_email: "",
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case userInfoTypes.NAME_AND_EMAIL:
      const { user_name, user_email } = action.payload;
      return {
        ...state,
        user_name,
        user_email,
      };
    default:
      return state;
  }
};
