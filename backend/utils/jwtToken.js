// Function to generate JWT, set it as a cookie, and send the response
export const generateToken = (user, message, statusCode, res) => {
    
    // Generate a JWT token using the method defined on the user object
    const token = user.generateJsonWebToken();
    
    // Determine the cookie name based on the user's role (admin or patient)
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    
    // Set the token as a cookie in the HTTP response
    res.status(statusCode)  // Set the HTTP status code for the response
        .cookie(cookieName, token, {  // Create a cookie with the appropriate name and token
            // Set the cookie to expire after a certain period (in days), retrieved from environment variables
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly:true,
        })
      
        // Send a JSON response to the client with relevant information
        .json({
            success: true,  // Indicate that the operation was successful
            message,  // Custom message passed to the function (e.g., "Login successful")
            user,  // Include the user object (for frontend or further operations)
            token,  // Include the JWT token for potential use on the client side
        });
};

/*
Key Objectives:
Authentication: Establish user identity by generating and providing a JWT.
Session Management: Manage user sessions through cookies, differentiating between user roles (Admin or Patient).
Security: Control session lifetimes by setting an expiration time for the cooki
*/