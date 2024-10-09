import app from "./app.js";
import cloudinary from "cloudinary";


app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
})


// CLOUDINARY SRVICES ACCESS USING API KEYS OF CLOUDINARY
// WRIITNG IN SERVER SIDE TO PROTECT IT FROM FRONTEND OR PUBLIC USER
//v2.config is a method in the Cloudinary Node.js SDK used to configure 
//the Cloudinary library with your API credentials.
//The v2 part refers to the version 2 of the Cloudinary API,
// and config is used to set up your cloud name, API key, and API secret.
cloudinary.v2.config({
    cloud_name:"dffmhfoil",
    api_key: "396344335729623" , // API key here
    api_secret: "5052c-It4rm7ZG_lAIAYP65dlmI"
  });



 