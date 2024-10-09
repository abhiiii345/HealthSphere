import mongoose from "mongoose";


// CONNECTION THE DATABASE THORUGH MONGO_URL LINK USING MONGOOSE
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    }).then(()=>{
        console.log("connected to database ")
    }).catch(err=>{
        console.log(`some error occured ${err}`)
    })
};