import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="" className="navbar-brand fw-bold fs-2" href="#">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ flexGrow: 0 }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-link" href="#">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link" href="#">
                Pricing
              </Link>
            </li>
            <div className="nav-item login-links d-flex flex-sm-column flex-md-column flex-lg-row align-items-center">
              
                <Link
                  to="/register"
                  className="nav-link btn btn-light p-1"
                  href="#"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="nav-link btn btn-light p-1"
                  href="#"
                >
                  Login
                </Link>
              
              <Link
                className="nav-link btn btn-light p-1"

              >
                logout
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
