const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");

//const cookieParser = require("cookie-parser");
//const sendToken = require("./utils/jwtToken");
const port=process.env.PORT || 4000;
const path = require("path");
const dotenv=require("dotenv");
dotenv.config({ path: './config.env'})

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
require("./db/conn")
app.use(express.json());
app.use(cors());
app.options('*',cors())
app.use(bodyParser.urlencoded({ extended: true }));


const user = require("./routes/userRoute");
const OperationLog=require("./routes/OperationLogRoute");
const dashboard=require("./routes/dashboardRoute");

app.use("/user", user);
app.use("/operation_Log",OperationLog);
app.use("/dashboard",dashboard);

app.get("/",(req,res)=>{
  res.status(200).send({message:"all is well"});
})

/*app.get('/login', (req,res) => {
  if (req.query.phonenumber) {
     client
     .verify
     .services(process.env.SERVICE_ID)
     .verifications
     .create({
         to: `+${req.query.phonenumber}`,
         channel: req.query.channel==='call' ? 'call' : 'sms' 
     })
     .then(data => {
         res.status(200).send({
             message: "Verification is sent!!",
             phonenumber: req.query.phonenumber,
             data
         })
     }) 
  } else {
     res.status(400).send({
         message: "Wrong phone number :(",
         phonenumber: req.query.phonenumber,
         data
     })
  }
})*/
//app.use(cookieParser());

/*app.get('/verify', (req, res) => {
  if (req.query.phonenumber && (req.query.code).length === 6) {
      client
          .verify
          .services(process.env.SERVICE_ID)
          .verificationChecks
          .create({
              to: `+${req.query.phonenumber}`,
              code: req.query.code
          })
          .then(data => {
              if (data.status === "approved") {
                  res.status(200).send({
                      message: "User is Verified!!",
                      data
                  })
              }
          })
  } else {
      res.status(400).send({
          message: "Wrong phone number or code :(",
          phonenumber: req.query.phonenumber
      })
  }
})*/


process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

   if(process.env.NODE_ENV="production")
   {
     app.use(express.static("client/build"))

   }

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