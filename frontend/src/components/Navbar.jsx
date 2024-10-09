import React, { useContext, useState } from "react"; // Import necessary React modules
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation and useNavigate for programmatic navigation
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger menu icon from react-icons
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications
import { Context } from "../main"; // Import context for authentication state

const Navbar = () => {
  const [show, setShow] = useState(false); // State to toggle the visibility of the navigation menu
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Get authentication state from context

  // Function to handle user logout
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", { // Make a GET request to logout endpoint
        withCredentials: true, // Include credentials with the request
      })
      .then((res) => { // On success
        toast.success(res.data.message); // Show success message
        setIsAuthenticated(false); // Update authentication state
      })
      .catch((err) => { // On error
        toast.error(err.response.data.message); // Show error message
      });
  };

  const navigateTo = useNavigate(); // Hook for programmatic navigation

  // Function to navigate to the login page
  const goToLogin = () => {
    navigateTo("/login"); // Navigate to login route
  };

  return (
    <>
      <nav className={"container"}> {/* Main navigation container */}
        <div className="logo"> {/* Logo section */}
          <img src="/logo.png" alt="logo" className="logo-img" /> {/* Logo image */}
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}> {/* Conditional class based on menu state */}
          <div className="links"> {/* Navigation links section */}
            <Link to={"/"} onClick={() => setShow(!show)}> {/* Home link */}
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}> {/* Appointment link */}
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}> {/* About Us link */}
              About Us
            </Link>
          </div>
          {isAuthenticated ? ( // Conditional rendering based on authentication state
            <button className="logoutBtn btn" onClick={handleLogout}> {/* Logout button */}
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}> {/* Login button */}
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}> {/* Hamburger menu for mobile view */}
          <GiHamburgerMenu /> {/* Hamburger icon */}
        </div>
      </nav>
    </>
  );
};

export default Navbar; // Export the Navbar component


/*
Detailed Explanation of the Code
Imports:

React and its hooks (useContext, useState) are imported to create and manage the component's state.
Link and useNavigate from react-router-dom are used for navigation within the application.
The GiHamburgerMenu icon is imported from the react-icons library for the mobile menu.
axios is used for making HTTP requests to the backend API.
toast from react-toastify provides an easy way to display notifications.
Context is imported to manage global state, particularly for user authentication.
State Management:

A piece of state called show is created to control the visibility of the navigation menu on mobile devices.
The isAuthenticated and setIsAuthenticated are retrieved from the context to determine if the user is logged in.
Logout Functionality:

The handleLogout function makes a GET request to the logout endpoint of the API.
Upon successful logout, it shows a success message using toast and updates the authentication state.
If there’s an error, it shows an error message.
Navigation Handling:

useNavigate is utilized to programmatically navigate to the login page.
JSX Structure:

The nav element contains the logo, navigation links, and buttons.
The navigation links are wrapped in a div, with Link components allowing for navigation to different routes.
Depending on the isAuthenticated state, either a logout button or a login button is displayed.
A hamburger menu icon toggles the visibility of the navigation links for mobile users.
CSS Classes:

The visibility of the navigation links is toggled using a conditional class name (showmenu) that is determined by the show state.
Summary
The Navbar component is a responsive navigation bar that adapts to user authentication state and mobile views. It allows users to navigate between different sections of the application (Home, Appointment, About Us) and provides logout functionality if the user is authenticated. The hamburger menu enhances usability on smaller screens. Overall, it efficiently integrates routing, state management, and user interaction feedback through notification


*/