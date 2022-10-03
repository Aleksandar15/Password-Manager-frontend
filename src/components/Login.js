import { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux/";
import Loading from "./Loading/Loading";
import { searchPassword } from "../redux/actions/searchBarActions";
import { axiosPrivateBody } from "../Utils/api/axios";
import { loginTokenAction } from "../redux/actions/refreshTokenActions";
import usePublicRoutes from "../Hooks/usePublicRoutes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
    loginForever: false,
  });

  const { email, password, loginForever } = loginUser;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const toggleKeepMeLogged = (e) => {
    const { name, checked } = e.target;

    setLoginUser({ ...loginUser, [name]: checked });
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
        return dispatch(loginTokenAction(accessToken)); //NEVERMIND ITS CORRECT. this is wrong i cant be firing accessToken here~>Nevermind i Must do that as same as his `useAuth`.
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
            loginForever: false,
          });
        default:
          return alert("Unexpected error happened, please try again");
      }
    } catch (err) {
      console.log("Error inside Login component: ", err);
      alert("Unexpected error happened, please try again.");
    }
  };

  const [isAuthenticatedOrLoading] = usePublicRoutes();

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
                <label htmlFor="email" className="text-white">
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
                <label htmlFor="password" className="text-white ">
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
                <input
                  type="checkbox"
                  id="keepMeLogged"
                  onChange={toggleKeepMeLogged}
                  name="loginForever"
                  checked={loginForever}
                />
                <label
                  htmlFor="keepMeLogged"
                  className="text-danger ml-1 font-weight-bold"
                >
                  Keep me logged until I logout
                </label>
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
