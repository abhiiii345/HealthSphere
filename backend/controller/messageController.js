import { Message } from "../models/messageSchema.js"; 
// Import the Message model (Mongoose schema) to interact with the MongoDB database

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; 
// Import the catchAsyncErrors middleware to handle asynchronous errors

import ErrorHandler from "../middlewares/errorMiddleware.js"; 
// Import the ErrorHandler class to create custom error messages

// Define the sendMessage function to handle form submissions
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    
    // Extract form data (firstname, lastname, email, phone, message) from the request body
    // The req object represents the incoming request from the client.
    // The res object is used to send the response back to the client.
    const { firstName, lastName, email, phone, message } = req.body;

    // Check if any required field is missing
    if (!firstName || !lastName || !email || !phone || !message) {
        // If any field is missing, pass a new ErrorHandler instance to the next middleware for error handling
        // This triggers the error-handling middleware to send a 400 Bad Request response with an error message
        return next(new ErrorHandler("Please fill the full form", 400));
    }

    // Use async/await to handle asynchronous database operations
    // `async` makes the function asynchronous, allowing us to use `await` inside it
    // `await` pauses the execution until the Promise returned by Message.create() resolves
    await Message.create({ firstName, lastName, email, phone, message });

    // After the message is successfully saved to the database, send a 200 OK response with a success message
    res.status(200).json({
        success: true, 
        message: "Message sent successfully", // Success message to confirm that the message was saved
    });
});


export const getAllMessages= catchAsyncErrors(async(req,res,next)=>{
    const message=await Message.find();
    res.status(200).json({
        success:true,
        message,
    })
})
