import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "./context/UserContext";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // New state variable for email validation
  const [emailError, setEmailError] = useState("");
  const user = useContext(User);
  const nav = useNavigate();

  // cookie
  const cookie = new Cookies();

  const isPasswordValid = pass.length >= 8;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    try {
      if (isPasswordValid && isEmailValid) {
        let res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: pass,
        });
        const token = res.data.data.token;
        cookie.set("Bearer", token);
        const userDetails = res.data.data.user;
        user.setAuth({ token, userDetails });
        nav("/dashboard");
      }
    } catch (error) {
      setEmailError(error.response.status);
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
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="signup-form shadow-lg p-4 btn-outline-primary needs-validation"
      >
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
          {emailError === 401 && (
            <div className="invalid-feedback d-block">
              The password is or email is incorrect
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
