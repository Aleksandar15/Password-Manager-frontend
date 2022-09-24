import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavBarRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    location.pathname === "/register" && (
      <button
        className="btn btn-outline-primary my-2 my-sm-0 bg-dark mr-2 px-4"
        type="submit"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </button>
    )
  );
}

export default NavBarRegister;
