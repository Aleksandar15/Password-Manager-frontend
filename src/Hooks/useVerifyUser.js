import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import verifyActions from "../redux/actions/verifyActions";

function useVerifyUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);
  const { isUserAuthorized } = useSelector((state) => state.verifyReducer);
  console.log("isUserAuthorized INSIDE useVerifyUser: ", isUserAuthorized);
  useEffect(() => {
    console.log(
      "Does this run on Login/Register Inputs Changes?",
      isUserAuthorized
    );
    switch (isUserAuthorized) {
      case "Error Authorizing":
      case "Authorization error":
      case "LOGOUT_USER":
      case "Failed to fetch":
      case false:
        setIsAuthenticatedOrLoading(true);
        break;
      case true:
        navigate("/manager");
        break;
      default:
        dispatch(verifyActions());
        break;
    }
  }, [isUserAuthorized, navigate, dispatch]);
  return [isAuthenticatedOrLoading];
}
export default useVerifyUser;
