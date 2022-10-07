import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../Hooks/useRefreshToken";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const data = useSelector((state) => state.refreshTokenReducer);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        // catch (err) {
        //   console.log("Error INSIDE PersistLogin: ", err);
        // }
      } finally {
        // setIsLoading(false);
        isMounted && setIsLoading(false);
      }
    };

    !data?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [data?.accessToken, refresh]);

  useEffect(() => {
    console.log(`isLoading INSIDE PersistLogin: ${isLoading},
    accessToken: ${JSON.stringify(data?.accessToken)}`);
  }, [isLoading, data?.accessToken]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
