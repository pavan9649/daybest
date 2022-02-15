const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");


router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.get("/logout",verifyToken,userController.logout);
router.route("/password/forgot").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

module.exports = router;  
