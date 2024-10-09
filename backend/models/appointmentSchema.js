import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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

    appointment_date:{
        type:String,
        required:true,
    },

    department:{
        type:String,
        required:true,

    },

    doctor:{
        firstName:{
            type:String,
            required:true,

        },
        lastName:{
            type:String,
            required:true,

        }
    },
    hasVisited:{
        type:Boolean,
        default:false,
     
    },
    
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,

    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true,

    },
    address:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: ["pending", "Accepted", "Rejected"],
        default: "pending",
    },
    

   
});


export const Appointment= mongoose.model("Appointment", appointmentSchema);