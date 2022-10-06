import { useDispatch } from "react-redux";
import { logoutUserAllSessionsAction } from "../redux/actions/verifyActions";
import axios from "../Utils/api/axios";

const useLogoutUserAllSessions = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUserAllSessionsAction(""));
    try {
      const { data } = await axios.delete("/auth/logoutallsessions", {
        withCredentials: true,
      });
      console.log("data INSIDE useLogoutUserAllSessions: ", data);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };
  return logout;
};
export default useLogoutUserAllSessions;
