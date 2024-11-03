

// import React, { useState, useRef, useEffect } from "react";
// import { Container, Navbar, NavDropdown, Nav, Button } from "react-bootstrap";
// import { message } from "antd";
// import { FaSearch, FaUser, FaSignInAlt } from "react-icons/fa";
// import { useNavigate, Link } from "react-router-dom";
// import logo from "../assets/Images/logo.png";
// import { useFirebase } from "../context/Firebase"; // Import Firebase hook
// import "./App.scss";

// const Header = () => {
//   const navigate = useNavigate();
//   const { signOut, isLoggedIn } = useFirebase();

//   const handleSearchClick = () => {
//     navigate("/Pages/Search");
//   };

//   const handleLoginClick = () => {
//     navigate("/Pages/Login");
//   };

//   const handleProfileClick = () => {
//     navigate("../Profile-page");
//   };

//   const handleSignOutClick = async () => {
//     await signOut();
//     navigate("/Pages/Login");
//   };

//   return (
//     <header className="header">
//       <Container>
//         <Navbar expand="lg" className="navbar">
//           <Navbar.Brand as={Link} to="/">
//             <img src={logo} alt="Logo" className="logo" />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mr-auto">
//               <Nav.Link as={Link} to="/">
//                 Home
//               </Nav.Link>
//               <Nav.Link as={Link} to="/NoteList/AddNote">
//                 Add Note
//               </Nav.Link>
//               <Nav.Link as={Link} to="/NoteList/EditNote">
//                 Edit Note
//               </Nav.Link>
//               <Nav.Link as={Link} to="/NoteList/NoteList">
//                 Note List
//               </Nav.Link>
//               <Nav.Link as={Link} to="../Pages/Contact">
//                 Contact
//               </Nav.Link>
//             </Nav>
//             <div className="icon-group">
//               <button onClick={handleSearchClick} className="icon-button">
//                 <FaSearch />
//               </button>
//               {isLoggedIn ? (
//                 <>
//                   <button onClick={handleProfileClick} className="icon-button">
//                     <FaUser /> Profile
//                   </button>
//                   <button onClick={handleSignOutClick} className="icon-button">
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <button onClick={handleLoginClick} className="icon-button">
//                   <FaSignInAlt /> Login
//                 </button>
//               )}
//             </div>
//           </Navbar.Collapse>
//         </Navbar>
//       </Container>
//     </header>
//   );
// };

// export default Header;



import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaUser, FaSignInAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { useFirebase } from "../context/Firebase"; // Import Firebase hook
import "./App.scss"; // Ensure this file contains necessary styles

const Header = () => {
  const navigate = useNavigate();
  const { signOut, isLoggedIn } = useFirebase();

  const handleSearchClick = () => {
    navigate("/Pages/Search");
  };

  const handleLoginClick = () => {
    navigate("/Pages/Login");
  };

  const handleProfileClick = () => {
    navigate("../Profile-page");
  };

  const handleSignOutClick = async () => {
    await signOut();
    navigate("/Pages/Login");
  };

  return (
    <header className="header">
      <Container>
        <Navbar expand="lg" className="navbar">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/NoteList/AddNote" className="nav-link">Add Note</Nav.Link>
              <Nav.Link as={Link} to="/NoteList/EditNote" className="nav-link">Edit Note</Nav.Link>
              <Nav.Link as={Link} to="/NoteList/NoteList" className="nav-link">Note List</Nav.Link>
              <Nav.Link as={Link} to="../Pages/Contact" className="nav-link">Contact</Nav.Link>
            </Nav>
            <div className="icon-group">
              <button onClick={handleSearchClick} className="icon-button">
                <FaSearch /> <span className="icon-text">Search</span>
              </button>
              {isLoggedIn ? (
                <>
                  <button onClick={handleProfileClick} className="icon-button">
                    <FaUser /> <span className="icon-text">Profile</span>
                  </button>
                  <button onClick={handleSignOutClick} className="icon-button">
                    Sign Out
                  </button>
                </>
              ) : (
                <button onClick={handleLoginClick} className="icon-button">
                  <FaSignInAlt /> <span className="icon-text">Login</span>
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
