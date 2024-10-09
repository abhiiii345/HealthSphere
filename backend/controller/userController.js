import { User } from "../models/userSchema.js"; 
// Import the User model (Mongoose schema) to interact with the MongoDB database

import moment from "moment";
 // Import moment.js to handle date formatting and validation


 import {generateToken} from "../utils/jwtToken.js";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; 
// Import the catchAsyncErrors middleware to handle asynchronous errors and pass them to the error handler

import ErrorHandler from "../middlewares/errorMiddleware.js"; 
// Import the ErrorHandler class to create custom error messages for various error scenarios

import cloudinary from "cloudinary";

// Define the patientRegister function to handle user registration
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    
    // Extract user data from the request body
    // The req object represents the incoming request from the client.
    // The res object is used to send the response back to the client.
    const { firstName, lastName, email, phone, dob, gender, password, role } = req.body;

    // Check if any required field is missing
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role) {
        // If any field is missing, create an ErrorHandler instance with a 400 Bad Request error
        // Pass this error to the next middleware (error handler) for response
        return next(new ErrorHandler("Please fill the full form", 400));
    }
 

   

    // Check if the user is already registered with the given email
    let user = await User.findOne({ email });
    if (user) {
        // If user is already registered, create an ErrorHandler instance with a 400 Bad Request error
        // Pass this error to the next middleware (error handler) for response
        return next(new ErrorHandler("User Already Registered", 400));
    }

    // Create a new user in the database
    user = await User.create({
        firstName, lastName, email, phone, dob, gender, password, role,
    });

    // Send a 200 OK response with a success message after successful registration
    generateToken(user,"user Registered!", 200, res);

    
    
});





// Define the login function with error handling using the catchAsyncErrors middleware
export const login = catchAsyncErrors(async (req, res, next) => {
    // Destructure email, password, confirmPassword, and role from the request body
    const { email, password, confirmPassword, role } = req.body;

    // Check if any of the required fields are missing, throw error if true
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please fill all the details", 400));
    }

    // Verify if password and confirmPassword match, throw error if they don't
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password Do Not Match", 400));
    }

    // Find the user by email, explicitly selecting the password field for comparison
    const user = await User.findOne({ email }).select("+password");
    
    // If no user is found with the provided email, throw error
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    // Compare the entered password with the user's stored hashed password
    const isPasswordMatched = await user.comparePassword(password);
    
    // If the password doesn't match, throw error
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    // Ensure the user is logging in with the correct role, throw error if roles don't match
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role is not found", 400));
    }

    // Send a success response if all validations pass and user is authenticated
      
    generateToken(user,"user login Successfully!", 200, res);

});

// FOR NEW USER LOGIN
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    // Destructuring the fields from the request body
    const { firstName, lastName, email, phone, dob, gender, password } = req.body;

    // Check if any required fields are missing
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        // If any field is missing, send a 400 error with a relevant message
        return next(new ErrorHandler("Please fill the full form", 400));
    }

    // Check if an admin with the given email already exists
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        // If the admin exists, send a conflict error with a relevant message
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`, 400));
    }

    // Create a new admin with the provided data and the role set to 'Admin'
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Admin",
    });

    // Send a successful response with a message
    res.status(200).json({
        success: true,
        message: "New Admin Registered!",
    });
});

// TO ADD THE DOCTORS
export const getAllDoctors= catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,
    });

    

});
 
// TO GET THE DETAILS OF THE USER
export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user= req.user;
    res.status(200).json({
        success:true,
        user,
    });
});



// Function to handle admin logout
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    // Set the adminToken cookie to an empty value and expire immediately
    res.status(200).cookie("adminToken", "", {
        httpOnly: true, // Ensures cookie cannot be accessed via client-side scripts
        expires: new Date(Date.now()), // Cookie expires immediately
    }).json({
        success: true, // Indicate the operation was successful
        message: "Admin logged out Successfully!", // Confirmation message for logout
    });
});

// Function to handle patient logout
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    // Set the patientToken cookie to an empty value and expire immediately
    res.status(200).cookie("patientToken", "", {
        httpOnly: true, // Ensures cookie cannot be accessed via client-side scripts
        expires: new Date(Date.now()), // Cookie expires immediately
    }).json({
        success: true, // Indicate the operation was successful
        message: "Patient logged out Successfully!", // Confirmation message for logout
    });
});

// Function to handle adding a new doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    // Check if the doctor avatar file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400)); // Trigger error if no file is provided
    }

    const { docAvatar } = req.files; // Extract the doctor avatar file from the request

    // Allowed file formats for the avatar
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    
    // Validate the file format
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format does not support!", 400)); // Trigger error if the file type is invalid
    }

    // Extract the doctor details from the request body
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        doctorDepartment,
    } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please provide full details!", 400)); // Trigger error if any field is missing
    }

    // Check if the doctor is already registered with the provided email
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400)); // Trigger error if email is already registered
    }

    // Upload the doctor avatar to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );

    // Handle errors in the Cloudinary response
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "cloudinary Error",
            cloudinaryResponse.error || "unknown Cloudinary Error" // Log the Cloudinary error
        );
    }

    // Create a new doctor record in the database
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        doctorDepartment,
        role: "Doctor", // Assign the role of 'Doctor'
        docAvatar: {
            public_id: cloudinaryResponse.public_id, // Store the Cloudinary public ID
            url: cloudinaryResponse.secure_url, // Store the secure URL of the avatar
        },
    });

    // Respond with success and details of the new doctor
    res.status(200).json({
        success: true, // Indicate the operation was successful
        message: "New Doctor Registered!", // Confirmation message for successful registration
        doctor // Send back the created doctor details
    });
});
