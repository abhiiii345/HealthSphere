// Importing the axios library for making HTTP requests
import axios from "axios";

// Importing React and the useState hook for managing component state
import React, { useState } from "react";

// Importing the toast function from react-toastify for displaying notifications
import { toast } from "react-toastify";

// Defining the MessageForm functional component
const MessageForm = () => {
  // Declaring state variables for first name, last name, email, phone, and message using the useState hook
  const [firstName, setFirstName] = useState(""); // State for storing the user's first name
  const [lastName, setLastName] = useState("");   // State for storing the user's last name
  const [email, setEmail] = useState("");         // State for storing the user's email address
  const [phone, setPhone] = useState("");         // State for storing the user's phone number
  const [message, setMessage] = useState("");     // State for storing the user's message

  /**
   * handleMessage is an asynchronous function that handles form submission.
   * It prevents the default form submission behavior, sends the form data to the server,
   * and handles success and error responses.
   *
   * @param {Object} e - The event object from the form submission
   */
  const handleMessage = async (e) => {
    e.preventDefault(); // Prevents the default form submission which would reload the page

    try {
      // Sending a POST request to the server with the form data
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send", // The API endpoint to send the message
          { firstName, lastName, email, phone, message }, // The data payload containing form inputs
          {
            withCredentials: true, // Indicates whether or not cross-site Access-Control requests should be made using credentials
            headers: { "Content-Type": "application/json" }, // Sets the content type of the request to JSON
          }
        )
        .then((res) => {
          // Handling the successful response from the server
          toast.success(res.data.message); // Displaying a success notification with the message from the server

          // Resetting all form fields to empty strings after successful submission
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      // Handling any errors that occur during the request
      toast.error(error.response.data.message); // Displaying an error notification with the error message from the server
    }
  };

  // The JSX returned by the component, rendering the form and its elements
  return (
    <>
      <div className="container form-component message-form">
        <h2>Send Us A Message</h2>
        {/* Form element with an onSubmit handler to handleMessage */}
        <form onSubmit={handleMessage}>
          <div>
            {/* Input field for First Name */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName} // Binds the input value to the firstName state
              onChange={(e) => setFirstName(e.target.value)} // Updates the firstName state on input change
            />
            {/* Input field for Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName} // Binds the input value to the lastName state
              onChange={(e) => setLastName(e.target.value)} // Updates the lastName state on input change
            />
          </div>
          <div>
            {/* Input field for Email */}
            <input
              type="text"
              placeholder="Email"
              value={email} // Binds the input value to the email state
              onChange={(e) => setEmail(e.target.value)} // Updates the email state on input change
            />
            {/* Input field for Mobile Number */}
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone} // Binds the input value to the phone state
              onChange={(e) => setPhone(e.target.value)} // Updates the phone state on input change
            />
          </div>
          {/* Textarea for the Message */}
          <textarea
            rows={7} // Sets the number of visible text lines for the control
            placeholder="Message"
            value={message} // Binds the textarea value to the message state
            onChange={(e) => setMessage(e.target.value)} // Updates the message state on input change
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            {/* Submit button to send the form data */}
            <button type="submit">Send</button>
          </div>
        </form>
        {/* Image displayed below the form */}
        <img src="/Vector.png" alt="vector" />
      </div>
    </>
  );
};

// Exporting the MessageForm component as the default export
export default MessageForm;



/*
Detailed Explanation of the MessageForm Component
The MessageForm component is a React functional component designed to render a user-friendly form that allows visitors to send messages. Here's a step-by-step breakdown of its functionality and how different parts interact:

Imports:

axios: A promise-based HTTP client used to make requests to the backend server.
React and useState: React is the library for building user interfaces, and useState is a React hook that allows the component to manage its internal state.
toast from react-toastify: A library for displaying notifications (toasts) to inform users about the success or failure of their actions.
State Management:

The component maintains five pieces of state using the useState hook:
firstName: Stores the user's first name.
lastName: Stores the user's last name.
email: Stores the user's email address.
phone: Stores the user's phone number.
message: Stores the message the user wants to send.
Each state variable is initialized to an empty string and has a corresponding setter function (e.g., setFirstName) to update its value.
handleMessage Function:

Purpose: Handles the form submission process.
Functionality:
Prevent Default Behavior: The function begins by calling e.preventDefault() to stop the default form submission, which would typically reload the page.
Sending Data:
It uses axios.post to send a POST request to the server endpoint "http://localhost:4000/api/v1/message/send".
The payload includes the form data: firstName, lastName, email, phone, and message.
The request includes configuration options:
withCredentials: true ensures that cookies are sent with the request if needed (useful for authentication).
headers: { "Content-Type": "application/json" } sets the content type to JSON, indicating the format of the sent data.
Handling Response:
Success: If the request is successful, the .then block executes:
Displays a success toast notification using toast.success, showing the message received from the server (res.data.message).
Resets all form fields to empty strings, effectively clearing the form for the user.
Error: If an error occurs during the request, the catch block executes:
Displays an error toast notification using toast.error, showing the error message received from the server (error.response.data.message).
Rendering the Form:

The component returns JSX that renders the form within a container div.
Form Structure:
Heading: <h2>Send Us A Message</h2> provides a title for the form.
Form Element: <form onSubmit={handleMessage}> attaches the handleMessage function to the form's submit event.
Input Fields:
First and Last Name: Two text input fields for the user's first and last names. Each input's value is bound to its respective state variable, and any changes to the input update the state.
Email and Mobile Number: Two input fields for the user's email and phone number. The phone input is of type number to ensure only numerical input.
Message Textarea: A larger text area where the user can type their message. It is bound to the message state.
Submit Button: A button labeled "Send" that submits the form when clicked.
Image: An image is displayed below the form, sourced from /Vector.png, likely serving as a decorative or illustrative element.
Exporting the Component:

The MessageForm component is exported as the default export, allowing it to be imported and used in other parts of the application.
How the Code Works Together
User Interaction:

When a user fills out the form fields (First Name, Last Name, Email, Mobile Number, and Message), each input updates the corresponding state variable in real-time thanks to the onChange handlers.
Form Submission:

Upon clicking the "Send" button, the form triggers the handleMessage function due to the onSubmit event handler.
Data Handling and Communication:

The handleMessage function gathers all the state data and sends it as a JSON payload to the specified backend API endpoint using axios.
The withCredentials: true option ensures that any necessary credentials (like cookies) are included with the request, which can be important for authentication or session management on the server side.
Feedback to the User:

If the server responds successfully, a success toast notification appears, informing the user that their message was sent successfully. The form fields are then cleared, providing a clean slate for any further messages.
If an error occurs (e.g., network issues, server errors, validation failures), an error toast notification informs the user of the problem, allowing them to take corrective action.
Visual Elements:

The form is styled using CSS classes (container, form-component, message-form) to ensure it fits seamlessly within the application's design.
The included image (/Vector.png) adds visual appeal or conveys additional information related to messaging or communication.
Summary
The MessageForm component is a well-structured React form that enables users to send messages to the server. It leverages state management to handle user input, uses axios to communicate with a backend API, and provides immediate feedback to users through toast notifications. The component ensures a smooth user experience by handling both successful submissions and potential errors gracefully.

*/