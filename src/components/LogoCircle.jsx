// src/components/LogoCircle.jsx
import React from 'react';
import logo from '../assets/Images/logo.png'; // Adjust the path to your logo image
import './App.scss'; // Import the SCSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LogoCircle = () => {
    return (
        <div className="logo-circle-container">
            <div className="logo-circle">
                <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <div className="info-section">
            <h3>About Me</h3>
                <p>
                    I am Rehman, a passionate Frontend Developer dedicated to creating user-friendly applications. 
                    With skills in HTML, CSS, and React, I focus on building solutions that enhance learning and organization.
                </p>
                <p>
                    My goal is to empower users to manage their knowledge effectively through technology. 
                    I believe that organized note-taking is essential for success in both academic and professional environments.
                </p>
                <Link to="/MoreInfo" className="btn btn-center">Learn More</Link> {/* Updated Link */}
                
            </div>
        </div>
    );
};

export default LogoCircle;
