const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();

router.post("/signup",userController.signup);
router.post("/signin",userController.signin);

module.exports = router;  
