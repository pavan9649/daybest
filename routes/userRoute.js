const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();

router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.route("/password/forgot").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

module.exports = router;  
