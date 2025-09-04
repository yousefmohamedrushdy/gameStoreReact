import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import StyledWrapper from "../custom/StyledWrapper";
import { registerUser } from "../API/usersApi";
import { useForm } from "../hooks/useForm";
import { validateRegister } from "../validation/registerValidation";

const Register = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const { formData, errors, handleChange, validate, setErrors, setFormData } =
    useForm(
      {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validateRegister
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setApiError("");

    try {
      const response = await fetch("http://localhost:3000/user");
      const users = await response.json();
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (emailExists) {
        setErrors((prev) => ({
          ...prev,
          email: "Email is already registered. Please use a different email.",
        }));
        return;
      }

      await registerUser({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});

      setTimeout(() => navigate("/signin"), 2000);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <StyledWrapper>
      <div className="overlay">
        {success && (
          <div
            className="alert alert-success d-flex align-items-center fixed-alert"
            role="alert"
            style={{ backgroundColor: "#23C552", border: "none" }}
          >
            <BiCheckCircle className="me-2" size={24} />
            <div>Registration successful! Redirecting to Sign In...</div>
          </div>
        )}

        <form className="form" noValidate onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="message">Signup now and get full access to our app.</p>

          {apiError && <p className="error-text">{apiError}</p>}

          <div className="flex">
            <div className={`input-group ${errors.firstname ? "error" : ""}`}>
              <input
                id="first"
                name="firstname"
                type="text"
                placeholder=" "
                className="input"
                value={formData.firstname}
                onChange={handleChange}
              />
              <label htmlFor="first" className="label">
                Firstname
              </label>
              <p className="error-text">{errors.firstname}</p>
            </div>

            <div className={`input-group ${errors.lastname ? "error" : ""}`}>
              <input
                id="last"
                name="lastname"
                type="text"
                placeholder=" "
                className="input"
                value={formData.lastname}
                onChange={handleChange}
              />
              <label htmlFor="last" className="label">
                Lastname
              </label>
              <p className="error-text">{errors.lastname}</p>
            </div>
          </div>

          <div className={`input-group ${errors.email ? "error" : ""}`}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="label">
              Email
            </label>
            <p className="error-text">{errors.email}</p>
          </div>

          <div className={`input-group ${errors.password ? "error" : ""}`}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder=" "
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <p className="error-text">{errors.password}</p>
          </div>

          <div
            className={`input-group ${errors.confirmPassword ? "error" : ""}`}
          >
            <input
              id="confirm"
              name="confirmPassword"
              type="password"
              placeholder=" "
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="confirm" className="label">
              Confirm Password
            </label>
            <p className="error-text">{errors.confirmPassword}</p>
          </div>

          <button type="submit" className="submit">
            Submit
          </button>
          <p className="signin">
            Already have an account? <Link to="/signin">Signin</Link>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

export default Register;
