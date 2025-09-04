import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const AutoDismissAlert = ({
  message,
  variant = "success",
  duration = 3000,
  onClose,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!show || !message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5000,
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <Alert variant={variant} dismissible onClose={() => setShow(false)}>
        {message}
      </Alert>
    </div>
  );
};

export default AutoDismissAlert;
