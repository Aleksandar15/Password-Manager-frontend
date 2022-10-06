import { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux/";
import verifyActions from "../redux/actions/verifyActions";
import Loading from "./Loading/Loading";
import useVerifyUser from "../Hooks/useVerifyUser";
import { searchPassword } from "../redux/actions/searchBarActions";
import { useEffect } from "react";

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

    const response = await fetch("http://localhost:3003/auth/login", {
      // const response = await fetch(
      //   "https://password-manager.fly.dev/auth/login",
      //   {
      method: "POST",
      mode: "cors",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(loginUser),
    });
    const data = await response.json();
    switch (data) {
      case "Invalid Email":
        return alert("Invalid e-mail");
      case "Email/password combinations is wrong":
        return alert("Wrong e-mail/password combination");
      case "Missing Credentials":
        return alert("Fields can't be empty");
      case "Login SERVER SIDE Error!":
        return alert("Login error, please try again later");
      default:
        localStorage.setItem("token", data.token);
        navigate("/manager");
        dispatch(searchPassword(""));
        return dispatch(verifyActions());
    }
  };

  const [isAuthenticatedOrLoading] = useVerifyUser();

  return (
    <Fragment>
      {!isAuthenticatedOrLoading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
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
