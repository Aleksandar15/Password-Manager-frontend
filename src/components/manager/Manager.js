import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import InputPassword from "./passwordList/InputPassword";
import ListPasswords from "./passwordList/ListPasswords";

import { useDispatch } from "react-redux";
import { showNameEmailAction } from "../../redux/actions/userInfoActions";
// import axios from "../../Utils/api/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
// import PersistLogin from "../PersistLogin/PersistLogin";
// // import { axiosPrivate } from "../../Utils/api/axios";
// //
// import useRefreshToken from "../../Hooks/useRefreshToken";
// import { useSelector } from "react-redux";

const Manager = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [passwordChanges, setPasswordChanges] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuthenticatedOrLoading, setIsAuthenticatedOrLoading] =
    useState(false);

  const axiosPrivate = useAxiosPrivate();
  // const refresh = useRefreshToken();
  // const data = useSelector((state) => state.refreshTokenReducer);

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
            // alert(
            //   "It looks like someone used your active session maliciously.\nIf you are sure that wasn't you, please re-login and reset your password!"
            // );
            // NEW: LOGOUT EVERYWHERE ALso triggers such a case of 'isUserHacked'->so I must have an additional message.
            alert(
              // "It looks like someone used your active session maliciously.\nOr you have logged out all your active sessions?\nIf you are sure that wasn't you, please re-login and reset your password!"
              // "It looks like someone used your active session maliciously.\nOr you have logged out from everywhere?\nIf you are sure that wasn't you, please re-login and reset your password!"
              // "It looks like someone used your active session maliciously.\nOr you have clicked 'logout everywhere'?\nIf you are sure that wasn't you, please re-login and reset your password!"
              // `It looks like someone used your active session maliciously.\nOr you have clicked "logout everywhere" button?\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // `It looks like someone used your active session maliciously.\nOr you have clicked "logout everywhere" button.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // `It looks like someone used your active session maliciously.\nOr you have clicked "logout everywhere" button? Login again.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // `It looks like someone used your active session maliciously.\nOr you have clicked "logout everywhere" button? You can login again.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // FINAL:
              // // `It looks like someone used your active session maliciously.\nOr you have clicked "logout all devices" button? You can login again.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // // FINAL2: why was i dumb with `Or` instead `iF`:
              // `It looks like someone used your active session maliciously.\nIf you have clicked "logout all devices" button? You can login again.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // // Final2: error: it cant be `If`->Bcuz then i need `If someone`
              // // Final2: error: it cant be `If`->Bcuz then i need `If someone` && thats not precise i need `If someone that has access to this account`.
              // // Final2 error2: bcuz 'if u have clciked logout all devices'->MEANS he will be Logged out
              // // Final2 error2: bcuz 'if u have clciked logout all devices'->MEANS he will be Logged out && SO I must be precise in saying that `...u clicked button on other devices`.
              // FINAL3:
              `It looks like you or someone that has access to this account on other devices has clicked "Logout all devices" button. You can login again. \n\nOtherwise a hacker may have used your active session maliciously.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
              // BETTER WOULD BE:
              // BETTER WOULD BE:&& More ACCURATE!:
              // #2 `Or someone clicked "logout all devices"...` ++#3 `If you are sure that wasn't you or someone else who has access to this account`
              // #2 `Or someone clicked "logout all devices"...` ++#3 `If you are sure that wasn't you or someone else who has access to this account` //=>IN a WAY iF its a Password Manager that allows Family members to JOIN some1 might have clicked "LOGOUT ALL DEVICES"
              // #2 `Or someone clicked "logout all devices"...` ++#3 `If you are sure that wasn't you or someone else who has access to this account` //=>IN a WAY iF its a Password Manager that allows Family members to JOIN some1 might have clicked "LOGOUT ALL DEVICES" -> BUT its too much Empathy with Too LONG oF a MESSAGE
              // #2 `Or someone clicked "logout all devices"...` ++#3 `If you are sure that wasn't you or someone else who has access to this account` //=>IN a WAY iF its a Password Manager that allows Family members to JOIN some1 might have clicked "LOGOUT ALL DEVICES" -> BUT its too much Empathy with Too LONG oF a MESSAGE && I like iT the WAY iT iS: every \new sentence on a NEW LINE (& FULL-LINE for that matter).
              // #2 `Or someone clicked "logout all devices"...` ++#3 `If you are sure that wasn't you or someone else who has access to this account` //=>IN a WAY iF its a Password Manager that allows Family members to JOIN some1 might have clicked "LOGOUT ALL DEVICES" -> BUT its too much Empathy with Too LONG oF a MESSAGE && I like iT the WAY iT iS: every \new sentence on a NEW LINE (& FULL-LINE for that matter). && IF IM sure on Phone that alert is Start NeW LINES Then I Would make it even longer and More Precise.
              // I Will just leave it to `final` message:
              // I Will just leave it to `final` message: bcuz it says `iF u are sure u didnt do that
              // I Will just leave it to `final` message: bcuz it says `iF u are sure u didnt do that->MEANING LOGICALLY: ask uR Family Members that use uR Accounts iF they DiD iT(iT=clciked `logout all devices`)`.
            );
            navigate("/login");
            setAllPasswords([]);
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
