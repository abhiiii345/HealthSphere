import mongoose from "mongoose"; 
// Import Mongoose to interact with MongoDB

import validator from "validator"; 
// Import Validator to validate fields like email

import bcrypt from "bcrypt"; 
// Import bcrypt for hashing passwords

import jwt from "jsonwebtoken"; 
// Import JWT to generate authentication tokens

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "First Name must have at least 3 characters"]
    },
    // First name field, required, with a minimum length of 3 characters

    lastName: {
        type: String,
        required: true,
        minLength: [2, "Last Name must have at least 3 characters"]
    },
    // Last name field, required, with a minimum length of 3 characters

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    // Email field, required, validated using 'isEmail' from validator library

    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be exactly 10 digits"],
        maxLength: [10, "Phone number must be exactly 10 digits"]
    },
    // Phone field, required, with a strict length of 10 digits

    dob: {
        type: Date,
        required: [true, "Date of Birth is required"],
    },
    // Date of Birth field, required

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    // Gender field, required, must be either "Male" or "Female"

    password: {
        type: String,
        required: true,
        minLength: [12, "Password must contain at least 12 characters"],
        select: false
    },
    // Password field, required, must have at least 12 characters and hidden in queries

    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    // Role field, required, can only be "Admin", "Patient", or "Doctor"

    doctorDepartment: {
        type: String
    },
    // Optional field for doctors to specify department

    docAvatar: {
        public_id: String,
        url: String
    },
    // Field to store doctor's avatar image (ID and URL)
});

// Hash the password before saving if it's modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next(); // If password is not modified, proceed
    }
    this.password = await bcrypt.hash(this.password, 10); 
    // Hash the password with bcrypt and a salt round of 10
});

// Compare entered password with the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    // Compare provided password with the stored hashed password
};

// Generate a JSON Web Token (JWT) for user authentication
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign(
        { id: this._id }, 
        // The payload: JWT includes the user's unique ID to identify the user in subsequent requests
        process.env.JWT_SECRET_KEY, 
        // Secret key: This is used to sign and verify the token; it should be stored securely in environment variables
        {
            expiresIn: process.env.JWT_EXPIRES
            // Expiration: The token will expire after the defined period, ensuring it's valid for only a limited time (e.g., '7d' for 7 days)
        }
    );
    // Returns the generated JWT: This token will be used for user authentication in protected routes
};


export const User = mongoose.model("user", userSchema); 
// Export the User model, mapped to the "Message" collection (might need to rename to 'User')
