import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";
import { logoutUserAction } from "../../../redux/actions/verifyActions";

import { Button, Modal } from "react-bootstrap";

import copyText from "../../../Utils/copyText";
import { useEffect } from "react";
import axios, { axiosPrivate } from "../../../Utils/api/axios";

const EditPassword = ({ password, setPasswordChanges }) => {
  const [passwordInfo, setPasswordInfo] = useState({
    website: password.site_name,
    email: password.site_email,
    password: "",
  });

  console.log("password INSIDE EditPassword.js: ", password);
  useEffect(() => {
    // For multi-device smoothness of getting recent changes
    setPasswordInfo((prevState) => ({
      ...prevState,
      website: password.site_name,
      email: password.site_email,
    }));
  }, [password]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decryptPassword = async (id) => {
    try {
      const { data: decryptedPassword } = await axiosPrivate.post(
        `/manager/decryptpassword/${id}`
      );

      console.log(
        "decryptPassword INSIDE EditPassword.js: ",
        decryptedPassword
      );

      setPasswordInfo((prevState) => ({
        ...prevState,
        password: decryptedPassword,
      }));
      setTextToCopy(decryptedPassword);
      setShow(true);
      setShowHide({
        type: "password",
        button: "SHOW",
        btnColor: "btn btn-outline-danger text-danger bg-dark btn-sm",
      });
      setPasswordChanges(true);
    } catch (err) {
      const { data: JSONmessage } = err.response;
      console.log("JSONmessage INSIDE EditPassword: ", JSONmessage);

      switch (JSONmessage) {
        case "Authorization error":
        case "Error Authorizing":
        case "This DATA doesn't belong to you":
          alert("Your session has expired. Please login again.");
          navigate("/login");
          dispatch(logoutUserAction());
          dispatch(searchPassword(""));
          break;
        case "ERROR Decrypting Password":
          alert("Server error ~ Please try again");
          break;
        default:
          return alert("Unexpected error happened, please try again");
      }
    }
  };

  const updatePasswordInfo = async (e) => {
    e.preventDefault();
    try {
      setShowHide({
        type: "password",
        button: "SHOW",
        btnColor: "btn btn-outline-danger text-danger bg-dark btn-sm",
      });
      if (
        passwordInfo.website === "" ||
        passwordInfo.email === "" ||
        passwordInfo.password === ""
      ) {
        alert("Fields can't be empty");
      } else {
        console.log("passwordInfo: ", passwordInfo);

        const { data } = await axios.put(
          `/passwords/${password.password_id}`,
          JSON.stringify(passwordInfo),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
          }
        );

        console.log("data updatePasswordInfo INSIDE EditPassword.js: ", data);
        setPasswordChanges(true);
        setShow(false);
      }
    } catch (err) {
      console.log(
        "Error updatePasswordInfo inside EditPassword component: ",
        err
      );
      const { data: JSONmessage } = err.response;
      console.log("JSONmessage INSIDE Login: ", JSONmessage);

      switch (JSONmessage) {
        case "Authorization error":
        case "Error Authorizing":
        case "This DATA doesn't belong to you":
          alert("Your session has expired. Please login again.");
          navigate("/login");
          dispatch(logoutUserAction());
          dispatch(searchPassword(""));
          break;
        case "ERROR Decrypting Password":
          alert("Server error ~ Please try again");
          break;
        default:
          return alert("Unexpected error happened, please try again");
      }
    }
  };

  const [showHide, setShowHide] = useState({
    type: "password",
    button: "SHOW",
    btnColor: "btn btn-outline-danger text-danger bg-dark btn-sm",
  });
  const showHideSwitcher = () => {
    setShowHide({
      type: showHide.type === "password" ? "text" : "password",
      button: showHide.button === "SHOW" ? "HIDE" : "SHOW",
      btnColor:
        showHide.btnColor ===
        "btn btn-outline-danger text-danger bg-dark btn-sm"
          ? // ? "btn btn-outline-primary text-primary bg-dark btn-sm"
            "btn btn-outline-primary text-primary bg-dark btn-sm px-3"
          : "btn btn-outline-danger text-danger bg-dark btn-sm",
    });
  };

  const [textToCopy, setTextToCopy] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Fragment>
      {/* OPEN EDIT MODAL */}
      <Button
        type="button"
        className="btn btn-warning text-light"
        onClick={() => decryptPassword(password.password_id)}
      >
        View/Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        {/* <!-- Modal Header --> */}
        <Modal.Header closeButton={false}>
          <Modal.Title className="text-warning">EDIT PASSWORD INFO</Modal.Title>
        </Modal.Header>
        {/* <!-- Modal Body --> */}
        <Modal.Body>
          <form
            autoComplete="off"
            className="text-secondary font-weight-bold text-center mb-2"
          >
            <label htmlFor="website" className="mb-0">
              Website name:
            </label>
            <input
              onChange={(e) => {
                setPasswordInfo((prevObj) => ({
                  ...prevObj,
                  website: e.target.value,
                }));
              }}
              value={passwordInfo.website}
              className="form-control mb-3"
              type="text"
              placeholder="Edit your website here"
            />
            <label htmlFor="email" className="mb-0">
              E-mail or username:
            </label>
            <input
              onChange={(e) =>
                setPasswordInfo((prevObj) => ({
                  ...prevObj,
                  email: e.target.value,
                }))
              }
              value={passwordInfo.email}
              className="form-control mb-3 text-dark"
              type="text"
              placeholder="Edit your e-mail/username"
            />
            <label htmlFor="password" className="mb-0">
              Website password:
            </label>
            <div className="input-group">
              <input
                onChange={(e) => {
                  setPasswordInfo((prevObj) => ({
                    ...prevObj,
                    password: e.target.value,
                  }));
                  setTextToCopy(e.target.value);
                }}
                value={passwordInfo.password}
                className="form-control"
                type={showHide.type}
                placeholder="Edit your password here"
                aria-describedby="show-hide"
              />
              <div className="input-group-append">
                <button
                  onClick={() => showHideSwitcher()}
                  className={showHide.btnColor}
                  type="button"
                  id="show-hide"
                >
                  {showHide.button}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        {/* <!-- Modal footer --> */}
        <Modal.Footer>
          <Button
            className="btn btn-outline-primary my-2 my-sm-0 bg-light text-primary"
            onClick={() => copyText(textToCopy, "There is no password to copy")}
          >
            COPY
          </Button>
          <Button
            onClick={(e) => updatePasswordInfo(e)}
            type="button"
            className="btn btn-warning text-light"
          >
            EDIT
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setPasswordInfo((prevObj) => ({
                ...prevObj,
              }));
              setShowHide({
                type: "password",
                button: "SHOW",
                btnColor: "btn btn-outline-danger text-danger bg-dark btn-sm",
              });
              setShow(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditPassword;
