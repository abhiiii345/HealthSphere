import axios from "axios"; // Importing axios for making HTTP requests
import React, { useContext, useEffect, useState } from "react"; // Importing React and necessary hooks
import { toast } from "react-toastify"; // Importing toast for notifications (though not used in this code)
import { Context } from "../main"; // Importing the authentication context
import { Navigate } from "react-router-dom"; // Importing Navigate for redirecting users

// Defining the Messages component
const Messages = () => {
  // State to hold the list of messages
  const [messages, setMessages] = useState([]);
  
  // Getting authentication status from context
  const { isAuthenticated } = useContext(Context);
  
  // useEffect hook to fetch messages when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch messages from the server
    const fetchMessages = async () => {
      try {
        // Making a GET request to fetch all messages
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall", // URL of the API endpoint
          { withCredentials: true } // Sending cookies with the request (for authentication)
        );
        
        // Setting the messages state with the data received from the API
        setMessages(data.message);  // Accessing the 'message' key from the response
      } catch (error) {
        // Logging the error message if the request fails
        console.log(error.response.data.message);
      }
    };
    fetchMessages(); // Calling the fetchMessages function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the messages section
  return (
    <section className="page messages"> {/* Main section for messages */}
      <h1>MESSAGE</h1> {/* Heading for the messages page */}
      <div className="banner"> {/* Container for the message cards */}
        {messages && messages.length > 0 ? ( // Check if there are any messages
          messages.map((element) => { // Mapping over the messages to create a card for each
            return (
              <div className="card" key={element._id}> {/* Each card should have a unique key */}
                <div className="details"> {/* Container for message details */}
                  <p>
                    First Name: <span>{element.firstName}</span> {/* Displaying the first name */}
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span> {/* Displaying the last name */}
                  </p>
                  <p>
                    Email: <span>{element.email}</span> {/* Displaying the email address */}
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span> {/* Displaying the phone number */}
                  </p>
                  <p>
                    Message: <span>{element.message}</span> {/* Displaying the message content */}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1> // Message displayed if there are no messages
        )}
      </div>
    </section>
  );
};

// Exporting the Messages component for use in other parts of the application
export default Messages;
