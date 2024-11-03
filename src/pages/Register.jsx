import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import img2 from '../assets/Images/img2.png'
import { message, Spin } from "antd"; // Import Ant Design components
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Checkbox } from "antd"; // Import Ant Design components
import "./App.scss"; // Import custom CSS for styling
import logo from "../assets/Images/logo.png";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for button loading
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox
  const [messageApi, contextHolder] = message.useMessage();

  // Redirect to home page if the user is already logged in

  const showSuccessMessage = () => {
    return new Promise((resolve) => {
      messageApi.success({
        content: "Registration Successful. Redirecting to login...",
        duration: 3,
        onClose: resolve,
      });
    });
  };

  const showErrorMessage = (errorMessage) => {
    messageApi.error({
      content: errorMessage,
      duration: 5,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (firstName.length < 3) {
      showErrorMessage("First Name must be at least 3 characters long.");
      return;
    }
    if (password.length < 6) {
      showErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!firstName || !lastName || !email || !password) {
      showErrorMessage("Please fill in all required fields.");
      return;
    }
    if (!isCheckboxChecked) {
      showErrorMessage("Please agree to the terms and conditions.");
      return;
    }

    setIsSubmitting(true); // Start loading state

    setIsSubmitting(true);

    try {
      // Register user with Firebase
      const result = await firebase.signupUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Registration Success", result);

      // Show success message and wait for it to complete
      console.log("Showing success message...");
      await showSuccessMessage();
      console.log("Success message shown, navigating to login");

      console.log("Navigating to /login");
      navigate("../Login");
    } catch (error) {
      console.error("Registration Error:", error);

      // Handle Firebase authentication errors
      switch (error.code) {
        case "auth/email-already-in-use":
          showErrorMessage("Email is already in use. Please try logging in.");
          break;
        case "auth/invalid-email":
          showErrorMessage("Invalid email format.");
          break;
        case "auth/weak-password":
          showErrorMessage(
            "Password is too weak. Please use a stronger password."
          );
          break;
        default:
          showErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      {contextHolder}
      <div className="auth-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="fixed-image">
        <img src={img2} alt="Login Illustration" className="img-fluid" />
      </div>
      <div className="form-container">
        <Form onSubmit={handleSubmit} className="register-form">
          <h2>Create New Account</h2>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
              placeholder="Enter first name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
              placeholder="Enter last name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Checkbox
              checked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            >
              I agree to the terms and conditions
            </Checkbox>
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spin /> : "Create Account"}
          </Button>
          <div className="auth-links">
            <p>
              Already have an account? <Link to="../Login">Login here</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
