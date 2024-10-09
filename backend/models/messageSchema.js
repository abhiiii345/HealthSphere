import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength:[2, "First Name Must have At least 3 characters "]
    },
    lastName:{
        type: String,
        required: true,
        minLength:[2, "Last Name Must have At least 3 characters "]
    },
    email:{
        type: String,
        required: true,
        validator:[validator.isEmail,"please enter valid Email"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone Number Must have At exact 10 digit "],
        maxLength: [10, "Phone Number Must have At exact 10 digit "],
    },
    
    message:{
        type: String,
        required: true,
        minLength: [8,  "Message at least have 8 characters " ],      
    },
    
});

export const Message= mongoose.model("Message",messageSchema);