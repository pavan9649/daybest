const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
      type: String,
      require:true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      unique:true
    },
    
    password: {
      type: String,
      require: true,
    },
    usertype:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
  });
  const User = mongoose.model("User", UserSchema);
  module.exports = { User };