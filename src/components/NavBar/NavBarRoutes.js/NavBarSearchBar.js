import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";
import { logoutUserAction } from "../../../redux/actions/verifyActions";
import PasswordGenerator from "../../PasswordGenerator/PasswordGenerator";

// import verifyActions from "../../../redux/actions/verifyActions";

function NavBarSearchBar() {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { searchField } = useSelector((state) => state.searchBarReducer);

  const handleSearchChange = (e) => {
    e.preventDefault();
    const { value } = e.target;

    dispatch(searchPassword(value));
  };

  const allowedSearchBarROUTES = [
    "/manager",
    //Add more.
  ];

  const userInfo = useSelector((state) => state.userInfoReducer);

  const { user_name: name, user_email: email } = userInfo;
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUserAction());
    // dispatch(verifyActions()); ///This is STUCK at 'Loading' -> Hence why my useVerify HOOK && I Think its a mIstake that I dont get API for LOGOUT && That API Cant DO NOTHING, it cant REMOVE TOKENs && then RETURN DATA && WHEN I MAKE SURE localStorage to be REMOVED IT MEASN I GOT logged OUT SUCCESSFULY NO?-I think YES.
    navigate("/");
    return dispatch(searchPassword(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return allowedSearchBarROUTES.map(
    (route, index) =>
      location.pathname === route && (
        <React.Fragment key={index}>
          <h5 className="navbar-brand" style={{ cursor: "default" }}>
            {name}'s password managment
          </h5>
          <form
            className="form-inline"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <label className="text-secondary bg-light p-1 mr-2 px-2 rounded font-weight-bold">
              SEARCH:
            </label>
            <div className="input-group">
              <input
                className="form-control whiteFocus"
                type="search"
                placeholder="Search passwords"
                aria-label="Search passwords"
                onChange={handleSearchChange}
                // onChange={(e) => handleSearchChange(e)} //NOPE nothing fixes the allowance to click enter
                value={searchField}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn bg-light text-danger whiteFocus"
                  onClick={() => dispatch(searchPassword(""))}
                >
                  &times;
                </button>
              </div>
            </div>
          </form>
          <button
            className="navbar-toggler mr-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-right" id="navbarText">
            <ul className="navbar-nav mr-auto text-right mt-2 text-light">
              <li className="nav-item">
                <h6>Your name: {name}</h6>
              </li>
              <li className="nav-item">
                <h6>Your e-mail: {email}</h6>
              </li>
            </ul>
            <button
              className="btn btn-outline-primary mt-1 mt-sm-1 bg-dark text-success font-weight-bold btn-sm py-2 px-3"
              type="button"
              style={{ borderRadius: "11px" }}
              data-toggle="modal"
              data-target={"#generatePassword"}
            >
              GENERATE PASSWORD
            </button>
            <PasswordGenerator />
            <br />
            <button
              onClick={() => logout()}
              className="btn bg-danger px-4 btn-sm py-2 text-light mt-2 mb-1"
              style={{ borderRadius: "11px", fontWeight: "bold" }}
              type="button"
            >
              LOGOUT
            </button>
          </div>
        </React.Fragment>
      )
  );
}

export default NavBarSearchBar;
