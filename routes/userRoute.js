const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();
const {
    auth,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");


router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.get("/logout",auth,userController.logout);
router.route("/password/forgot").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

module.exports = router;  
