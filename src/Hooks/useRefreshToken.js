// import fetch from "../Utils/api/fetch"
// import { fetchRefreshToken } from "../Utils/api/fetch"
//
// import { fetch } from "../Utils/api/fetch";
//
// import { fetchData } from "../Utils/api/fetch";
//
// import url from "../Utils/api/fetch"; //works when its `export default URL`->bcuz URL is Object: otherwise NOT it has to be regular EXPORT oF Variable's VALUE
//
// import { url } from "../Utils/api/fetch"; //works
//
// import { fetchData } from "../Utils/api/fetch";

import { useDispatch } from "react-redux";
import { refreshHOOKAction } from "../redux/actions/refreshTokenActions";
//
import axios from "../Utils/api/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const { data } = await axios.get(`/auth/refresh`, {
        withCredentials: true,
      });
      console.log("~_~_~~_~data INSIDE useRefreshToken: ", data);

      dispatch(refreshHOOKAction(data.accessToken));

      return data?.accessToken;
    } catch (err) {
      console.log("useRefreshToken error: ", err);
    }
  };

  return refresh;
};

export default useRefreshToken;
