/*
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Search from '../search/Search'


export default function Index() {
  return (
    <Routes>
      <Route path="Login" element={<Login />} />
      <Route path='Register' element={<Register/>} />
      <Route path='ForgotPassword' element={<ForgotPassword/>} />
      <Route path='Search' element={<Search/>} />

      
    </Routes>
  );
}*/
/*
import  React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFirebase } from '../context/Firebase'; // Update the path to your FirebaseContext file
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Search from '../search/Search';

export default function Index() {
  const { isLoggedIn } = useFirebase(); // Check if the user is logged in

  return (
    <Routes>
    
      <Route path="Login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path='Register' element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
      <Route path='ForgotPassword' element={isLoggedIn ? <Navigate to="/" /> : <ForgotPassword />} />
      <Route path='Search' element={<Search />} />
    </Routes>
  );
};*/

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase"; // Ensure the path is correct
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

import Loader from "../assets/Loader/loader"; // Ensure the path is correct
import Contact from './Contact';

export default function Index() {
  const { isLoggedIn } = useFirebase(); // Check if the user is logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to handle the loader display duration
    const load = async () => {
      try {
        // Simulate a loading process for a minimum of 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loader />; // Display the loader while loading
  }

  return (
    <Routes>
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      
      <Route path="Contact" element={<Contact/>}/>
    </Routes>
  );
}
