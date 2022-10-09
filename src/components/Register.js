import { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";
import useShowHideButton from "../Hooks/showHideInput/useShowHideInput";
import usePublicRoutes from "../Hooks/usePublicRoutes";
import axios from "../Utils/api/axios";
import Loading from "./Loading/Loading";

const Register = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = newUser;

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/auth/register",
        JSON.stringify(newUser),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      alert(`${data} You can login now.`);
      return navigate("/login");
    } catch (err) {
      const { data: JSONmessage } = err.response;

      switch (JSONmessage) {
        case "User by that E-MAIL already exist in our database!":
          return alert("User is already registered!");
        case "Invalid Email":
          return alert("Invalid e-mail!");
        case "Missing Credentials":
          return alert("Fields can't be empty");
        default:
          return alert("Unexpected error happened, please try again");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const [isAuthenticatedOrLoading] = usePublicRoutes();
  const { showHideButton, showHideButtonSwitch } = useShowHideButton();

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
                  <div className="input-group mb-4">
                    <input
                      value={password}
                      onChange={handleInputChange}
                      name="password"
                      placeholder="password"
                      type={showHideButton.inputType}
                      id="password"
                      className="form-control"
                    />
                    <div className="input-group-append">
                      <button
                        className={showHideButton.className}
                        type="button"
                        id="show-hide"
                        onClick={() => showHideButtonSwitch()}
                        style={showHideButton.btnStyle}
                      >
                        {showHideButton.text}
                      </button>
                    </div>
                  </div>

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
