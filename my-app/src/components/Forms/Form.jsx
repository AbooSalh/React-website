import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { User } from "../../Home/Auth/context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passR, setPassR] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // New state variable for email validation
  const [flag, setFlag] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [redirect, setRedirect] = useState(true);
  const isPasswordValid = pass.length >= 8;
  const isPasswordMatch = pass === passR;
  const userNow = useContext(User);
  const nav = useNavigate();
  const cookie = new Cookies()

  console.log(userNow);
  useEffect(() => {
    setName(props.name || ""); // Set a default value if props.name is undefined
    setEmail(props.email || "");
  }, [props.email, props.name]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    try {
      if (
        isPasswordValid &&
        isPasswordMatch &&
        name.length > 2 &&
        isEmailValid &&
        flag
      ) {
        setFlag(redirect ? false : true);
        let res = await axios.post(
          `http://127.0.0.1:8000/api/${props.endPoint}`,
          {
            name: name,
            email: email,
            password: pass,
            password_confirmation: passR,
          }
        );
        const token = res.data.data.token;
        const userDetails = res.data.data.user;
        props.enableCookie && (cookie.set("Bearer" , token))
        userNow.setAuth({ token, userDetails });
        if (res.status === 200) {
          if (props.hasLocalStorage) {
            window.localStorage.setItem("email", email);
          }
          const checked = redirect;
          setRedirect(false);
          setTimeout(() => {
            checked ? nav(props.navigate) : nav("");
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setEmailError(error.response ? error.response.status : "Unknown error");
      setFlag(true);
      if (error.response.status === 422) {
        setEmailError(true);
      }
    }
  }

  // Function to validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="container signup-parent-div">
      <h2 style={{ textAlign: "center" }} className="mb-4">
        {props.submitBtn + " " + (props.name ? props.name : "")}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="signup-form shadow-lg p-4 btn-outline-primary needs-validation"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.length < 2 && submitted && (
            <div className="invalid-feedback d-block">Name is not valid</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${
              submitted && !isEmailValid ? "is-invalid" : ""
            }`}
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(validateEmail(e.target.value)); // Validate email on change
            }}
          />
          {!isEmailValid && submitted && (
            <div className="invalid-feedback d-block">
              Invalid email address
            </div>
          )}
          {emailError === 422 && (
            <div className="invalid-feedback d-block">
              Email is already been taken
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              submitted && !isPasswordValid ? "is-invalid" : ""
            }`}
            id="exampleInputPassword1"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {submitted && !isPasswordValid && (
            <div className="invalid-feedback">
              Password must be at least 8 characters long
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-pass" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${
              submitted && (!isPasswordMatch || !isPasswordValid)
                ? "is-invalid"
                : ""
            }`}
            id="confirm-pass"
            value={passR}
            onChange={(e) => setPassR(e.target.value)}
          />
          {submitted && !isPasswordMatch && (
            <div className="invalid-feedback">Passwords do not match</div>
          )}
        </div>
        {props.enableRedirect && (
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={redirect}
              onChange={(e) => setRedirect(e.target.checked)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Redirect
            </label>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {props.submitBtn}
        </button>
      </form>
    </div>
  );
}
