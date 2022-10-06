import { Link } from "react-router-dom";
import { Fragment } from "react";
import Loading from "./Loading/Loading";
import useVerifyUser from "../Hooks/useVerifyUser";

const HomePage = () => {
  const [isAuthenticatedOrLoading] = useVerifyUser();

  return (
    <Fragment>
      {!isAuthenticatedOrLoading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <div
          className="jumbotron mt-5 bg-primary text-center"
          style={{ borderRadius: "22px" }}
        >
          <h1 className="text-light my-1 pb-1">Secure Password Manager</h1>
          <h6 className="text-light my-3 pb-4">
            Sign In and store all your passwords safely.
          </h6>
          <Link to="/login" className="btn btn-danger">
            LOGIN
          </Link>
          <Link to="/register" className="btn btn-danger ml-3">
            REGISTER
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default HomePage;
