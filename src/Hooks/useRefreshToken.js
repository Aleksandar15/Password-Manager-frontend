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
      ///refresh Error is not handled in here with the current setup
      //I might have to modify my codebase in the future
    }
  };
  return refresh;
};

export default useRefreshToken;
