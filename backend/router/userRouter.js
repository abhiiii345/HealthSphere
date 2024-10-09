import express from "express"; 
// Import the Express module to create a router instance for handling routes

import { patientRegister } from "../controller/userController.js"; 
// Import the patientRegister function from the userController to handle registration logic

import {login} from "../controller/userController.js";


import{addNewAdmin} from "../controller/userController.js";

import { isAdminAuthenticated,isPatientAuthenticated } from "../middlewares/auth.js";


import { getAllDoctors } from "../controller/userController.js";

import { getUserDetails } from "../controller/userController.js";


import { logoutAdmin } from "../controller/userController.js";


import { logoutPatient } from "../controller/userController.js";


import { addNewDoctor } from "../controller/userController.js";

const router = express.Router(); 
// Create an Express Router instance to define and manage route endpoints

router.post("/patient/register", patientRegister ); 
// Define a POST route for patient registration, calling the patientRegister function


router.post("/login", login ); 


router.post("/admin/addnew", addNewAdmin ); 


router.get("/doctors", getAllDoctors);


router.get("/admin/me", isAdminAuthenticated, getUserDetails);


router.get("/patient/me",isPatientAuthenticated, getUserDetails);

router.get("/admin/logout",isAdminAuthenticated, logoutAdmin);


router.get("/patient/logout",isPatientAuthenticated, logoutPatient);

 // only admin can add a new doctor
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);


export default router; 
// Export the router to use in the main application, enabling routing to the registration endpoint


/*
User Registration Flow:

1. Client Request:
   - A client sends a POST request to http://localhost:4000/api/v1/patient/register to register a patient.

2. Router Matching:
   - The request is matched to the /patient/register route in the router file.

3. Controller Logic:
   - The patientRegister function from userController.js is triggered to handle the registration process.

4. Processing:
   - Inside patientRegister, the server processes the request, validating and saving user data (e.g., to the database).

5. Response:
   - Once processed, the server sends a response back to the client, confirming registration success or failure.
*/
