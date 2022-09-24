import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        color: "red",
        paddingTop: "3rem",
        fontWeight: "bold",
        borderRadius: "33px",
      }}
      className="container bg-dark mt-4"
    >
      <h1 style={{ fontFamily: "Fantasy, Arial, Helvetica, sans-serif" }}>
        PAGE NOT FOUND
      </h1>
      <h2 style={{ fontFamily: "Fantasy, Arial, Helvetica, sans-serif" }}>
        404 ERROR
      </h2>
      <button
        className="btn btn-primary text-warning font-weight-bold btn-lg my-5"
        type="button"
        onClick={() => navigate("/")}
      >
        GO TO HOME
      </button>
      <button
        className="btn btn-danger text-warning font-weight-bold btn-lg my-5 ml-1"
        type="button"
        onClick={() => navigate(-1)}
      >
        GO BACK
      </button>
    </div>
  );
}

export default PageNotFound;
