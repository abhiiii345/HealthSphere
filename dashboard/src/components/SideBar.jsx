import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

// Sidebar functional component
const Sidebar = () => {
  // State to handle the visibility of the sidebar (whether it is shown or hidden)
  const [show, setShow] = useState(false);

  // Accessing authentication context (isAuthenticated and setIsAuthenticated) using useContext
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  // Function to handle user logout
  const handleLogout = async () => {
    // Sending a request to log out the admin user from the backend
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true, // Ensures cookies are included in the request for authentication
      })
      .then((res) => {
        // If the request is successful, show a success toast notification
        toast.success(res.data.message);
        // Update the authentication state to false, logging the user out
        setIsAuthenticated(false);
      })
      .catch((err) => {
        // If there is an error during the logout process, show an error toast notification
        toast.error(err.response.data.message);
      });
  };

  // Using useNavigate hook to programmatically navigate between routes
  const navigateTo = useNavigate();

  // Function to navigate to the home page ("/") and toggle the sidebar visibility
  const gotoHomePage = () => {
    navigateTo("/"); // Navigate to the home page route
    setShow(!show); // Toggle the visibility of the sidebar
  };

  // Function to navigate to the doctors page and toggle the sidebar visibility
  const gotoDoctorsPage = () => {
    navigateTo("/doctors"); // Navigate to the doctors page route
    setShow(!show); // Toggle the sidebar visibility
  };

  // Function to navigate to the messages page and toggle the sidebar visibility
  const gotoMessagesPage = () => {
    navigateTo("/messages"); // Navigate to the messages page route
    setShow(!show); // Toggle the sidebar visibility
  };

  // Function to navigate to the 'Add New Doctor' page and toggle the sidebar visibility
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew"); // Navigate to the 'Add New Doctor' page
    setShow(!show); // Toggle the sidebar visibility
  };

  // Function to navigate to the 'Add New Admin' page and toggle the sidebar visibility
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew"); // Navigate to the 'Add New Admin' page
    setShow(!show); // Toggle the sidebar visibility
  };

  return (
    <>
      {/* Navigation menu (sidebar) that is only visible when the user is authenticated */}
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }} // Conditionally hide the sidebar if the user is not authenticated
        className={show ? "show sidebar" : "sidebar"} // Add 'show' class to sidebar if the 'show' state is true
      >
        {/* Links section containing the icons for navigation */}
        <div className="links">
          <TiHome onClick={gotoHomePage} /> {/* Home icon, navigates to the home page when clicked */}
          <FaUserDoctor onClick={gotoDoctorsPage} /> {/* Doctor icon, navigates to the doctors page when clicked */}
          <MdAddModerator onClick={gotoAddNewAdmin} /> {/* Add Admin icon, navigates to the 'Add New Admin' page */}
          <IoPersonAddSharp onClick={gotoAddNewDoctor} /> {/* Add Doctor icon, navigates to the 'Add New Doctor' page */}
          <AiFillMessage onClick={gotoMessagesPage} /> {/* Messages icon, navigates to the messages page */}
          <RiLogoutBoxFill onClick={handleLogout} /> {/* Logout icon, triggers the logout process when clicked */}
        </div>
      </nav>

      {/* Hamburger menu wrapper that is only shown when the user is authenticated */}
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }} // Conditionally hide the hamburger menu if the user is not authenticated
      >
        {/* Hamburger menu icon to toggle the sidebar visibility */}
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} /> {/* Toggle sidebar visibility when clicked */}
      </div>
    </>
  );
};

export default Sidebar;
