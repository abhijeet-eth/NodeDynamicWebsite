const mongoose = require("mongoose")

//creating database
mongoose.connect("mongodb://localhost:27017/nodeDynamicWebsite")
    .then(() => {
        console.log("DB connection successful")
    }).catch((error) => {
        console.log(error);
    })