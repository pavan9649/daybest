const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperationSchema = new Schema({
    Date:{
        type: String,
        require: true,
    },
    Crew_name:{
        type: String,

    },
    Raider_Incharge_name:{
        type: String,
        require: true
    },
    Flight_Supervisor:{
        type: Array,
    },
    Pilot_name:{
        type: Array,
        require: true
    },
    Crew_id:{
        type:String,

    },
    Designation:{
        type:String,
    },
    Flight_Supervisor_id:{
        type:String,
    },
    Pilot_id:{
        type:String,
    },
    Uin_DAN:{
        type:String,
    },
    Mobile_Number:{
        type:String,
        require: true
    },
    Authorized_By:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

})
const OperationLog = mongoose.model("OperationLog", OperationSchema);
  module.exports = { OperationLog };