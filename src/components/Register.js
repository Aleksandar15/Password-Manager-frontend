import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import useVerifyUser from "../Hooks/useVerifyUser";
import verifyActions from "../redux/actions/verifyActions";
import Loading from "./Loading/Loading";

// const Register = ({ setAuth }) => {
const Register = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = newUser;

  const dispatch = useDispatch();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/auth/register", {
        // const response = await fetch(
        //   "https://password-manager.fly.dev/auth/register",
        //   {
        method: "POST",
        mode: "cors",
        headers: {
          accept: "application/json",
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(verifyActions());
      } else if (
        // if (
        data === "User by that E-MAIL already exist in our database!"
      ) {
        return alert("User is already registered!");
      } else if (data === "Invalid Email") {
        return alert("Invalid e-mail!");
        // } else {
      } else if (data === "Missing Credentials") {
        return alert("Fields can't be empty");
        // localStorage.setItem("token", data.token);
        // dispatch(verifyActions());
      }
    } catch (err) {
      alert("Password Manager error ~ Please try again");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
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
          <div>
            <h1 className="mt-4 text-light text-center mb-3">REGISTER</h1>
            <form>
              <div className="row">
                <div className="col">
                  <label htmlFor="password" className="text-light">
                    Enter your name:
                  </label>
                  <input
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={handleInputChange}
                    type="text"
                    id="name"
                    className="form-control mb-3"
                  />
                  <label htmlFor="email" className="text-light">
                    Enter your e-mail:
                  </label>
                  <input
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="e-mail"
                    type="email"
                    id="email"
                    className="form-control mb-3"
                  />
                  <label htmlFor="password" className="text-light">
                    Enter your password:
                  </label>
                  <input
                    value={password}
                    onChange={handleInputChange}
                    name="password"
                    placeholder="password"
                    type="password"
                    id="password"
                    className="form-control mb-4"
                  />
                  <button
                    onClick={(e) => registerUser(e)}
                    className="btn btn-success btn-block mb-4"
                    type="button"
                  >
                    REGISTER
                  </button>
                </div>
                <div className="col mt-1">
                  <p>
                    If you already have an account click below to <b>login</b>:
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-info btn-block my-3"
                    type="button"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Register;
