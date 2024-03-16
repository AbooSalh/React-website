import { Link } from "react-router-dom";
export default function Header() {
  function handleLogout() {
    localStorage.removeItem('email')
    window.location.pathname = "/"
  }
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <Link to="" class="navbar-brand fw-bold fs-2" href="#">
          Home
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarNav"
          style={{ flexGrow: 0 }}
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/about" class="nav-link active" aria-current="page" href="#">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/features" class="nav-link" href="#">
                Features
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/pricing" class="nav-link" href="#">
                Pricing
              </Link>
            </li>
            <div className="nav-item login-links d-flex flex-sm-column flex-md-column flex-lg-row align-items-center">
                {!window.localStorage.getItem("email") ? 
              <><Link to="/register" class="nav-link btn btn-light p-1" href="#">
                  Signup
                </Link><Link to="/login" class="nav-link btn btn-light p-1" href="#">
                    Login
                  </Link></>
               : <Link class="nav-link btn btn-light p-1" onClick={handleLogout} >
                logout
                </Link>
              }
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
