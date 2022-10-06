const allActionTypes = {
  USER_IS_AUTHORIZED: "USER_IS_AUTHORIZED",
  USER_IS_NOT_AUTHORIZED: "USER_IS_NOT_AUTHORIZED",
  LOGOUT_USER: "LOGOUT_USER",
  LOGOUT_USER_ERROR: "LOGOUT_USER_ERROR",
  LOGOUT_USER_ALL_SESSIONS: "LOGOUT_USER_ALL_SESSIONS",
  LOGOUT_USER_ALL_SESSIONS_ERROR: "LOGOUT_USER_ALL_SESSIONS_ERROR",
  NEW_ACCESS_TOKEN: "ACCESS_TOKEN",
  ERROR_NEW_ACCESS_TOKEN: "ERROR_NEW_ACCESS_TOKEN",
  LOGIN_ACCESS_TOKEN: "LOGIN_ACCESS_TOKEN",
  REFRESH_HOOK_ACCESS_TOKEN: "REFRESH_HOOK_ACCESS_TOKEN",
};
export default allActionTypes;

export const searchBarTypes = {
  SEARCH_PASSWORD: "SEARCH_PASSWORD",
};

export const userInfoTypes = {
  NAME_AND_EMAIL: "NAME_AND_EMAIL",
};
