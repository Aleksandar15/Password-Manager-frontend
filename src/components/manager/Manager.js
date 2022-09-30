import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import InputPassword from "./passwordList/InputPassword";
import ListPasswords from "./passwordList/ListPasswords";

import { useDispatch } from "react-redux";
import { showNameEmailAction } from "../../redux/actions/userInfoActions";
import axios from "../../Utils/api/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Manager = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [passwordChanges, setPasswordChanges] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);

  //
  const axiosPrivate = useAxiosPrivate();
  //

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const { data } = await axiosPrivate.get("/manager", {
          signal,
          // withCredentials: true,
        });

        console.log("data INSIDE Manager.js: ", data, "; signal: ", signal);

        isMounted && setAllPasswords(data);
        setIsAuthenticatedOrLoading(true);
        const { user_name, user_email } = data[0];
        dispatch(showNameEmailAction({ user_name, user_email }));

        return () => {
          isMounted = false;
          controller.abort();
        };
      } catch (err) {
        const { data: JSONmessage } = err.response;
        console.log("JSONmessage INSIDE Manager: ", JSONmessage);

        switch (JSONmessage) {
          case "Error Authorizing":
            setAllPasswords([]);
            setIsAuthenticatedOrLoading(false);
            alert("Problem authorizing. Please login again.");
            navigate("/login");
            break;
          case "Authorization error":
            setAllPasswords([]);
            // localStorage.removeItem("token");
            setIsAuthenticatedOrLoading(false);
            alert("Your session has expired. Please login again.");
            navigate("/login");
            break;
          default:
            return alert("Unexpected error happened, please try again");
        }
      }
    })(); // ending of IIFE

    setPasswordChanges(false);
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
