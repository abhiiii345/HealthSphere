import express from "express"; 
// Import the Express module to create a router instance

import { getAllMessages, sendMessage } from "../controller/messageController.js"; 
// Import the sendMessage function from the messageController file

import {isAdminAuthenticated} from "../middlewares/auth.js"

const router = express.Router(); 
// Create a new instance of Express Router to handle routes

router.post("/send", sendMessage); 
// Define a POST route at /send, which uses the sendMessage function to handle requests

// ONLY AUTHENICATED ADMIN CA FETCH ALL THE MESSAGES
router.get("/getall",isAdminAuthenticated, getAllMessages );


export default router; 
// Export the router so it can be used in the main application file



/*
User Makes a Request:
A client sends a POST request to http://localhost:4000/api/v1/message/send with a message.

Request Hits the Router:
The request is matched to the /send route in messageRoutes.js.

Router Calls the Handler:
The sendMessage function is called to process the request.

Processing and Responding:
The sendMessage function processes the request, such as validating the data and saving it to a database, then sends a response back to the client.
*/