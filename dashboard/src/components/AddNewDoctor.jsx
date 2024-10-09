import React, { useContext, useState } from "react"; // Import necessary hooks and modules from React
import { Navigate, useNavigate } from "react-router-dom"; // Import routing functions for navigation
import { toast } from "react-toastify"; // Import toast notifications for user feedback
import { Context } from "../main"; // Import context for authentication state
import axios from "axios"; // Import axios for making HTTP requests

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Get authentication state from context

  // State variables for storing user inputs
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [email, setEmail] = useState(""); // State for email
  const [phone, setPhone] = useState(""); // State for phone number
  const [dob, setDob] = useState(""); // State for date of birth
  const [gender, setGender] = useState(""); // State for gender
  const [password, setPassword] = useState(""); // State for password
  const [doctorDepartment, setDoctorDepartment] = useState(""); // State for doctor's department
  const [docAvatar, setDocAvatar] = useState(""); // State for doctor's avatar file
  const [docAvatarPreview, setDocAvatarPreview] = useState(""); // State for previewing doctor's avatar

  const navigateTo = useNavigate(); // Hook for programmatic navigation

  // Array of available departments for the doctor
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // Function to handle avatar file input and preview
  const handleAvatar = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const reader = new FileReader(); // Create a new FileReader instance
    reader.readAsDataURL(file); // Read the file as a Data URL
    reader.onload = () => {
      setDocAvatarPreview(reader.result); // Set the preview state with the file result
      setDocAvatar(file); // Set the avatar state with the file object
    };
  };

  // Function to handle form submission for adding a new doctor
  const handleAddNewDoctor = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(); // Create a FormData object to send the form data
      formData.append("firstName", firstName); // Append first name to form data
      formData.append("lastName", lastName); // Append last name to form data
      formData.append("email", email); // Append email to form data
      formData.append("phone", phone); // Append phone to form data
      formData.append("password", password); // Append password to form data
      formData.append("dob", dob); // Append date of birth to form data
      formData.append("gender", gender); // Append gender to form data
      formData.append("doctorDepartment", doctorDepartment); // Append doctor's department to form data
      formData.append("docAvatar", docAvatar); // Append doctor's avatar file to form data

      // Make a POST request to add a new doctor
      await axios.post("http://localhost:4000/api/v1/user/doctor/addnew", formData, {
        withCredentials: true, // Include credentials for authentication
        headers: { "Content-Type": "multipart/form-data" }, // Set the content type for the request
      }).then((res) => {
        toast.success(res.data.message); // Show success message from response
        setIsAuthenticated(true); // Update authentication state
        navigateTo("/"); // Navigate to the home page
        // Clear the input fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDob("");
        setGender("");
        setPassword("");
      });
    } catch (error) {
      toast.error(error.response.data.message); // Show error message if request fails
    }
  };

  // Redirect to login page if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Render the form for adding a new doctor
  return (
    <section className="page"> {/* Main section for the page */}
      <section className="container add-doctor-form"> {/* Container for the form */}
        <img src="/logo.png" alt="logo" className="logo"/> {/* Logo image */}
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1> {/* Form title */}
        <form onSubmit={handleAddNewDoctor}> {/* Form submission handler */}
          <div className="first-wrapper"> {/* Wrapper for the form inputs */}
            <div> {/* Div for the avatar input */}
              <img
                src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} // Display avatar preview or placeholder
                alt="Doctor Avatar" // Alt text for accessibility
              />
              <input type="file" onChange={handleAvatar} /> {/* File input for avatar */}
            </div>
            <div> {/* Div for text inputs */}
              <input
                type="text"
                placeholder="First Name" // Placeholder for first name
                value={firstName} // Current value of first name
                onChange={(e) => setFirstName(e.target.value)} // Update state on input change
              />
              <input
                type="text"
                placeholder="Last Name" // Placeholder for last name
                value={lastName} // Current value of last name
                onChange={(e) => setLastName(e.target.value)} // Update state on input change
              />
              <input
                type="text"
                placeholder="Email" // Placeholder for email
                value={email} // Current value of email
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
              <input
                type="number"
                placeholder="Mobile Number" // Placeholder for phone number
                value={phone} // Current value of phone number
                onChange={(e) => setPhone(e.target.value)} // Update state on input change
              />
              <input
                type={"date"} // Date input for date of birth
                placeholder="Date of Birth" // Placeholder for date of birth
                value={dob} // Current value of date of birth
                onChange={(e) => setDob(e.target.value)} // Update state on input change
              />
              <select
                value={gender} // Current value of gender
                onChange={(e) => setGender(e.target.value)} // Update state on input change
              >
                <option value="">Select Gender</option> {/* Default option */}
                <option value="Male">Male</option> {/* Male option */}
                <option value="Female">Female</option> {/* Female option */}
              </select>
              <input
                type="password"
                placeholder="Password" // Placeholder for password
                value={password} // Current value of password
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
              />
              <select
                value={doctorDepartment} // Current value of doctor department
                onChange={(e) => {
                  setDoctorDepartment(e.target.value); // Update state on input change
                }}
              >
                <option value="">Select Department</option> {/* Default option for department */}
                {departmentsArray.map((depart, index) => { // Map through departments array to create options
                  return (
                    <option value={depart} key={index}> {/* Render department option */}
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Doctor</button> {/* Submit button */}
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor; // Export the component for use in other parts of the application
