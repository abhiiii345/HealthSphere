import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing necessary components from 'react-router-dom' for navigation and routing
import Dashboard from "./components/Dashboard"; // Importing the Dashboard component
import Login from "./components/Login"; // Importing the Login component
import AddNewDoctor from "./components/AddNewDoctor"; // Importing the component to add a new doctor
import Messages from "./components/Messages"; // Importing the Messages component
import Doctors from "./components/Doctors"; // Importing the component that displays doctors
import { Context } from "./main"; // Importing the Context object to access global authentication and admin state
import axios from "axios"; // Importing axios to handle HTTP requests
import { ToastContainer } from "react-toastify"; // Importing the ToastContainer component for notifications
import "react-toastify/dist/ReactToastify.css"; // Importing the Toastify styles for toast notifications
import AddNewAdmin from "./components/AddNewAdmin"; // Importing the component to add a new admin
import SideBar from './components/SideBar'; // Importing the Sidebar component
import { useContext, useEffect } from "react"; // Importing hooks from React: useContext to access context and useEffect to handle side effects
import "./App.css"; // Importing custom CSS styles for the App component

// Main functional component
const App = () => {
  // Destructuring the values from Context to access global state and setters
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  // useEffect hook to fetch the current authenticated admin when the component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Making an asynchronous GET request to fetch the current admin's data
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me", // API endpoint to get the admin's data
          {
            withCredentials: true, // Ensuring cookies are sent with the request for authentication
          }
        );
        // If the request is successful, mark the user as authenticated and set the admin's data
        setIsAuthenticated(true);
        setAdmin(response.data.user); // Update the global admin state with the fetched data
      } catch (error) {
        // If there is an error (e.g., not authenticated), reset the authentication and admin data
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser(); // Execute the function to fetch the user data
  }, [isAuthenticated]); // Dependency array: rerun this effect if 'isAuthenticated' changes

  return (
    <>
      {/* Setting up the router to define different routes in the application */}
      <Router>
        {/* Sidebar component included on all pages */}
        <SideBar />
        
        {/* Defining different routes for the app using 'Routes' and 'Route' */}
        <Routes>
          {/* Route for the Dashboard page */}
          <Route path="/" element={<Dashboard />} />

          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for adding a new doctor */}
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />

          {/* Route for adding a new admin */}
          <Route path="/admin/addnew" element={<AddNewAdmin />} />

          {/* Route for the Messages page */}
          <Route path="/messages" element={<Messages />} />

          {/* Route for viewing the Doctors page */}
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer /> 
      </Router>
    </>
  );
};

export default App;
