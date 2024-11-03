/*
import "./App.scss";

import "bootstrap/dist/js/bootstrap.bundle";
//import ToastifyContainer from './Components/ToastifyContainer'; // Import the ToastifyContainer
import "antd/dist/reset.css";

import Routes from "./Routes";

function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;

*/

import React, { useState, useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'antd/dist/reset.css';
import Routes from './Routes';
import Loader from './assets/Loader/loader'; // Ensure the path is correct


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state (e.g., data fetching)
    const load = async () => {
      try {
        // Simulate a loading process for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error during loading:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      {loading ? (
        <Loader /> // Display the loader while loading
      ) : (
        <Routes /> // Display routes when not loading
      )}
     

    </>
  );
}

export default App;
