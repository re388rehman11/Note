import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import logo from "../assets/Images/logo.png";
import img1 from '../assets/Images/img1.png'
import { message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import "./App.scss";

const LoginPage = () => {
  const firebase = useFirebase(); // Get Firebase context
  const navigate = useNavigate(); // Navigation hook
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading spinner state
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design message API

  // Helper to show error messages
  const showErrorMessage = (errorMessage) => {
    messageApi.destroy(); // Clear any existing message
    messageApi.error({
      content: errorMessage,
      duration: 5, // Display duration (5 seconds)
    });
  };

  // Helper to show success messages
  const showSuccessMessage = (successMessage) => {
    messageApi.success({
      content: successMessage,
      duration: 3, // Display duration (3 seconds)
    });
  };

  // Function to handle login with email and password
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      showErrorMessage("Please provide both email and password.");
      return;
    }

    if (password.length < 6) {
      showErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true); // Start spinner

    try {
      // Attempt to sign in using Firebase
      const response = await firebase.signinUserWithEmailAndPass(
        email,
        password
      );

      if (response.success) {
        showSuccessMessage("Login successful! Redirecting to home page...");
        setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
      } else {
        showErrorMessage(response.error); // Show error returned by Firebase
      }
    } catch (error) {
      console.error("Login Error:", error);
      showErrorMessage("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop spinner
    }
  };

  // Function to handle login with Google
  const handleGoogleLogin = async () => {
    try {
      await firebase.signinWithGoogle();
      showSuccessMessage(
        "Google Sign-In successful! Redirecting to home page..."
      );
      setTimeout(() => navigate("/"), 3000); // Redirect after Google login
    } catch (error) {
      console.error("Google Sign-In Error", error);
      showErrorMessage("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {contextHolder} {/* Display Ant Design messages */}
      <div className="auth-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="fixed-image">
        <img src={img1} alt="Login Illustration" className="img-fluid" />
      </div>
      <div className="form-container">
        <Form onSubmit={handleEmailPasswordLogin} className="login-form">
          <h2>Login</h2>
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
          <Button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? <Spin /> : "Login"}
          </Button>
          
          <div className="auth-links">
            <p>
              Don't have an account? <Link to="../Register">Register here</Link>
            </p>
            <p>
              Forgot password? <Link to="../ForgotPassword">Reset here</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
