import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import StyledWrapper from "../custom/StyledWrapper";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { validateSignIn } from "../validation/signInValidation";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { formData, errors, handleChange, validate, setErrors } = useForm(
    { email: "", password: "" },
    validateSignIn
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      setSuccess(true);
      setErrors({});
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const newErrors = { email: "", password: "" };
      if (err.message === "Email not found") newErrors.email = err.message;
      else if (err.message === "Incorrect password")
        newErrors.password = err.message;
      else newErrors.email = err.message;

      setErrors(newErrors);
    } finally {
      setLoading(false);
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
            <div>Login successful! Redirecting to home...</div>
          </div>
        )}

        <form className="form" noValidate onSubmit={handleSubmit}>
          <p className="title">Sign In</p>
          <p className="message">
            Welcome back to LootBox! Please login to your account.
          </p>

          <div className={`input-group ${errors.email ? "error" : ""}`}>
            <input
              id="signin-email"
              name="email"
              type="email"
              placeholder=" "
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="signin-email" className="label">
              Email
            </label>
            {errors.email && (
              <p className="error-text text-danger">{errors.email}</p>
            )}
          </div>

          <div className={`input-group ${errors.password ? "error" : ""}`}>
            <input
              id="signin-pass"
              name="password"
              type="password"
              placeholder=" "
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="signin-pass" className="label">
              Password
            </label>
            {errors.password && (
              <p className="error-text text-danger">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="submit"
            disabled={loading}
            style={{ position: "relative" }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="signin">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

export default SignIn;
