const express = require ("express")
const app = express()
const cors = require("cors")
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
const dotenv = require("dotenv").config()
const blogRoute = require("./routes/blogRoute")
const mongoose = require("mongoose")


console.log(process.env.MONGODB_URI);
//DataBase
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Successfully connected DB 🥳")
}).catch((err)=>{
    console.log(err)
})


//Middleware
app.use(express.json())
app.use(cors())
app.use("/api",blogRoute)
app.use(express.static("public"))

let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})