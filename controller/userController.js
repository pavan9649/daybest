const {User}=require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function getToken(payload, secret = process.env.jwt_secret) {
  let token = jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
    },
    secret
  );
  return token;
}


exports.signup= async (req, res) => {
  //console.log(req.body)
  
    User.find({ email: req.body.email }, async (err, result) => {
        if (err) res.status(400).json({ message: "already registered" });
        else{
          let user
          if(req.body.usertype=="admin")
          {
            user = new User({
              name:req.body.name,
              username: req.body.username,
              email: req.body.email,
              password:bcrypt.hashSync(req.body.password,10),
              phone: req.body.phone,
              usertype:req.body.usertype,
              isAdmin:true
          })
          user = await user.save();
        }

        else{
           user = new User({
            name:req.body.name,
            username: req.body.username,
            email: req.body.email,
            password:bcrypt.hashSync(req.body.password,10),
            phone: req.body.phone,
            usertype:req.body.usertype
    
          });
          user = await user.save();
        }
          
        
          if (!user) return res.status(400).send({message:"the user cannot be created!"});
        
          res.status(200).send(user);
        } 
  })
}



exports.signin=async(req,res)=>{
    const user=await User.findOne({$and:[{email:req.body.email},{usertype:req.body.usertype}]});
    const secret=process.env.JWT_SEC
      if(!user)
      {
          return res.status(400).send({message:"the user not found"});
      }
      if(user && bcrypt.compareSync(req.body.password,user.password))
      {
        const token=jwt.sign(
          {
              userId: user.id,

        },
        secret,
        {
            expiresIn: "1d"
        }
      );
        return res.status(200).send({user:user,token:token});  
        
      }
      else{
        return res.status(400).send({message: "password or email didn't match"});
      }
  }
 
exports.dashboard=(req,res)=>{
  res.status(200).send({message:"welocme in dashboard"});

}
