import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPassword } from "../../../redux/actions/searchBarActions";
import { logoutUserAction } from "../../../redux/actions/verifyActions";

import EditPassword from "./EditPassword";

const ListPasswords = ({ allPasswords, setPasswordChanges }) => {
  const [passwords, setPasswords] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setPasswords(allPasswords);
  }, [allPasswords]);
  const deletePassword = async (id) => {
    try {
      const response = await fetch(`http://localhost:3003/passwords/${id}`, {
        // const response = await fetch(
        //   `https://password-manager.fly.dev/passwords/${id}`,
        //   {
        method: "DELETE",
        headers: {
          token: localStorage.token,
        },
      });
      const data = await response.json();
      if (
        data === "Error Authorizing" ||
        data === "Authorization error" ||
        data === "This DATA doesn't belong to you"
      ) {
        alert("Your session has expired. Please login again");
        navigate("/login");
        dispatch(logoutUserAction());
        dispatch(searchPassword(""));
      } else if (data === "deletePassword SERVER SIDE ERROR") {
        alert("Server error ~ Please try again");
        navigate("/login");
        dispatch(logoutUserAction());
        dispatch(searchPassword(""));
      } else if (data === "Password was deleted!") {
        setPasswords(
          passwords.filter((password) => password.password_id !== id)
        );
      }
    } catch (err) {
      console.error("Error deleting TODO: ", err.message);
    }
  };

  const searchField = useSelector((state) => state.searchBarReducer);
  const { searchField: searchInput } = searchField;

  const filteredData = passwords.filter((passwordInfo) => {
    if (passwordInfo.site_name === null) {
      return passwordInfo;
    } else if (searchInput === "") {
      return passwordInfo;
    } else {
      return passwordInfo.site_name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    }
  });

  return (
    <div>
      <Fragment>
        <table className="table mt-5 text-center">
          <thead>
            <tr className="text-secondary thListPasswords">
              <th>Website</th>
              {/* <th>E-mail / Username</th> */}
              <th className="mobile-hide">E-mail / Username</th>
              <th className="mobile-hide">Password</th>
              <th>View/Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length !== 0 &&
              filteredData[0].password_id !== null &&
              filteredData.map((password) => (
                <tr
                  key={password.password_id}
                  className="text-light"
                  style={{ fontWeight: "500" }}
                >
                  <td>{password.site_name}</td>
                  <td className="mobile-hide">{password.site_email}</td>
                  <td className="unselectable mobile-hide">
                    <input
                      disabled
                      value="Hidden password"
                      className="text-light bg-secondary"
                    />
                  </td>
                  <td>
                    <EditPassword
                      password={password}
                      setPasswordChanges={setPasswordChanges}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deletePassword(password.password_id)}
                      className="btn btn-danger"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Fragment>
    </div>
  );
};

export default ListPasswords;
