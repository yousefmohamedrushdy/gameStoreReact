import React, { useState, useContext, useEffect } from "react";
import { Offcanvas, Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AutoDismissAlert from "../custom/alert";
import styles from "../css/Profile.module.css";

const Profile = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, changePassword } =
    useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userImg: "/user/default.png",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: "", variant: "success" });

  // Sync formData with user
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        userImg: user.userImg || "/user/default.png",
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, userImg: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setAlert({ message: "Please fill all fields", variant: "warning" });
      return;
    }
    try {
      await updateProfile({ ...formData });
      setIsEditing(false);
      setAlert({ message: "Profile updated!", variant: "success" });
    } catch (err) {
      console.error(err);
      setAlert({ message: "Update failed", variant: "danger" });
    }
  };

  const handleEditToggle = () => {
    if (isEditing) handleSaveProfile();
    else setIsEditing(true);
  };

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.oldPassword) newErrors.oldPassword = "Required";
    else if (passwordData.oldPassword !== user.password)
      newErrors.oldPassword = "Old password is incorrect";

    if (!passwordData.newPassword) newErrors.newPassword = "Required";
    else if (
      passwordData.newPassword.length < 6 ||
      !/[A-Za-z]/.test(passwordData.newPassword) ||
      !/[0-9]/.test(passwordData.newPassword) ||
      !/[!@#$%^&*]/.test(passwordData.newPassword)
    )
      newErrors.newPassword =
        "Password must be at least 6 chars and include letters, numbers & special chars";

    if (passwordData.newPassword !== passwordData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePassword = async () => {
    if (!validatePassword()) return;
    try {
      await changePassword(passwordData.newPassword);
      setShowPasswordForm(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
      setAlert({ message: "Password updated!", variant: "success" });
    } catch (err) {
      console.error(err);
      setAlert({ message: "Password update failed", variant: "danger" });
    }
  };

  return (
    <>
      <AutoDismissAlert
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "success" })}
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={styles.profileSidebar}
        backdrop={false}
      >
        <Offcanvas.Header>
          <Button
            variant="link"
            className={styles.closeBtn}
            onClick={handleClose}
          >
            X
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.profileContent}>
            <div className="mb-3 text-center">
              <Image
                src={formData.userImg}
                roundedCircle
                width={120}
                height={120}
                className={styles.avatar}
              />
              {isEditing && (
                <Form.Control
                  type="file"
                  className={styles.fileInput}
                  onChange={handleImageChange}
                />
              )}
            </div>

            <Form className="mt-3" style={{ marginBottom: "110px" }}>
              {["firstName", "lastName", "email"].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Form.Label>
                  <Form.Control
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={
                      isEditing ? styles.editableInput : styles.disabledInput
                    }
                  />
                </Form.Group>
              ))}
            </Form>

            <div className="d-flex flex-column gap-2 mt-5">
              <Button
                variant="success"
                className={styles.btn}
                onClick={handleEditToggle}
              >
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Button>

              <Button
                variant="info"
                className={styles.btn}
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm
                  ? "Cancel Change Password"
                  : "Change Password"}
              </Button>

              {showPasswordForm && (
                <div className="mt-3">
                  {["oldPassword", "newPassword", "confirmPassword"].map(
                    (field) => (
                      <Form.Group className="mb-2" key={field}>
                        <Form.Label>
                          {field
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (c) => c.toUpperCase())}
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name={field}
                          value={passwordData[field]}
                          onChange={handlePasswordChange}
                          isInvalid={!!errors[field]}
                          className={styles.editableInput}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors[field]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )
                  )}

                  <Button
                    variant="primary"
                    className={styles.btn}
                    onClick={handleSavePassword}
                  >
                    Save Password
                  </Button>
                </div>
              )}

              {user.role === "admin" && (
                <Button
                  className={`${styles.btn} ${styles.adminBtn}`}
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </Button>
              )}

              <Button variant="danger" className={styles.btn} onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Profile;
