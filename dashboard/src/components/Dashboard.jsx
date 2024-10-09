import React, { useContext, useEffect, useState } from "react"; 
// Imports necessary React hooks and libraries. `useContext` is used to access global state, `useEffect` for lifecycle methods, and `useState` for managing component state.

import { Context } from "../main";
// Imports the `Context` to access global authentication and admin state.

import { Navigate } from "react-router-dom"; 
// Imports `Navigate` to programmatically redirect users if they are not authenticated.

import axios from "axios"; 
// Imports `axios` for making HTTP requests to the backend API.

import { toast } from "react-toastify"; 
// Imports `toast` for displaying success or error messages as notifications.

import { GoCheckCircleFill } from "react-icons/go"; 
// Imports the checkmark icon from the `react-icons` library.

import { AiFillCloseCircle } from "react-icons/ai"; 
// Imports the close icon from the `react-icons` library for indicating an unvisited appointment.

const Dashboard = () => { 
  // Defines the `Dashboard` functional component.

  const [appointments, setAppointments] = useState([]); 
  // Initializes state `appointments` to store appointment data. It is initially an empty array.

  useEffect(() => { 
    // `useEffect` runs after the component mounts. It is used here to fetch appointments from the backend.
    
    const fetchAppointments = async () => { 
      // Defines an asynchronous function `fetchAppointments` to fetch appointment data from the server.
      
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall", 
          // Makes a GET request to fetch all appointments from the API.
          { withCredentials: true } 
          // Ensures that credentials like cookies are sent with the request.
        );
        setAppointments(data.appointments); 
        // If the request is successful, updates the `appointments` state with the fetched data.
        
      } catch (error) { 
        // Catches any error if the request fails.
        setAppointments([]); 
        // If there's an error, resets `appointments` to an empty array.
      }
    };

    fetchAppointments(); 
    // Calls the `fetchAppointments` function when the component mounts.

  }, []); 
  // The empty array `[]` as a dependency ensures that this effect runs only once when the component is mounted.

  const handleUpdateStatus = async (appointmentId, status) => { 
    // Defines an asynchronous function to update the status of a particular appointment.
    
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`, 
        // Makes a PUT request to update the status of an appointment by its ID.
        
        { status }, 
        // Sends the updated status in the request body.
        
        { withCredentials: true }
        // Ensures that credentials like cookies are sent with the request.
      );
      
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status } 
            // If the appointment ID matches, updates the status of that particular appointment.
            : appointment
        )
      );
      toast.success(data.message); 
      // Displays a success message when the status is successfully updated.

    } catch (error) {
      toast.error(error.response.data.message); 
      // Displays an error message if the status update fails.
    }
  };

  const { isAuthenticated, admin } = useContext(Context); 
  // Retrieves the `isAuthenticated` and `admin` values from the global context to check if the user is logged in and to get admin details.
  
  if (!isAuthenticated) { 
    // If the user is not authenticated, redirect them to the login page.
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        {/* Dashboard section where the main content of the page is rendered */}

        <div className="banner">
          {/* First row of boxes with admin info and counts */}

          <div className="firstBox">
            {/* Displays the admin's image and greeting */}
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin && `${admin.firstName} ${admin.lastName}`}{" "}
                  {/* Displays the admin's name if available */}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
                {/* Placeholder description text */}
              </p>
            </div>
          </div>

          <div className="secondBox">
            {/* Box displaying the total number of appointments */}
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
            {/* Dynamically displays the length of the `appointments` array */}
          </div>

          <div className="thirdBox">
            {/* Box displaying the total number of registered doctors */}
            <p>Registered Doctors</p>
            <h3>9</h3>
            {/* Currently hardcoded number of doctors, can be replaced with dynamic data */}
          </div>
        </div>

        <div className="banner">
          {/* Second section with appointments table */}
          <h5>Appointments</h5>
          <table>
            <thead>
              {/* Table header */}
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {/* Table body where appointment data is rendered */}
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    // Loops over the `appointments` array to render each appointment in a table row.
                    <tr key={appointment._id}>
                      {/* Displays patient's full name */}
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      {/* Displays appointment date */}
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      {/* Displays doctor's full name */}
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      {/* Displays department */}
                      <td>{appointment.department}</td>
                      {/* Dropdown for updating appointment status */}
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      {/* Displays whether the patient has visited the appointment */}
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  ))
                : "No Appointments Found!"}
                {/* If there are no appointments, displays a "No Appointments Found!" message */}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
