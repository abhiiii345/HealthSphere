import express from "express";
import { getAllAppointments, postAppointment } from "../controller/appintmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"
import { updateAppointmentStatus } from "../controller/appintmentController.js";
import { deleteAppointment } from "../controller/appintmentController.js";
const router =express.Router();


//only patient can send the appointment
 router.post("/post",isPatientAuthenticated, postAppointment);

 router.get("/getall", isAdminAuthenticated, getAllAppointments);

 // TO FETCH TH EPARTICULAR ID TO VERIFY WITH ID THAT THE APPOINTMENT EXIST IN DATABASE OR NOT
router.put("/update/:id",isAdminAuthenticated, updateAppointmentStatus);

//DELETE THE APPOINTMENT
router.delete("/delete/:id",isAdminAuthenticated, deleteAppointment);


 export default router;