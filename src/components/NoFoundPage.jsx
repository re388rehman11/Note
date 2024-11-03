// src/pages/NotFoundPage.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or was not found.</p>
      <Button variant="dark" onClick={handleGoHome}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
