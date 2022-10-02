import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosCredentials } from "../Utils/api/axios";

const usePublicRoutes = () => {
  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosCredentials.get("/auth/is-user-verified");

        console.log(
          "~~~IMPORTANT2 LOG2: {data} INSIDE usePublicRoutes of useEffect: ",
          data
        );
        switch (data) {
          case "User is authorized":
            setIsAuthenticatedOrLoading(false);
            navigate("/manager");
            break;
          default:
            setIsAuthenticatedOrLoading(true);
            break;
        }
      } catch (err) {
        console.log(
          "error.response.data INSIDE usePublicRoutes: ",
          err.response.data
        );
        switch (err.response.data) {
          case "Expired refreshToken":
          case "Missing cookies":
            setIsAuthenticatedOrLoading(true);
            break;
          default:
            setIsAuthenticatedOrLoading(true);
            break;
        }
      }
    })();
  }, [navigate]);

  return [isAuthenticatedOrLoading];
};

export default usePublicRoutes;
