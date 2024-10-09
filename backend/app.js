import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app=express();
config({path: "./config/config.env"})

// to connect backedn with frontend
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true,

}));

//FOR BACKEND TO GET COOKIES
app.use(cookieParser());

//WE GET DATA IN JSON FORMAT USE TO CONVERT THEM INTO STRING
app.use(express.json());

//WE GET DIFFRENET TYPES STRING, DATE TO PROCEEESS THEM
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/",

}));

//FORM CREATION HANDLER
app.use("/api/v1/message", messageRouter);

// FOR USER HANDLER
app.use("/api/v1/user", userRouter);

//FOR APPOINTMENT HANDLING
app.use("/api/v1/appointment", appointmentRouter);

// DATABSE CONNECTION
dbConnection();

//ERROR HANDLING USING MIDDDLEWARE
app.use(errorMiddleware);

export default app;