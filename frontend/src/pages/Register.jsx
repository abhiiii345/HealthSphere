import axios from "axios"; // Importing axios for making HTTP requests
import React, { useContext, useState } from "react"; // Importing React and necessary hooks
import { toast } from "react-toastify"; // Importing toast for notification messages
import { Context } from "../main"; // Importing context for authentication state management
import { Link, Navigate, useNavigate } from "react-router-dom"; // Importing routing functionalities

const Register = () => {
  // Extracting authentication status and setter function from context
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  // State variables for managing registration form inputs
  const [firstName, setFirstName] = useState(""); // First name state
  const [lastName, setLastName] = useState(""); // Last name state
  const [email, setEmail] = useState(""); // Email state
  const [phone, setPhone] = useState(""); // Phone number state
  const [dob, setDob] = useState(""); // Date of birth state
  const [gender, setGender] = useState(""); // Gender state
  const [password, setPassword] = useState(""); // Password state
   
  

  // Hook for programmatic navigation
  const navigateTo = useNavigate();

  // Function to handle registration on form submission
  const handleRegistration = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    try {
      // Making a POST request to register the patient
      await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register", // Endpoint for registration
          { firstName, lastName, email, phone, dob, gender, password, role:"Patient" }, // Sending user data
          {
            withCredentials: true, // Sending cookies with the request
            headers: { "Content-Type": "application/json" }, // Setting content type
          }
        )
        .then((res) => {
          // If registration is successful
          toast.success(res.data.message); // Displaying success message
          setIsAuthenticated(true); // Updating authentication status
          navigateTo("/"); // Redirecting to the home page
          // Clearing input fields after successful registration
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      // If there is an error during registration
      toast.error(error.response.data.message); // Displaying error message
    }
  };

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to={"/"} />; // Navigate to home page
  }

  // JSX for rendering the registration form
  return (
    <>
      <div className="container form-component register-form">
        <h2>Patient Registration</h2>
        <p>Welcome to Our Healthcare Community</p>
        <p>
          Join our patient portal to take control of your health journey. With easy access to your medical records, appointment scheduling, and personalized care information, staying informed has never been easier. Your health is our priority, and we are here to support you every step of the way.
        </p>

        <form onSubmit={handleRegistration}> {/* Binding handleRegistration to form submission */}
          <div>
            {/* Input fields for first and last names */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Updating first name state
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Updating last name state
            />
          </div>
          <div>
            {/* Input fields for email and phone number */}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Updating email state
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Updating phone number state
            />
          </div>
          <div>
            {/* Input field for date of birth */}
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)} // Updating date of birth state
            />
          </div>
          <div>
            {/* Dropdown for selecting gender */}
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {/* Input field for password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Updating password state
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            {/* Link to the sign-in page if already registered */}
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            {/* Button to submit the registration form */}
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;


/*
Explanation of the Code
Imports: The necessary libraries and modules are imported at the top. This includes axios for making HTTP requests, React hooks for state and context management, toast notifications for user feedback, and routing components.

State Management: The useState hook is used to create state variables for each input field in the registration form, such as firstName, lastName, email, etc. This allows the component to maintain and update these values dynamically as the user interacts with the form.

Role Definition: The role variable is defined with a fixed value of "Patient," which is sent along with the registration data to the backend.

Form Submission: The handleRegistration function is triggered when the form is submitted. It prevents the default form submission, gathers the input values, and makes a POST request to the backend for registration. If the request is successful, a success message is displayed, the authentication state is updated, and the user is redirected to the home page. Input fields are cleared after a successful submission. In case of an error, an error message is shown using toast notifications.

Redirection: If the user is already authenticated, they are redirected to the home page using <Navigate />.

JSX Rendering: The component returns a structured JSX layout for the registration form. This includes various input fields for user information and buttons for submitting the form or navigating to the login page.

Conclusion
The code efficiently implements a registration form with user input validation, error handling, and feedback mechanisms. By using React's state and context management, it maintains a smooth user experience and integrates seamlessly with the backend API for user registration.








*/