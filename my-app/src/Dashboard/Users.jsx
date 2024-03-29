import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { User } from "../Home/Auth/context/UserContext";
import Loading from "../components/Loading";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [runUseEffect, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUsers(data.data);
        setLoading(false); // Set loading state to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false in case of error
      });
  }, [runUseEffect]);

  const deleteUser = async (userID) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${userID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        // Update the runUseEffect state to trigger useEffect
        setRun((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };

  const showUsers = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.created_at.slice(0, 10)}</td>
      <td>
        <Link to={`${user.id}`}>
          <FontAwesomeIcon icon={faEdit} className="pen fs-4" />
        </Link>
        <FontAwesomeIcon
          icon={faTrash}
          className="fa-solid fa-trash fs-4"
          onClick={() => deleteUser(user.id)}
          style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
        ></FontAwesomeIcon>
      </td>
    </tr>
  ));

  return (
    <div className="table-parent" style={{ width: "90%", height: "100%" }}>
      {loading ? (
        <Loading />
      ) : (
        // Display loading spinner while loading
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="table-head" style={{ width: "10%" }}>
                ID
              </th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Updated at</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {/* show all users */}
          <tbody>{showUsers}</tbody>
        </table>
      )}
    </div>
  );
}