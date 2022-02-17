const express = require("express");
const app = express()
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
//const sendToken = require("./utils/jwtToken");
const port=process.env.PORT || 4000;
const path = require("path");
require("./db/conn")
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const user = require("./routes/userRoute");
const OperationLog=require("./routes/OperationLogRoute");
const dashboard=require("./routes/dashboardRoute");
app.get("/",(req,res)=>{
    res.status(200).send({message:"all is well"});
})

app.use("/user", user);
app.use("/operation_Log",OperationLog);
app.use("/dashboard",dashboard);

//app.use(cookieParser());
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

  const server=app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });

  
module.exports = app;