const {OperationLog}=require("../models/Operation_Log");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander= require("../utils/errorhandler")

exports.OperationUser=catchAsyncErrors(async (req, res, next) => {
   const{
       Date,
       Crew_name,
       Raider_Incharge_name,
       Flight_Supervisor,
       Pilot_name,
       Crew_id,
       Designation,
       Flight_Supervisor_id,
       Pilot_id,
       Uin_DAN,
       Mobile_Number,
       Authorized_By

   }=req.body;

   const operation_Log = await OperationLog.create({
       Date,
       Crew_name,
       Raider_Incharge_name,
       Flight_Supervisor,
       Pilot_name,
       Crew_id,
       Designation,
       Flight_Supervisor_id,
       Pilot_id,
       Uin_DAN,
       Mobile_Number,
       Authorized_By
  });
  if (!operation_Log) return res.status(400).send({message:"the user cannot be created!"});
  res.status(201).json({
    success: true,
    operation_Log,
  });
  
})