// Importing necessary libraries and components
import axios from "axios"; // Axios for making HTTP requests
import React, { useEffect } from "react"; // React and useEffect hook for side effects
import { useState } from "react"; // useState hook for managing component state
import { toast } from "react-toastify"; // react-toastify for displaying notifications

// Define the AppointmentForm component
const AppointmentForm = () => {
  // State variables for capturing user input
  const [firstName, setFirstName] = useState(""); // Stores the user's first name
  const [lastName, setLastName] = useState(""); // Stores the user's last name
  const [email, setEmail] = useState(""); // Stores the user's email
  const [phone, setPhone] = useState(""); // Stores the user's phone number
  const [dob, setDob] = useState(""); // Stores the user's date of birth
  const [gender, setGender] = useState(""); // Stores the user's gender
  const [appointmentDate, setAppointmentDate] = useState(""); // Stores the desired appointment date
  const [department, setDepartment] = useState("Pediatrics"); // Stores the selected department, default is "Pediatrics"
  const [doctorFirstName, setDoctorFirstName] = useState(""); // Stores the selected doctor's first name
  const [doctorLastName, setDoctorLastName] = useState(""); // Stores the selected doctor's last name
  const [address, setAddress] = useState(""); // Stores the user's address
  const [hasVisited, setHasVisited] = useState(false); // Stores whether the user has visited before

  // Array of available departments
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

  // State to store the list of doctors fetched from the server
  const [doctors, setDoctors] = useState([]);

  // useEffect hook to fetch the list of doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Make a GET request to fetch doctors, including credentials
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors); // Update the doctors state with fetched data
        console.log(data.doctors); // Log the doctors data for debugging
      } catch (error) {
        // Handle errors during the fetch operation
        console.error("Error fetching doctors:", error);
        toast.error("Failed to load doctors. Please try again later."); // Show error notification
      }
    };
    fetchDoctors(); // Invoke the fetchDoctors function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handler function for form submission
  const handleAppointment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const hasVisitedBool = Boolean(hasVisited); // Convert hasVisited to a boolean
      // Make a POST request to submit the appointment data
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          appointment_date: appointmentDate, // Note: the API expects 'appointment_date'
          department,
          doctor_firstName: doctorFirstName, // Note: the API expects 'doctor_firstName'
          doctor_lastName: doctorLastName, // Note: the API expects 'doctor_lastName'
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true, // Include credentials in the request
          headers: { "Content-Type": "application/json" }, // Specify content type
        }
      );
      toast.success(data.message); // Show success notification with message from the server

      // Reset all form fields to their initial states
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics"); // Reset to default department
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false); // Reset checkbox to unchecked
      setAddress("");
    } catch (error) {
      // Handle errors during the appointment submission
      console.error("Error submitting appointment:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Show error message from the server
      } else {
        toast.error("An unexpected error occurred. Please try again."); // Generic error message
      }
    }
  };

  // JSX to render the appointment form
  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          {/* First Name and Last Name Inputs */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update firstName state on input change
              required // Make the field required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update lastName state on input change
              required // Make the field required
            />
          </div>
          
          {/* Email and Phone Number Inputs */}
          <div>
            <input
              type="email" // Use email type for validation
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              required // Make the field required
            />
            <input
              type="tel" // Use tel type for better mobile keypad
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update phone state on input change
              required // Make the field required
            />
          </div>
          
          {/* Date of Birth Input */}
          <div>
            <input
              type="date" // Date picker for date of birth
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)} // Update dob state on input change
              required // Make the field required
            />
          </div>
          
          {/* Gender and Appointment Date Inputs */}
          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)} // Update gender state on selection
              required // Make the field required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* You can add more gender options if needed */}
            </select>
            <input
              type="date" // Date picker for appointment date
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)} // Update appointmentDate state on input change
              required // Make the field required
            />
          </div>
          
          {/* Department and Doctor Selection */}
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value); // Update department state on selection
                setDoctorFirstName(""); // Reset doctor first name when department changes
                setDoctorLastName(""); // Reset doctor last name when department changes
              }}
              required // Make the field required
            >
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
            <select
              value={`${doctorFirstName} ${doctorLastName}`} // Combine first and last name for display
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" "); // Split the selected value into first and last names
                setDoctorFirstName(firstName); // Update doctor's first name
                setDoctorLastName(lastName); // Update doctor's last name
              }}
              disabled={!department} // Disable if no department is selected
              required // Make the field required
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department) // Filter doctors by selected department
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`} // Set option value as "FirstName LastName"
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName} {/* Display doctor's full name */}
                  </option>
                ))}
            </select>
          </div>
          
          {/* Address Textarea */}
          <textarea
            rows="10" // Set number of visible text lines
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Update address state on input change
            placeholder="Address"
            required // Make the field required
          />
          
          {/* Checkbox for Previous Visits */}
          <div
            style={{
              gap: "10px", // Space between elements
              justifyContent: "flex-end", // Align items to the end
              flexDirection: "row", // Arrange items in a row
              display: "flex", // Use flexbox layout
              alignItems: "center", // Center items vertically
              marginTop: "10px", // Add top margin
            }}
          >
            <label style={{ marginBottom: 0 }}>Have you visited before?</label>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)} // Update hasVisited state on checkbox toggle
              style={{ flex: "none", width: "25px", height: "25px" }} // Style the checkbox
            />
          </div>
          
          {/* Submit Button */}
          <button type="submit" style={{ margin: "20px auto", display: "block" }}>
            GET APPOINTMENT
          </button>
        </form>
      </div>
    </>
  );
};

// Export the component as default
export default AppointmentForm;
/*
Component State Management
State Variables:
The component maintains several state variables using the useState hook to capture user inputs like firstName, lastName, email, phone, etc.
departmentsArray: An array listing all available departments for appointments.
doctors: An array to store the list of doctors fetched from the server based on the selected department.
Fetching Doctors Data
Fetching Doctors (useEffect):
On component mount, the useEffect hook triggers the fetchDoctors asynchronous function.
fetchDoctors: Makes a GET request to the backend endpoint (http://localhost:4000/api/v1/user/doctors) to retrieve the list of available doctors.
The fetched doctors are stored in the doctors state variable and logged to the console for debugging.
Error handling ensures that if the fetch fails, an error message is logged and a toast notification is displayed to inform the user.
Handling Form Submission
Form Submission (handleAppointment):
When the form is submitted, the handleAppointment function prevents the default form behavior and proceeds to send the appointment data to the server.
The function constructs an object containing all the necessary appointment details, including user information and selected doctor.
API Request: Sends a POST request to http://localhost:4000/api/v1/appointment/post with the appointment data.
Success Handling: If the request is successful, a success toast notification is displayed with the message from the server, and all form fields are reset to their initial states.
Error Handling: If there's an error during submission, it captures and displays the error message from the server or a generic error message if the server response is unavailable.
Rendering the Form
Form Structure:
User Information Fields: Inputs for first name, last name, email, and phone number, all of which are required.
Additional Information: Includes date of birth (with a date picker), gender selection, and appointment date.
Department and Doctor Selection:
Department Dropdown: Users can select from a predefined list of departments. Changing the department resets the selected doctor.
Doctor Dropdown: Populated based on the selected department. It lists doctors who belong to the chosen department. The dropdown is disabled until a department is selected.
Address: A textarea for users to enter their address, which is a required field.
Previous Visits Checkbox: A checkbox allowing users to indicate if they have visited before. Styled for better appearance and usability.
Submit Button: A button to submit the form and request an appointment.
Styling and Accessibility
Styling:

Inline styles are used for layout adjustments, such as spacing, alignment, and display properties, ensuring the form is user-friendly and visually appealing.
The submit button is styled to stand out and be easily clickable.
Accessibility:

All form fields have appropriate type attributes to enhance accessibility and validation (e.g., type="email", type="tel", type="date").
Labels and placeholders guide users in providing the correct information.
Error Handling and User Feedback
User Feedback:
Success and error toast notifications provide immediate feedback to users about the status of their appointment request.
Console logging aids in debugging during development but should be removed or minimized in production for security and performance reasons.
Exporting the Component
Export:
The AppointmentForm component is exported as the default export, making it available for import and use in other parts of the application.
Overall Functionality
The AppointmentForm component is a comprehensive form that allows users to book appointments by providing necessary personal information, selecting a department and a corresponding doctor, and specifying the desired appointment date. It interacts with a backend server to fetch available doctors and submit appointment requests. The form ensures data integrity through required fields and provides user feedback via notifications, enhancing the user experience. Proper state management and error handling make the form robust and reliable.
*/