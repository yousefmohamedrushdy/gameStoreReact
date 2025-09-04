import React from "react";
import Loader from "../custom/notFound";

import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function NotFound() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center page-container"
      style={{ minHeight: "80vh", textAlign: "center" }}
    >
      <Loader />
      <h1 className="mt-4">404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Button as={Link} to="/" variant="primary">
        Go Back Home
      </Button>
    </Container>
  );
}

export default NotFound;
