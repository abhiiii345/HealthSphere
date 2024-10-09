// Custom ErrorHandler class that extends the built-in Error class
class ErrorHandler extends Error {
    // Constructor to initialize the error message and status code
    constructor(message, statusCode) {
        super(message); // Call the parent Error class constructor with the error message
        this.statusCode = statusCode; // Set a custom status code
    }
}

// Middleware function to handle errors
export const errorMiddleware = (err, req, res, next) => {
    // Default error message if none is provided
    err.message = err.message || "Internal server error";
    // Default status code if none is provided
    err.statusCode = err.statusCode || 500;

    // Handle duplicate key error (e.g., unique constraint violation)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`; // Custom message for duplicate key errors
        err = new ErrorHandler(message, 400); // Create new ErrorHandler with status code 400
    }

    // Handle invalid JSON Web Token errors
    if (err.name === "JsonWebTokenError") {
        const message = "JSON web token is invalid"; // Custom message for invalid JWT
        err = new ErrorHandler(message, 400); // Create new ErrorHandler with status code 400
    }

    // Handle expired JSON Web Token errors
    if (err.name === "TokenExpiredError") {
        const message = "JSON web token has expired"; // Custom message for expired JWT
        err = new ErrorHandler(message, 400); // Create new ErrorHandler with status code 400
    }

    // Handle Mongoose casting errors (e.g., invalid data types)
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`; // Custom message for casting errors
        err = new ErrorHandler(message, 400); // Create new ErrorHandler with status code 400
    }

    // Extract a detailed error message from the `err` object
    // If `err.errors` exists (i.e., it's a validation error), map through its values to get individual error messages,
      // join them into a single string separated by spaces.
    // If `err.errors` does not exist, fall back to the general `err.message`.
        const errorMessage = err.errors
         ? Object.values(err.errors).map((error) => error.message).join(" "): err.message;

          // Send a JSON response with the error details
           // Set the HTTP status code from `err.statusCode`
             // Return a JSON object with `success` set to false and the extracted `errorMessage` for the client
      return res.status(err.statusCode).json({
       success: false,
          message: errorMessage,
});

};

export default ErrorHandler
