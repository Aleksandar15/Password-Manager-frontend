import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavBarLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    location.pathname === "/login" && (
      <button
        className="btn btn-outline-primary my-2 my-sm-0 bg-dark mr-2 px-4"
        type="submit"
        onClick={() => navigate("/register")}
      >
        REGISTER
      </button>
    )
  );
}

export default NavBarLogin;
