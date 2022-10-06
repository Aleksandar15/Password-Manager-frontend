import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../Utils/api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const data = useSelector((state) => state.refreshTokenReducer);

  useEffect(() => {
    // If headers['Authorization'] is not set
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          console.log(
            "config.headers['Authorization'] REQUEST ~ INSIDE useAxiosPrivate: ",
            config.headers["Authorization"]
          );
          config.headers["Authorization"] = `Bearer ${data?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    //If headers['Authorziation'] is set = It's a retry
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [data?.accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
