import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavBarHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    location.pathname === "/" && (
      <>
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
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto text-right">
            <li className="nav-item">
              <button
                className="btn btn-outline-primary bg-dark px-4 mt-1 btn-sm py-2"
                type="submit"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-primary bg-dark px-4 my-1 btn-sm py-2"
                type="submit"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </button>
            </li>
          </ul>
        </div>
      </>
    )
  );
}

export default NavBarHomePage;
