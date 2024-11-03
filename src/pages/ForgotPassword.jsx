// import React, { useState } from "react";
// import { useFirebase } from "../context/Firebase"; // Import from the Firebase context
// import { message, Spin } from "antd"; // Import Ant Design components
// import { Button, Form } from "react-bootstrap";
// import { useNavigate, Navigate } from "react-router-dom"; // Import useNavigate and Navigate for navigation
// import logo from "../assets/Images/logo.png"; // Your logo

// import "./App.scss"; // Import custom CSS for styling
// import { IoArrowBack } from "react-icons/io5";

// const ForgotPassword = () => {
//   const { resetPassword, isLoggedIn } = useFirebase(); // Add isLoggedIn from Firebase context
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   // Redirect to home page if the user is already logged in
//   if (isLoggedIn) {
//     return <Navigate to="/" />;
//   }

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       message.error("Please enter your email address.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await resetPassword(email);
//       message.success(
//         "If this email is registered, a password reset email has been sent. Please check your inbox."
//       );
//     } catch (error) {
//       if (error.code === "auth/user-not-found") {
//         message.error("No user found with this email address.");
//       } else if (error.code === "auth/invalid-email") {
//         message.error("Invalid email address.");
//       } else {
//         message.error("Something went wrong. Please try again later.");
//       }
//       console.error(`Failed to send password reset email: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const Back = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   return (
//     <div className="forgot-password-page">
//       {/* Logo */}
//       <div className="auth-logo">
//         <img src={logo} alt="Logo" className="logo" />
//       </div>

//       {/* Left side with image */}
//       <div className="fixed-image">
       

//       {/* Right side with form */}
//       <div className="form-container">
//         <Form onSubmit={handleResetPassword} className="forgot-password-form">
//           <h2 className="forgot-password-heading">Forgot Password</h2>

//           {/* Email Input */}
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="dark"
//             className="submit-button"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <Spin /> : "Send Reset Link"}
//           </Button>

//           {/* Back Button */}
//           <Button type="button" variant="link" className="back" onClick={Back}>
//             <IoArrowBack /> Back
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;





import React, { useState } from "react";
import { useFirebase } from "../context/Firebase"; // Import from the Firebase context
import { message, Spin } from "antd"; // Import Ant Design components
import { Button, Form } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom"; // Import useNavigate and Navigate for navigation
import logo from "../assets/Images/logo.png"; // Your logo
import img3 from "../assets/Images/img3.png";
import "./App.scss"; // Import custom CSS for styling
import { IoArrowBack } from "react-icons/io5";

const ForgotPassword = () => {
  const { resetPassword, isLoggedIn } = useFirebase(); // Add isLoggedIn from Firebase context
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirect to home page if the user is already logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      message.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      message.success(
        "If this email is registered, a password reset email has been sent. Please check your inbox."
      );
    } catch (error) {
      console.error(`Failed to send password reset email: ${error.message}`); // Log error for debugging
      message.error(getErrorMessage(error)); // Call a function to get the error message
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle error messages based on Firebase error codes
  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/invalid-email":
        return "Invalid email address.";
      default:
        return "Something went wrong. Please try again later.";
    }
  };

  const Back = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="forgot-password-page">
      {/* Logo */}
      <div className="auth-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="fixed-image">
        <img src={img3} alt="Login Illustration" className="img-fluid" />
      </div>
      {/* Left side with image (if needed) */}
      <div className="fixed-image">
        {/* You can add an image or any additional content here */}
      </div>

      {/* Right side with form */}
      <div className="form-container">
        <Form onSubmit={handleResetPassword} className="forgot-password-form">
          <h2 className="forgot-password-heading">Forgot Password</h2>

          {/* Email Input */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="dark"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spin /> : "Send Reset Link"}
          </Button>

          {/* Back Button */}
          <Button type="button" variant="link" className="back" onClick={Back}>
            <IoArrowBack /> Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
