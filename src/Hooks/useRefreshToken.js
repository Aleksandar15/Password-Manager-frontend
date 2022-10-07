import { useDispatch } from "react-redux";
import { refreshHOOKAction } from "../redux/actions/refreshTokenActions";
import axios from "../Utils/api/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const { data } = await axios.get(`/auth/refresh`, {
      withCredentials: true,
    });

    dispatch(refreshHOOKAction(data.accessToken));

    return data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
