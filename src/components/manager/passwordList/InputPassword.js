import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";
import { logoutUserAction } from "../../../redux/actions/verifyActions";

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
    // setPasswordChanges(true); //Doesnt work (to update on 2nd screen SO ... not SO, i was going to say i may need it on 'CLICK TO ADD A PASSWORD' but that would 'update the Original with Original'=>So Solution iS These 2 Components InputPassword && EditPassword++EVEN ListPasswords.js WOULD have TO BE Connected to Each Other && Thats only possible using react, i cant have props drilling bcuz they have 1 sharing parent the parent would have to handle all the Childrens state and set it accordingly i dont want that its fine FOR NOW a LiL BiT Buggy but cant be perfect) //testing for Multipl Devices
    try {
      if (
        passwordInfo.website === "" ||
        passwordInfo.email === "" ||
        passwordInfo.password === ""
      ) {
        setShow(true);
        return alert("Fields can't be empty");
      } else {
        // const json = await fetch("http://localhost:3003/passwords", {
        //   // const json = await fetch("https://password-manager.fly.dev/passwords", {
        //   method: "POST",
        //   mode: "cors",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json;charset=UTF-8",
        //     token: localStorage.token,
        //   },
        //   body: JSON.stringify(passwordInfo),
        // });
        // const data = await json.json();

        // AXIOS BELOW:
        // AXIOS BELOW:
        // AXIOS BELOW:
        // AXIOS BELOW:
        // AXIOS BELOW:
        // // const { data } = axiosPrivate.post(
        // const { data } = await axiosPrivate.post(
        //   "http://localhost:3003/passwords",
        //   //  {
        //   //   // body: JSON.stringify(passwordInfo), //thats not how I send body in axios its just the JSON.stringify directly
        //   //   JSON.stringify(passwordInfo) //This is errrr
        //   // }
        //   JSON.stringify(passwordInfo) //NEW error: `inside server addPassword err:` `TypeError the "data" argument must be of type string ...." HuH? I do stringify it! //NEW results: error was not having `await` But there is sitll more! //still doesnt work, let me include signal inside of here...but I cant DO that,as I cant use my abort bcuz thats not inside useEffect...
        // );

        // 2
        // const controller = new AbortController();
        // const signal = controller.signal;

        // const { data } = await axiosPrivate.post(
        //   "http://localhost:3003/passwords",
        //   JSON.stringify(passwordInfo)
        //   // { signal }//Doesnt fix, na pamet->MKD=>lets console.log data inside server side.
        // );

        // 3
        const { data } = await axiosPrivate.post(
          "http://localhost:3003/passwords",
          // // {JSON.stringify(passwordInfo)} //Parsing error
          // // { signal },
          // JSON.stringify(passwordInfo)
          // //oh wow! Server side body is now: (instead of `{}`): `{ signal: {} }`. -> why must I send the data Property by property?
          // // WoW2: I must NOT send signal, bcuz its turned into property.
          passwordInfo //Thats what worked?!!!!!->ITS ALL COOL and Destructured BY SERVER ENDPOINT ^ that log gave me IDEA LOL Console.log HELPS ME!
          // { signal } //I dont need this Until I realize why i need it, + i cant turn it off in here.
        );

        console.log("data ~~~~~~~ INSIDE InputPassword: ", data);
        if (data === "Error Authorizing" || data === "Authorization error") {
          alert("Your session has expired. Please login again");
          navigate("/login");
          dispatch(logoutUserAction());
          dispatch(searchPassword(""));
        } else if (data === "addPassword SERVER SIDE ERROR") {
          alert("Server error ~ Please try again");
          navigate("/login");
          dispatch(logoutUserAction());
          dispatch(searchPassword(""));
        } else {
          setPasswordChanges(true);
          setPasswordInfo({
            website: "",
            email: "",
            password: "",
          });
          setShow(false);
        }
      }
    } catch (err) {
      console.log("error INSIDE INputPAssword: ", err); //this triggers on `isUserHacked -> When clicking "ADD PASSWORD" but user with same-credentials has LOGGED OUT EVERYWHEPassword Manager error -> isntead its the JSON's from Authorization.jS that I should handle JUST AS SAME AS Manager.js (bcuz its isnt handling it->INputPassword MUST handle them Authorization.js Errors) //OLD~>//RE: I get ""
      alert("Password Manager error ~ Please try again");
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
