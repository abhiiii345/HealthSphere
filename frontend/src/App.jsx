import React from 'react'; 
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home'; 
import AboutUs from "./pages/AboutUs"; 
import Register from "./pages/Register"; 
import Login from "./pages/Login"; 
import Appointment from "./pages/Appointment"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar  from './components/Navbar';
import axios  from 'axios';
import { Context } from './main';
import { useContext, useEffect } from 'react';
import Footer from "./components/Footer";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
  useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/patient/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);
  return (
    <>
      <Router> {/* Enables routing in the application */}
      <Navbar/>
        <Routes> {/* Container for all the routes */}
          <Route path='/' element={<Home />} /> {/* Home page for the root URL */}
          <Route path='/appointment' element={<Appointment />} /> {/* Appointment page */}
          <Route path='/about' element={<AboutUs />} /> {/* About Us page */}
          <Route path='/register' element={<Register />} /> {/* Registration page */}
          <Route path='/login' element={<Login />} /> {/* Login page */}
        </Routes>
        <Footer/>
        <ToastContainer position="top-center"/>
      </Router>
    </>
  );
};

export default App; 


/*
Summary
The Router enables the app to handle different URLs.
The Routes component checks the current URL and determines which Route to display.
Each Route connects a specific URL path to a component that renders the content for that path.
*/