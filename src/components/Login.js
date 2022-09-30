import { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux/";
// import verifyActions from "../redux/actions/verifyActions";
import Loading from "./Loading/Loading";
import useVerifyUser from "../Hooks/useVerifyUser";
import { searchPassword } from "../redux/actions/searchBarActions";
import useRefreshToken from "../Hooks/useRefreshToken";
// import axios, { axiosPrivate, axiosPrivateBody } from "../Utils/api/axios";
import { axiosPrivateBody } from "../Utils/api/axios";
// import { loginActionToken } from "../redux/actions/refreshTokenActions";
import { loginTokenAction } from "../redux/actions/refreshTokenActions";
// import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginUser;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosPrivateBody(
        "post",
        "/auth/login",
        JSON.stringify(loginUser)
      );
      console.log("data INSIDE Login component: ", data);

      const accessToken = data?.accessToken;
      console.log("accessToken LOGIN: ", accessToken);

      if (accessToken) {
        navigate("/manager");
        dispatch(searchPassword(""));
        return dispatch(loginTokenAction(accessToken)); //NEVERMIND: that was bcuz oF My madeup `axiosPrivateBody` Function that has Axios.Create()` INSTEAD of Directly Calling AXIOS (which handles errors inside CATCH->NOW i have ERRORS All in DATA[and that looks bad, i dont want my DEFAULT case to be the SUCCESS, noR the Status Code is TOO MUCH, maybe STatus CODE iS OKAY:BUT whats NOT OKaY iS that i CANT use Boilerplate Axios Callers SAFELY Without a Price to PAY [as in this case i gotta handle errors myself, instead of all others than 200 to be passed to CATCH statement}.{but NEW IDEA: iF this `if(accessToken)`->WORKS===then I can have a case that checks `case accessToken:` oR even Optional Chaining} //Doesnt fix it, let me comment this out idk how it worked before it Warned me iF Email is INVALID EMAIL,etc.
      }
      switch (data) {
        case "Invalid Email":
          return alert("Invalid e-mail");
        case "Email/password combinations is wrong":
          return alert("Wrong e-mail/password combination");
        case "Missing Credentials":
          return alert("Fields can't be empty");
        case "Login SERVER SIDE Error!":
          return alert("Login error, please try again later");
        case "Detected used refresh token in user's cookies":
          alert(
            "Someone has made requests without your permission. \nIf that wasn't you please login again and reset your password!"
          );
          return setLoginUser({
            email: "",
            password: "",
          });
        default:
          return alert("Unexpected error happened, please try again");
      }
    } catch (err) {
      console.log("Error inside Login component: ", err);
      alert("Unexpected error happened, please try again.");
    }
  };

  const [isAuthenticatedOrLoading] = useVerifyUser();
  console.log("isAuthenticatedOrLoading: ", isAuthenticatedOrLoading);

  const refresh = useRefreshToken();
  return (
    <Fragment>
      {!isAuthenticatedOrLoading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          {/* <button onClick={() => refresh()}>REFRESH TOKEN</button> */}
          <button onClick={refresh}>REFRESH TOKEN</button>
          <h1 className="mt-4 text-center text-light mb-3">LOGIN</h1>
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="email" className="text-light">
                  Enter your e-mail:
                </label>
                <input
                  onChange={handleInputChange}
                  value={email}
                  name="email"
                  type="email"
                  placeholder="e-mail"
                  id="email"
                  className="form-control mb-3"
                />
                <label htmlFor="password" className="text-light ">
                  Enter your password:
                </label>
                <input
                  onChange={handleInputChange}
                  value={password}
                  name="password"
                  type="password"
                  placeholder="password"
                  id="password"
                  className="form-control mb-4"
                  required
                />
                <button
                  className="btn btn-success btn-block mb-4"
                  onClick={(e) => submitLogin(e)}
                >
                  LOGIN
                </button>
              </div>
              <div className="col mt-1">
                <p>
                  If you don't have an account click below to <b>register</b>:
                </p>
                <button
                  className="btn btn-block btn-info my-3"
                  onClick={() => navigate("/register")}
                  type="button"
                >
                  REGISTER
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Login;
