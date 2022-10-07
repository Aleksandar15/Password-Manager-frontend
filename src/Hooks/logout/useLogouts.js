import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../redux/actions/searchBarActions";
import verifyActions, {
  logoutUserAction,
  logoutUserAllSessionsAction,
} from "../../redux/actions/verifyActions";

const useLogouts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUserAuthorized } = useSelector((state) => state.verifyReducer);
  const logoutAllSessions = async () => {
    dispatch(searchPassword(""));
    dispatch(logoutUserAllSessionsAction());
  };
  const logout = async () => {
    dispatch(searchPassword(""));
    dispatch(logoutUserAction());
  };

  useEffect(() => {
    switch (isUserAuthorized) {
      case "Successful logout":
      case "User not found by that refreshToken - logout":
      case "Missing cookies - logout":
        navigate("/");
        dispatch(verifyActions());
        break;
      case "Error logout":
        alert("Unexpected error happened, please refresh or try again.");
        dispatch(verifyActions());
        break;
      default:
        //do nothing
        break;
    }
  }, [isUserAuthorized, navigate, dispatch]);

  return { logoutAllSessions, logout };
};

export default useLogouts;
