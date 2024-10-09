import React, { useContext, useState } from "react"; // Importing React and necessary hooks
import { Context } from "../main"; // Importing the Context for authentication
import { Navigate, useNavigate } from "react-router-dom"; // Importing components for routing
import { toast } from "react-toastify"; // Importing toast for notifications
import axios from "axios"; // Importing axios for making HTTP requests

const AddNewAdmin = () => {
  // Destructuring isAuthenticated and setIsAuthenticated from context
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); 

  // State variables for storing form input values
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [email, setEmail] = useState(""); // State for email
  const [phone, setPhone] = useState(""); // State for phone number
  const [dob, setDob] = useState(""); // State for date of birth
  const [gender, setGender] = useState(""); // State for gender
  const [password, setPassword] = useState(""); // State for password

  const navigateTo = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handleAddNewAdmin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Sending a POST request to add a new admin
      await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew", // API endpoint
        { firstName, lastName, email, phone, dob, gender, password }, // Request body
        {
          withCredentials: true, // Allow sending cookies with the request
          headers: { "Content-Type": "application/json" }, // Set content type to JSON
        }
      ).then((res) => {
        // On successful response
        toast.success(res.data.message); // Show success notification
        setIsAuthenticated(true); // Update authentication state
        navigateTo("/"); // Redirect to home page
        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDob("");
        setGender("");
        setPassword("");
      });
    } catch (error) {
      // On error response
      toast.error(error.response.data.message); // Show error notification
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />; // Navigate to the login page
  }

  return (
    <section className="page"> 
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo" /> {/* Logo image */}
        <h1 className="form-title">Add a New Administrator</h1> {/* Form title */}
        <form onSubmit={handleAddNewAdmin}> {/* Form submission handler */}
          <div>
            {/* Input field for first name */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update state on change
            />
            {/* Input field for last name */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update state on change
            />
          </div>
          <div>
            {/* Input field for email */}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
            {/* Input field for mobile number */}
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update state on change
            />
          </div>
          <div>
            {/* Input field for date of birth */}
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)} // Update state on change
            />
            {/* Dropdown for selecting gender */}
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option> {/* Default option */}
              <option value="Male">Male</option> {/* Male option */}
              <option value="Female">Female</option> {/* Female option */}
            </select>
            {/* Input field for password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            {/* Submit button */}
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin; // Exporting the component
