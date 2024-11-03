import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Navbar/Header";
import HomePage from "./Home";

import NoFoundPage from "./NoFoundPage";
import ProfilePage from "./ProfilePage";
import Footer from "../Navbar/Footer";

import LogoCircle from "./LogoCircle";
import HomeFeatures from "./Homefeatures";

// List of paths where Header and Footer should be displayed
const pathsWithHeaderFooter = ["/", "/customer-reviews", "/profile-page"];

export default function Index() {
  const location = useLocation();
  //const { isLoggedIn } = useFirebase(); // Access the isLoggedIn state from Firebase context
  const showHeaderAndFooter = pathsWithHeaderFooter.includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="Homefeatures" element={<HomeFeatures/>} />
          <Route path="*" element={<NoFoundPage />} />
          
          <Route path="LogoCircle" element={<LogoCircle/>} />
        </Routes>
      </main>
      {showHeaderAndFooter && <Footer />}
    </>
  );
}
