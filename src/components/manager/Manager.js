import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import InputPassword from "./passwordList/InputPassword";
import ListPasswords from "./passwordList/ListPasswords";

import { useDispatch } from "react-redux";
import { showNameEmailAction } from "../../redux/actions/userInfoActions";

const Manager = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [passwordChanges, setPasswordChanges] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3003/manager", {
          // const response = await fetch(
          //   "https://password-manager.fly.dev/manager",
          //   {
          method: "GET",
          mode: "cors",
          headers: {
            token: localStorage.token,
          },
        });

        const data = await response.json();

        switch (data) {
          case "Error Authorizing":
          case "Authorization error":
            setAllPasswords([]);
            localStorage.removeItem("token");
            setIsAuthenticatedOrLoading(false);
            alert("Your session has expired. Please login again.");
            navigate("/login");
            break;
          default:
            const { user_name, user_email } = data[0];

            dispatch(showNameEmailAction({ user_name, user_email }));
            setAllPasswords(data);
            setIsAuthenticatedOrLoading(true);
            break;
        }
      } catch (err) {
        alert("Password Manager error ~ Please try again");
        navigate(-1);
      }
    })(); // ending of IIFE

    setPasswordChanges(false);
  }, [passwordChanges, dispatch, navigate]);

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
