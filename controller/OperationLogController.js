const {OperationLog}=require("../models/Operation_Log");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander= require("../utils/errorhandler")




exports.OperationUser=catchAsyncErrors(async (req, res) => {
   const{
      User_Id,Date,Crew_name,Raider_Incharge_name,Flight_Supervisor, Pilot_name,Crew_id, Designation,Flight_Supervisor_id,Pilot_id,Uin_DAN,
       Mobile_Number,
       Authorized_By,
      }=req.body;

   /*const uploadSingle = uploadFile().single(
    "images"

  );

  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });
      const Image=req.file.location;
      ;*/
      const operation_Log = await OperationLog.create({
        User_Id,  
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
        Authorized_By,
        Flight_Details,
     
   })
  console.log(operation_Log,78);
  if (!operation_Log) return res.status(400).send({message:"the operation user cannot be created!"});
  res.status(201).json({
    success: true,
    operation_Log,
  });
  });


exports.OperationUserFind=catchAsyncErrors(async (req, res, next) => {
  let date=req.body.Date;
  let user=await OperationLog.findOne({$and:[{Date:`${date}`},{User_Id:`${req.body.User_Id}`}]});
    
        if(!user) {
          res.status(400).send({message:"datanot exist"})
        }
        else
        {
          res.status(200).send(user);
        }

      
})

exports.OperationUserUpdate=catchAsyncErrors(async (req, res, next) => {
  const Date=req.query.Date;
  const User_Id=req.body.User_Id;

  const{
   
     Crew_name,
     District,
     Raider_Incharge_name,
     Flight_Supervisor,


     Pilot_name,
     Crew_id,
     Designation,
     Flight_Supervisor_id,
     Pilot_id,
     Uin_DAN,
     Mobile_Number,
     Authorized_By,
     

 }=req.body;

  
  const query = { Date: `${Date}`,User_Id:`${User_Id}`};
  try{
    if(!query)
    {
      res.status(400).send({message:"please select date"})
    }
    else{
      const dab=await OperationLog.updateOne(query, { $set: { Crew_name: `${Crew_name}`,District: `${District}`,Raider_Incharge_name:`${Raider_Incharge_name}`,Flight_Supervisor:`${Flight_Supervisor}`,Pilot_name:`${Pilot_name}`,Crew_id:`${  Crew_id}`,Designation:`${Designation}`,Flight_Supervisor_id:`${Flight_Supervisor_id}`,  Pilot_id:`${Pilot_id}`,Uin_DAN:`${Uin_DAN}`}, Mobile_Number:`${ Mobile_Number}`,Authorized_By:`${Authorized_By}`})

        res.status(200).send({message:"update successfully done"})

    }
    
  
  }catch(err) {
    res.status(500).send({message:"server problem"})
    console.log(err)

  }
  
  

})