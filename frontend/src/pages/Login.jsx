import axios from "axios"; // Axios is used for making HTTP requests to the backend API.
import React, { useContext, useState } from "react"; // Importing React, useContext for accessing global context, and useState for managing component state.
import { toast } from "react-toastify"; // Toast notifications for showing success or error messages.
import { Context } from "../main"; // Importing the authentication context to check the user's authentication status.
import { Link, useNavigate, Navigate } from "react-router-dom"; // Link is used for navigation without page refresh, useNavigate is a hook for programmatic navigation, and Navigate is used for redirecting authenticated users.

const Login = () => {
  // Login component definition
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); 
  // Accessing the global authentication state from the context (isAuthenticated: true/false, setIsAuthenticated: function to update authentication state)

  // State variables to handle form inputs
  const [email, setEmail] = useState(""); // Email field for the login form.
  const [password, setPassword] = useState(""); // Password field for the login form.
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password field for matching passwords.

  const navigateTo = useNavigate(); // Hook to programmatically navigate between pages after successful login.

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior (which would refresh the page).
    try {
      // Making a POST request to the login API
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login", // API endpoint for user login
          { 
            email, 
            password, 
            confirmPassword, 
            role: "Patient" // Sending email, password, and confirm password along with the user role (hardcoded as "Patient")
          },
          {
            withCredentials: true, // Ensures cookies like JWT tokens are included in the request.
            headers: { "Content-Type": "application/json" }, // Specifies JSON content type for the request.
          }
        )
        .then((res) => {
          // When the login is successful, a response is returned.
          toast.success(res.data.message); // Show a success notification with the message from the server.
          setIsAuthenticated(true); // Update the global state to indicate that the user is authenticated.
          navigateTo("/"); // Redirect to the home page upon successful login.
          setEmail(""); // Reset email input field after successful login.
          setPassword(""); // Reset password input field.
          setConfirmPassword(""); // Reset confirm password input field.
        });
    } catch (error) {
      // If the login fails, catch the error and handle it.
      toast.error(error.response.data.message); // Display an error notification with the error message from the server.
    }
  };

  // If the user is already authenticated, redirect them to the home page
  if (isAuthenticated) {
    return <Navigate to={"/"} />; // Redirect to the home page if the user is already logged in.
  }

  return (
    <>
      {/* Login form container */}
      <div className="container form-component login-form">
        <h2>Patient Portal Login</h2>
        {/* Informational text */}
        <p>Access your medical records, appointments, and more</p>
        <p>
          Welcome to our hospital's patient portal. Stay connected with your healthcare team, view your test results, and manage your appointments at your convenience. Your health, our priority.
        </p>

        {/* Form submission handler */}
        <form onSubmit={handleLogin}>
          {/* Email input field */}
          <input
            type="text"
            placeholder="Email" // Placeholder to guide the user.
            value={email} // The current value of the email input.
            onChange={(e) => setEmail(e.target.value)} // Updates the email state when the user types.
          />
          {/* Password input field */}
          <input
            type="password"
            placeholder="Password" // Placeholder for password input.
            value={password} // The current value of the password input.
            onChange={(e) => setPassword(e.target.value)} // Updates the password state when the user types.
          />
          {/* Confirm Password input field */}
          <input
            type="password"
            placeholder="Confirm Password" // Placeholder for confirm password input.
            value={confirmPassword} // The current value of the confirm password input.
            onChange={(e) => setConfirmPassword(e.target.value)} // Updates the confirm password state when the user types.
          />
          
          {/* Section to guide users to register if they are not already registered */}
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p> {/* Text to prompt registration */}
            <Link
              to={"/register"} // Link to the registration page.
              style={{ textDecoration: "none", color: "#271776ca" }} // Styling for the link to make it look like a button or colored text.
            >
              Register Now
            </Link>
          </div>
          
          {/* Submit button to trigger the login process */}
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button> {/* Button that submits the form */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;


/*
Summary of the Login Component
Purpose:

The Login component is designed to allow patients to log into their accounts in the hospital's patient portal. It facilitates user authentication and manages the state of the user’s login status.
User Interface:

The component displays a user-friendly login form that prompts users to enter their email and password. It includes a brief introduction about the patient portal, emphasizing accessibility to medical records and appointments.
State Management:

It uses React's useState hook to manage the values of the email and password inputs, as well as a confirm password field. This state management ensures that the component can dynamically reflect user inputs.
Context Usage:

The component accesses global authentication state through the Context created in the main application. This allows it to read whether the user is currently authenticated and to update this state after a successful login.
Login Process:

When the user submits the login form, an asynchronous function (handleLogin) is triggered. This function sends the user's credentials to the backend API for verification using Axios. If the credentials are valid, the user is marked as authenticated, and they are redirected to the home page.
User Feedback:

The component utilizes the react-toastify library to provide immediate feedback to the user. It shows success messages upon successful login and error messages for failed attempts, enhancing the user experience.
Redirection:

If the user is already authenticated, they are automatically redirected to the home page using the Navigate component from React Router. This prevents authenticated users from accessing the login page again.
How It Works Together
The Login component plays a crucial role in the user experience of your hospital's patient portal. By combining state management, context, user feedback, and redirection, it ensures a smooth authentication process. Users can easily log in, receive appropriate notifications about their login attempts, and navigate seamlessly to their personalized content once authenticated.
In summary, the Login component is a vital part of your application that simplifies the authentication process for patients, ensuring they can quickly and securely access their medical information and manage their healthcare needs.








*/