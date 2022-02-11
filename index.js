const express=require("express");
const app= express();
const morgan = require("morgan");
const cors = require("cors");
const port=process.env.PORT || 3000;
const dotenv=require('dotenv')
const bodyParser = require("body-parser");
app.use(cors());
app.options("*", cors());
require("./db/conn");
require("dotenv/config");
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));


const userRoute = require('./routes/user');
const dashRoute= require("./routes/dashboard");
app.use("/user",userRoute);
app.use("/dashboard",dashRoute);


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});