import { catchAsyncErrors } from "./catchAsyncErrors.js"; 
// Importing a utility to handle asynchronous errors to avoid using try-catch blocks repeatedly

import ErrorHandler from "./errorMiddleware.js"; 
// Importing a custom error handler to manage and return errors consistently

import jwt from "jsonwebtoken"; 
// Importing the 'jsonwebtoken' library to handle JSON Web Token (JWT) encoding and decoding

import { User } from "../models/userSchema.js"; 
// Importing the 'User' model to interact with the database and retrieve user information

// Middleware to check if the Admin is authenticated
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken; 
    // Retrieving the admin token from cookies

    if (!token) {
        return next(new ErrorHandler("Admin not Authenticated!", 400)); 
        // If no token is found, throw an authentication error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    // Decoding the JWT using the secret key to verify its validity

    req.user = await User.findById(decoded.id); 
    // Finding the user in the database using the decoded user ID

    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this role!`, 403)); 
        // If the user is not an Admin, return a "not authorized" error
    }

    next(); 
    // If the token is valid and the user is an Admin, proceed to the next middleware or route handler
});

// Middleware to check if the Patient is authenticated
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken; 
    // Retrieving the patient token from cookies

    if (!token) {
        return next(new ErrorHandler("Patient not Authenticated!")); 
        // If no token is found, throw an authentication error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    // Decoding the JWT using the secret key to verify its validity

    req.user = await User.findById(decoded.id); 
    // Finding the user in the database using the decoded user ID

    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized!`, 403)); 
        // If the user is not a Patient, return a "not authorized" error
    }

    next(); 
    // If the token is valid and the user is a Patient, proceed to the next middleware or route handler
});
/*
Authentication using JWT: When a request is made, the middleware checks if a valid token (JWT) exists in the cookies (adminToken for admin, patientToken for patients). If no token is found, an error is raised, indicating the user is not authenticated.

Token verification: If the token exists, it is decoded using the jsonwebtoken library, which verifies the token’s validity using a secret key (JWT_SECRET_KEY). The decoded token contains the user’s ID.

Database lookup: The user is then retrieved from the database (User.findById(decoded.id)) using the decoded ID.

Role validation: The middleware checks whether the user has the appropriate role (either "Admin" or "Patient"). If the user’s role does not match the required role, an error is raised, indicating that the user is not authorized for the specific action.

Proceeding to next middleware: If the user is authenticated and authorized, the next() function is called, allowing the request to proceed to the next middleware or route handler.
*/