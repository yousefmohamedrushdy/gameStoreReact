import React, { useState } from "react";
import StyledWrapper from "../custom/StyledWrapper";
import { BiCheckCircle } from "react-icons/bi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (formData.subject.trim().length < 2)
      newErrors.subject = "Subject must be at least 2 characters.";
    if (formData.message.trim().length < 5)
      newErrors.message = "Message must be at least 5 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="container-fluid ">
      <StyledWrapper
        style={{
          position: "absolute",
          top: "59%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div className="overlay">
          {success && (
            <div
              className="alert alert-success d-flex align-items-center fixed-alert"
              role="alert"
              style={{
                backgroundColor: "#339900 ",
                border: "none",
              }}
            >
              <BiCheckCircle size={24} className="me-2" />
              <div>Message sent successfully!</div>
            </div>
          )}

          <form className="form bigger-form" noValidate onSubmit={handleSubmit}>
            <p className="title">Contact Us</p>
            <p className="message">
              Have a question? Fill out the form below and we'll get back to
              you.
            </p>

            <div className={`input-group ${errors.name ? "error" : ""}`}>
              <input
                id="name"
                name="name"
                placeholder=" "
                type="text"
                className="input bigger-input"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name" className="label">
                Name
              </label>
              <p className="error-text">{errors.name}</p>
            </div>

            <div className={`input-group ${errors.email ? "error" : ""}`}>
              <input
                id="email"
                name="email"
                placeholder=" "
                type="email"
                className="input bigger-input"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="label">
                Email
              </label>
              <p className="error-text">{errors.email}</p>
            </div>

            <div className={`input-group ${errors.subject ? "error" : ""}`}>
              <input
                id="subject"
                name="subject"
                placeholder=" "
                type="text"
                className="input bigger-input"
                value={formData.subject}
                onChange={handleChange}
              />
              <label htmlFor="subject" className="label">
                Subject
              </label>
              <p className="error-text">{errors.subject}</p>
            </div>

            <div className={`input-group ${errors.message ? "error" : ""}`}>
              <textarea
                id="message"
                name="message"
                placeholder=" "
                className="input bigger-textarea"
                value={formData.message}
                onChange={handleChange}
                rows={6}
              />
              <label htmlFor="message" className="label">
                Message
              </label>
              <p className="error-text">{errors.message}</p>
            </div>

            <button type="submit" className="submit bigger-button">
              Send Message
            </button>
          </form>
        </div>
      </StyledWrapper>
    </div>
  );
};

export default ContactUs;
