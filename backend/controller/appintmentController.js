import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"; // Import middleware to handle errors in async functions
import ErrorHandler from "../middlewares/errorMiddleware.js"; // Import custom error handler
import { Appointment } from "../models/appointmentSchema.js"; // Import Appointment model
import { User } from "../models/userSchema.js"; // Import User model

// Function to handle posting a new appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    
    // Destructure the relevant fields from the request body (patient details)
    const {
        firstName,           // Patient's first name
        lastName,            // Patient's last name
        email,               // Patient's email
        phone,               // Patient's phone number
        dob,                 // Patient's date of birth
        gender,              // Patient's gender
        appointment_date,    // Appointment date
        department,          // Department for the appointment
        doctor_firstName,    // Doctor's first name
        doctor_lastName,     // Doctor's last name
        hasVisited,          // Status of previous visits (e.g., true or false)
        address              // Patient's address
    } = req.body;

    // Check if any of the required fields are missing
    if (
        !firstName ||       // If firstName is missing
        !lastName ||        // If lastName is missing
        !email ||           // If email is missing
        !phone ||           // If phone number is missing
        !dob ||             // If date of birth is missing
        !gender ||          // If gender is missing
        !appointment_date ||// If appointment date is missing
        !department ||      // If department is missing
        !doctor_firstName ||// If doctor's first name is missing
        !doctor_lastName || // If doctor's last name is missing
        !address            // If address is missing
    ) {
        // If any field is missing, return an error message
        return next(new ErrorHandler("Please fill full form!", 400));
    }

    // Find a doctor based on first name, last name, role, and department
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    // If no doctor is found, return an error
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }

    // If multiple doctors with the same name and department are found, return a conflict errorcd 
    if (isConflict.length > 1) {
        return next(new ErrorHandler("The selected doctors have overlapping appointments. Please choose a different time or adjust the schedule!", 404));
    }

    // Extract the doctor's ID from the found doctor data
    const doctorId = isConflict[0]._id;

    // Get the patient ID from the request's user object (assuming the user is authenticated)
    const patientId = req.user._id;

    // Create a new appointment with all the relevant details
    const appointment = await Appointment.create({
        firstName,           // Patient's first name
        lastName,            // Patient's last name
        email,               // Patient's email
        phone,               // Patient's phone number
        dob,                 // Patient's date of birth
        gender,              // Patient's gender
        appointment_date,    // Appointment date
        department,          // Department for the appointment
        doctor: {
            firstName: doctor_firstName,    // Doctor's first name
            lastName: doctor_lastName       // Doctor's last name
        },
        hasVisited,          // Status of previous visits
        address,             // Patient's address
        doctorId,            // Doctor's ID
        patientId            // Patient's ID
    });

    // Send a success response once the appointment is created
    res.status(200).json({
        success: true,        // Success flag
        message: "Appointment sent successfully", // Success message
    });
});

//ONLY FOR ADMIN CAN SEE AL THE APPOINTMENTS
export const getAllAppointments= catchAsyncErrors(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments,
    });
});


// Function to update the status of an appointment
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    
    // Destructuring 'id' from request parameters (req.params) to get the appointment ID
    const { id } = req.params;

    // Fetch the appointment from the database using the ID
    let appointment = await Appointment.findById(id);

    // If the appointment does not exist, return an error response
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 400));
    }

    // Update the appointment status with the data received in req.body
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated appointment document
        runValidators: true, // Validate the new data against the schema
        useFindAndModify: false, // Use the modern MongoDB method for findOneAndUpdate instead of the deprecated one
    });

    // Send a success response with the updated appointment information
    res.status(200).json({
        success: true, // Indicate success of the operation
        message: "Appointment status updated", // Message to show the operation was successful
        appointment, // Return the updated appointment object in the response
    });
});



export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {id}= req.params;
    let appointment= await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found!",404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment deleted successfully",
    });

});



/*
Validation: A check is performed to ensure all required fields are provided by the user. If any field is missing, an error is returned with a message to "fill the full form."

Doctor Lookup: It looks for a doctor by their first name, last name, role, and department. If no doctor is found, an error is returned. If more than one doctor is found, it indicates a scheduling conflict, and a conflict error is returned.

Appointment Creation: If a valid doctor is found, an appointment is created using the patient's and doctor's details. The patient's ID is obtained from the req.user object (assuming the user is logged in).

Response: If everything is successful, a response with a success message is sent to the client.
*/