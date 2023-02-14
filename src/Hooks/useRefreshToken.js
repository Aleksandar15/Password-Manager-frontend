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

      dispatch(refreshHOOKAction(data.accessToken));

      return data?.accessToken;
    } catch (err) {
      // refreshToken's Error is already handled in useAxiosPrivate hook
      // as for the current setup.
      // I might modify my codebase in the future (but it's just visual appeal)
    }
  };
  return refresh;
};

export default useRefreshToken;
