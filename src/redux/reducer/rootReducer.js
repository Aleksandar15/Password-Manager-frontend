import { combineReducers } from "redux";

import verifyReducer from "./appReducers/verifyReducer";

import { searchBarReducer } from "./appReducers/searchBarReducer";

import { userInfoReducer } from "./userInfoReducer/userInfoReducer";
import { refreshTokenReducer } from "./authReducers/refreshTokenReducer";

export default combineReducers({
  verifyReducer,
  searchBarReducer,
  userInfoReducer,
  refreshTokenReducer,
});
