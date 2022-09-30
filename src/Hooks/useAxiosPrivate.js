import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios, { axiosPrivate } from "../Utils/api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const data = useSelector((state) => state.refreshTokenReducer);

  useEffect(() => {
    // If headers['Authorization'] is not set
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // config.headers["Authorization"] = `Bearer ${auth?.accessToken}`; //I have to get/store this from Database.
          config.headers["Authorization"] = `Bearer ${data?.accessToken}`; //I have to get/store this from Database.
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
    // }, [refresh]); //why do i dont get warnings of missing `data` dependency?
  }, [data, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
