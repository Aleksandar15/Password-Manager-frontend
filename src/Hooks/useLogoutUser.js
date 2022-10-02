import { useDispatch } from "react-redux";
import { logoutUserAction } from "../redux/actions/verifyActions";
import axios from "../Utils/api/axios";

const useLogoutUser = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUserAction(""));
    try {
      // const { data } = await axios("/auth/logout", { withCredentials: true });
      const { data } = await axios.delete("/auth/logout", {
        withCredentials: true,
      });
      console.log("data INSIDE useLogout: ", data);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };
  return logout;
};
export default useLogoutUser;
