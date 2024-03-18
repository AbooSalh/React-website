import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
export default function Aside() {
  return (
    <aside>
      <Link
        to="/dashboard/users"
        className="item-link d-block "
      >
        <FontAwesomeIcon icon={faUser}/>
        <span>Users</span>
      </Link>
    </aside>
  );
}
