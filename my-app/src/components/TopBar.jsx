import { Link } from "react-router-dom";
export default function TopBar() {
  return (
    <div className="top-bar  ">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>Store</h1>
        <Link to="/" className="register-nav">
          <button type="button" class="btn btn-primary">
            Go to website
          </button>
        </Link>
      </div>
    </div>
  );
}
