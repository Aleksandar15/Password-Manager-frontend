import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";
import { logoutUserAction } from "../../../redux/actions/verifyActions";

import { Button, Modal } from "react-bootstrap";

import copyText from "../../../Utils/copyText";
import { useEffect } from "react";

const EditPassword = ({ password, setPasswordChanges }) => {
  const [passwordInfo, setPasswordInfo] = useState({
    website: password.site_name,
    email: password.site_email,
    password: "",
  });

  console.log("password INSIDE EditPassword.js: ", password);
  useEffect(() => {
    //For when same-user logged from another device updates passwordInfo VAULT -> I want changes to be seen inside Modal:
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
      const response = await fetch(
        `http://localhost:3003/manager/decryptpassword/${id}`,
        // `https://password-manager.fly.dev/manager/decryptpassword/${id}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            token: localStorage.token,
          },
        }
      );
      const decryptedPassword = await response.json();

      console.log("response: ", response);

      console.log(
        "decryptPassword INSIDE EditPassword.js: ",
        decryptedPassword
      );

      if (
        decryptedPassword === "Authorization error" ||
        decryptedPassword === "Error Authorizing" ||
        decryptedPassword === "This DATA doesn't belong to you"
      ) {
        alert("Your session has expired. Please login again.");
        navigate("/login");
        dispatch(logoutUserAction());
        dispatch(searchPassword(""));
      } else if (decryptedPassword === "ERROR Decrypting Password") {
        alert("Server error ~ Please try again");
      } else {
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
        // //I notice a pattern: its re-rendering for as many properties as 'password' have bcuz 'password' iS INFO oF: password_id + email + name + password + iv + useremail + username ~> They ALL Should have been different API calls: but that would be costly TOO,as oF NOW I think i will leave it as that BUGS: I have total fo 7 Properties to my object SO IT Console.log 7 times FOR EACH Password VUALT iF 7 = 7*7=49 almost 50 rerejders iF 100 then 700 re-renders oR 1000s thats BAD PATTERN BAD PRACTICES JUST to make it WORK at a COST oF Performance iSSUES! i must find a Workaround!
        // ^^^ ACTUALLY Testing in Slow 3G NETWORK SLOW NETWORK iN DevTools: and its just as fast/just as SLOW SO I dont care! === its just DATA Re-rendering on top of it all so nothing is Causing Slowdown -> I mean the console.log scares me a bit but its just like a onChange oR onPasswordChanges Fires a Function=FIring doesnt mean match IM GOOD oR IM GREAT / IM PERFECTtly Fine When ther is no unnecessary API calls oR Dispatch Actions===there iS no Performance ISSUES!!!!!
      }
    } catch (err) {
      alert("Password Manager error ~ Please try again");
    }
  };

  const updatePasswordInfo = async (e) => {
    e.preventDefault();
    setShowHide({
      type: "password",
      button: "SHOW",
      btnColor: "btn btn-outline-danger text-danger bg-dark btn-sm",
    });
    try {
      if (
        passwordInfo.website === "" ||
        (passwordInfo.email === "") | (passwordInfo.password === "")
      ) {
        alert("Fields can't be empty");
      } else {
        const response = await fetch(
          `http://localhost:3003/passwords/${password.password_id}`,
          // `https://password-manager.fly.dev/passwords/${password.password_id}`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              token: localStorage.token,
            },
            body: JSON.stringify(passwordInfo),
          }
        );
        const data = await response.json();
        if (
          data === "Error Authorizing" ||
          data === "Authorization error" ||
          data === "This DATA doesn't belong to you"
        ) {
          alert("Your session has expired. Please login again.");
          navigate("/login");
          dispatch(logoutUserAction());
          dispatch(searchPassword(""));
        } else if (data === "UPDATE password vault: SERVER SIDE ERROR") {
          alert("Server error ~ Please try again");
          navigate("/login");
          dispatch(logoutUserAction());
          dispatch(searchPassword(""));
        } else {
          setPasswordChanges(true);
          setShow(false);
        }
      }
    } catch (err) {
      console.error("ERRoR in updatePasswordInfo: ", err);
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
