import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";

import { Button, Modal } from "react-bootstrap";

import copyText from "../../../Utils/copyText";
import { useEffect } from "react";
import { axiosPrivate } from "../../../Utils/api/axios";

const EditPassword = ({ password, setPasswordChanges }) => {
  const [passwordInfo, setPasswordInfo] = useState({
    website: password.site_name,
    email: password.site_email,
    password: "",
  });

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

      if (decryptedPassword === "This DATA doesn't belong to you") {
        alert("This password has been removed");
        setShow(false);
        return setPasswordChanges(true);
      }
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

      switch (JSONmessage) {
        case "Session expired":
          alert("Your session has expired. Please login again.");
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "Error Authorizing":
          alert("You are not authorized to view this page. Please login.");
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "User has removed cookies":
          alert(
            "Have you removed your cookies?\nAuthorization failed, please login again."
          );
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "Is user hacked?":
          alert(
            `It looks like you or someone that has access to this account on other devices has clicked "Logout all devices" button. You can login again. \n\nOtherwise a hacker may have used your active session maliciously.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
          );
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "ERROR Decrypting Password":
          alert("Server error ~ Please try again");
          break;
        case "Authorization error":
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
        const { data } = await axiosPrivate.put(
          `/passwords/${password.password_id}`,
          passwordInfo
        );

        if (data === "This DATA doesn't belong to you") {
          alert("This password has been removed");
          return setPasswordChanges(true);
        }
        setPasswordChanges(true);
        setShow(false);
      }
    } catch (err) {
      const { data: JSONmessage } = err.response;

      switch (JSONmessage) {
        case "Error Authorizing":
        case "Session expired":
          alert("Your session has expired. Please login again.");
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "User has removed cookies":
          alert(
            "Have you removed your cookies?\nAuthorization failed, please login again."
          );
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "Is user hacked?":
          alert(
            `It looks like you or someone that has access to this account on other devices has clicked "Logout all devices" button. You can login again. \n\nOtherwise a hacker may have used your active session maliciously.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
          );
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "ERROR Decrypting Password":
          alert("Server error ~ Please try again");
          break;
        case "Authorization error":
        case "UPDATE password vault: SERVER SIDE ERROR":
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
          ? "btn btn-outline-primary text-primary bg-dark btn-sm px-3"
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
