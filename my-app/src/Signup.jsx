import React, { useState } from "react";
import axios from "axios";
export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passR, setPassR] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // New state variable for email validation
  const [flag, setFlag] = useState(true);
  const [emailError, setEmailError] = useState("");
  const isPasswordValid = pass.length >= 8;
  const isPasswordMatch = pass === passR;
  console.log(emailError);
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
        setFlag(false);
        await axios
          .post("http://127.0.0.1:8000/api/register", {
            name: name,
            email: email,
            password: pass,
            password_confirmation: passR,
          })
          .then((r) => console.log(r.data));
      } else {
        console.log("Form submission failed. Please check the input fields.");
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
        Signup
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
            type="text"
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
          {!isEmailValid && (
            <div className="invalid-feedback d-block">Invalid email address</div>
          )}
          { emailError == 422 && (
            <div className="invalid-feedback d-block">Email is already been taken</div>
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
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
