import React from "react";
import { useNavigate } from "react-router-dom";

function NavBarLogo() {
  const navigate = useNavigate();
  return (
    <div>
      <h4
        className="navbar-brand"
        style={{
          color: "brown",
          padding: "6px",
          margin: "3px 3px 3px 0",
          backgroundColor: "cyan",
          cursor: "pointer",
          borderRadius: "10px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        PASSWORD MANAGER
      </h4>
    </div>
  );
}

export default NavBarLogo;
