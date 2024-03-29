import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Loading(params) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="icon">
        <FontAwesomeIcon icon={faSpinner} spin={true} className="fs-1" />
      </div>
    </div>
  );
}
