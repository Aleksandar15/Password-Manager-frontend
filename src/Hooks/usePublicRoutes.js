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
    switch (isUserAuthorized) {
      case "User is authorized":
        setIsAuthenticatedOrLoading(false);
        navigate("/manager");
        break;
      case "Expired refreshToken":
      case "Missing cookies":
      case "User has removed cookies":
      case "Is user hacked? - publicRoutesAuth":
      case "Successful logout":
      case "User not found by that refreshToken - logout":
      case "Missing cookies - logout":
        setIsAuthenticatedOrLoading(true);
        break;
      case "Loading":
        setIsAuthenticatedOrLoading(false);
        dispatch(verifyActions());
        break;
      default:
        setIsAuthenticatedOrLoading(false);
        dispatch(verifyActions());
        alert("Unexpected error happened, please refresh.");
        break;
    }
  }, [navigate, isUserAuthorized, dispatch]);

  return [isAuthenticatedOrLoading];
};

export default usePublicRoutes;
