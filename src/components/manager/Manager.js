import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import InputPassword from "./passwordList/InputPassword";
import ListPasswords from "./passwordList/ListPasswords";

import { useDispatch } from "react-redux";
import { showNameEmailAction } from "../../redux/actions/userInfoActions";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Manager = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [passwordChanges, setPasswordChanges] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    //
    (async () => {
      console.log("signal INSIDE MANAGER ~~~~~~~~: ", signal); //aborted is always `false` i dont see the need of using it.
      try {
        const { data } = await axiosPrivate.get("/manager", {
          signal,
        });

        console.log("data INSIDE Manager.js: ", data, "; signal: ", signal);

        // isMounted &&
        setAllPasswords(data);
        setIsAuthenticatedOrLoading(true);
        const { user_name, user_email } = data[0];
        dispatch(showNameEmailAction({ user_name, user_email }));
      } catch (err) {
        const { data: JSONmessage } = err?.response;
        console.log("JSONmessage INSIDE Manager: ", JSONmessage);

        switch (JSONmessage) {
          case "Error Authorizing":
            setAllPasswords([]);
            setIsAuthenticatedOrLoading(false);
            alert("You are not authorized to view this page. Please login.");
            navigate("/login");
            break;
          case "Session expired":
            setAllPasswords([]);
            setIsAuthenticatedOrLoading(false);
            alert("Your session has expired. Please login again.");
            navigate("/login");
            break;
          case "Is user hacked?":
            setIsAuthenticatedOrLoading(false);
            alert(
              `It looks like you or someone that has access to this account on other devices has clicked "Logout all devices" button. You can login again. \n\nOtherwise a hacker may have used your active session maliciously.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
            );
            navigate("/login");
            setAllPasswords([]);
            break;
          case "User has removed cookies":
            alert(
              "Have you removed your cookies?\nAuthorization failed, please login again."
            );
            setAllPasswords([]);
            setIsAuthenticatedOrLoading(false);
            navigate("/login");
            break;
          case "Authorization error":
          case "passwordManager SERVER SIDE ERROR":
          default:
            setIsAuthenticatedOrLoading(false);
            setAllPasswords([]);
            alert("Unexpected error happened, please try again");
            navigate("/login");
            break;
        }
      }
    })(); // ending of IIFE

    setPasswordChanges(false);

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, [passwordChanges, dispatch, navigate, axiosPrivate]);

  return (
    <Fragment>
      {!isAuthenticatedOrLoading ? (
        <Loading />
      ) : (
        <div>
          <InputPassword setPasswordChanges={setPasswordChanges} />
          <ListPasswords
            allPasswords={allPasswords}
            setPasswordChanges={setPasswordChanges}
          />
        </div>
      )}
    </Fragment>
  );
};
export default Manager;
