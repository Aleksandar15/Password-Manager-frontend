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
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Send user to the protected child component `Outlet`
    // which child has a default state of "Loading" component
    // & it also handles auth-logic on its own
    // & decides to either 'redirect' or to show the page.
    !data?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [data?.accessToken, refresh]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
