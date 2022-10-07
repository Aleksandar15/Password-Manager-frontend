import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";

import { Button, Modal } from "react-bootstrap";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const InputPassword = ({ setPasswordChanges }) => {
  const [passwordInfo, setPasswordInfo] = useState({
    website: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (
        passwordInfo.website === "" ||
        passwordInfo.email === "" ||
        passwordInfo.password === ""
      ) {
        setShow(true);
        return alert("Fields can't be empty");
      } else {
        // const { data } = await axiosPrivate.post("/passwords", passwordInfo);
        await axiosPrivate.post("/passwords", passwordInfo);

        setPasswordChanges(true);
        setPasswordInfo({
          website: "",
          email: "",
          password: "",
        });
        setShow(false);
      }
    } catch (err) {
      const { data: JSONmessage } = err?.response;

      switch (JSONmessage) {
        case "Error Authorizing":
          alert("You are not authorized to view this page. Please login.");
          navigate("/login");
          dispatch(searchPassword(""));
          break;
        case "Session expired":
          alert("Your session has expired. Please login again.");
          navigate("/login");
          dispatch(searchPassword(""));
          break;
        case "Is user hacked?":
          alert(
            `It looks like you or someone that has access to this account on other devices has clicked "Logout all devices" button. You can login again. \n\nOtherwise a hacker may have used your active session maliciously.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
          );
          navigate("/login");
          dispatch(searchPassword(""));
          break;
        case "User has removed cookies":
          alert(
            "Have you removed your cookies?\nAuthorization failed, please login again."
          );
          navigate("/login");
          dispatch(searchPassword(""));
          break;
        case "Authorization error":
        case "addPassword SERVER SIDE ERROR":
        default:
          alert("Unexpected error happened, please try again");
          navigate("/login");
          dispatch(searchPassword(""));
          break;
      }
    }
  };

  const [showHideButton, setShowHide] = useState({
    className: "btn bg-light text-danger btn-sm",
    text: "SHOW",
    type: "password",
  });
  const showHideButtonSwitch = () => {
    setShowHide({
      className:
        showHideButton.className === "btn bg-light text-danger btn-sm"
          ? "btn bg-light text-primary btn-sm"
          : "btn bg-light text-danger btn-sm",
      text: showHideButton.text === "SHOW" ? "HIDE" : "SHOW",
      type: showHideButton.type === "password" ? "text" : "password",
    });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <div>
      {/* <!-- Modal Opener --> */}
      <Button
        className="btn btn-outline-primary my-xl-5 my-5 bg-dark btn-block text-primary text-primary py-2 font-weight-bold"
        type="button"
        style={{ borderRadius: "22px" }}
        onClick={() => {
          setShowHide({
            className: "btn bg-light text-danger btn-sm",
            text: "SHOW",
            type: "password",
          });
          setShow(true);
        }}
      >
        CLICK TO ADD A PASSWORD
      </Button>

      <Modal show={show} onHide={handleClose}>
        {/* <!-- Modal Header --> */}
        <Modal.Header closeButton={false}>
          <Modal.Title className="text-warning">ADD PASSWORD INFO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <!-- Modal Body --> */}

          <form
            autoComplete="off"
            className="text-secondary text-center font-weight-bold"
          >
            <label htmlFor="website" className="mb-0">
              Website name:
            </label>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Enter your website name"
              onChange={(e) =>
                setPasswordInfo((prevObj) => ({
                  ...prevObj,
                  website: e.target.value,
                }))
              }
              value={passwordInfo.website}
            />
            <label htmlFor="email" className="mb-0">
              E-mail or username:
            </label>
            <input
              className="form-control mb-3 text-dark"
              type="text"
              placeholder="Enter your e-mail/username"
              onChange={(e) =>
                setPasswordInfo((prevObj) => ({
                  ...prevObj,

                  email: e.target.value,
                }))
              }
              value={passwordInfo.email}
            />
            <label htmlFor="password" className="mb-0">
              Website password:
            </label>
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Enter your password here"
                onChange={(e) =>
                  setPasswordInfo((prevObj) => ({
                    ...prevObj,

                    password: e.target.value,
                  }))
                }
                value={passwordInfo.password}
                type={showHideButton.type}
                aria-label="Enter your password here"
                aria-describedby="show-hide"
              />
              <div className="input-group-append">
                <button
                  className={showHideButton.className}
                  type="button"
                  id="show-hide"
                  onClick={() => showHideButtonSwitch()}
                  style={{ borderColor: "black" }}
                >
                  {showHideButton.text}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>

        {/* <!-- Modal footer --> */}
        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-primary text-light mt-2"
            data-dismiss="modal"
            onClick={(e) => onSubmitForm(e)}
          >
            ADD PASSWORD
          </Button>

          <Button
            type="button"
            className="btn btn-danger mt-2"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <h4
        className="text-center mt-5 mb-4 text-light bg-primary pb-2 pt-1"
        style={{ borderRadius: "22px", cursor: "default" }}
      >
        My passwords:
      </h4>
    </div>
  );
};

export default InputPassword;
