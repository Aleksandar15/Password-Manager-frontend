import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import verifyActions from "../redux/actions/verifyActions";

const usePublicRoutes = () => {
  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);
  const navigate = useNavigate();

  const { isUserAuthorized } = useSelector((state) => state.verifyReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        switch (isUserAuthorized) {
          case "User is authorized":
            setIsAuthenticatedOrLoading(false); //unnecessary, just for safety
            navigate("/manager");
            break;
          case "Expired refreshToken":
          case "Missing cookies":
          case "Successful logout":
          case "User not found by that refreshToken":
            setIsAuthenticatedOrLoading(true);
            break;
          case "Loading":
            dispatch(verifyActions());
            setIsAuthenticatedOrLoading(false); //unnecessary, just for extra safety
            break;
          default:
            setIsAuthenticatedOrLoading(true);
            break;
        }
      } catch (err) {
        console.log("error INSIDE usePublicRoutes: ", err);
      }
    })();
  }, [navigate, isUserAuthorized, dispatch]);

  return [isAuthenticatedOrLoading];
};

export default usePublicRoutes;
