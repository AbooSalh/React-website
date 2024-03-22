import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
export default function Aside() {
  return (
    <aside style={{width:"275px"}}>
      <NavLink activeClassName="active" to="/dashboard/users" className="item-link d-flex">
        <FontAwesomeIcon icon={faUser} />
        <span>Users</span>
      </NavLink>
      <NavLink to="/dashboard/user/create" className="item-link d-flex " style={{gap:"10px"}}>
        <FontAwesomeIcon icon={faUserPlus} />
        <span>Add User</span>
      </NavLink>
    </aside>
  );
}
