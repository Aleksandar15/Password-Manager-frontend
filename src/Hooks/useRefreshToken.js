import { useDispatch } from "react-redux";
import { refreshHOOKAction } from "../redux/actions/refreshTokenActions";
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
