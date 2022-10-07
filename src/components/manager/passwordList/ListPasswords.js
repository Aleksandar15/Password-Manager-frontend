import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { searchPassword } from "../../../redux/actions/searchBarActions";

import EditPassword from "./EditPassword";

const ListPasswords = ({ allPasswords, setPasswordChanges }) => {
  const [passwords, setPasswords] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    setPasswords(allPasswords);
  }, [allPasswords]);
  const deletePassword = async (id) => {
    try {
      const { data } = await axiosPrivate.delete(`/passwords/${id}`);
      switch (data) {
        case "Password was deleted!":
          setPasswords(
            passwords.filter((password) => password.password_id !== id)
          );
          break;
        case "This DATA doesn't belong to you":
          alert("This password has already been removed");
          setPasswords(
            passwords.filter((password) => password.password_id !== id)
          );
          break;
        default:
          alert("Unexpected error happened, please try again");
          setPasswordChanges(true);
          break;
      }
    } catch (err) {
      console.error("Error deleting PASSWORD: ", err.response.data);
      const { data: JSONmessage } = err.response;
      switch (JSONmessage) {
        case "Session expired":
          alert("Your session has expired. Please login again.");
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "Error Authorizing":
          alert("You are not authorized to view this page. Please login.");
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "Is user hacked?":
          alert(
            `It looks like you or someone that has access to this account on other devices has clicked "Logout all devices" button. You can login again. \n\nOtherwise a hacker may have used your active session maliciously.\n\nIf you are sure that wasn't you, please re-login and reset your password!`
          );
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        case "User has removed cookies":
          alert(
            "Have you removed your cookies?\nAuthorization failed, please login again."
          );
          dispatch(searchPassword(""));
          navigate("/login");
          break;
        default:
        case "Authorization error":
        case "deletePassword SERVER SIDE ERROR":
          alert("Unexpected error happened, please try again");
          setPasswordChanges(true);
          dispatch(searchPassword(""));
          navigate("/login");
          break;
      }
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
