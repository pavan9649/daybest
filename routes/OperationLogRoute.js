const opUserController=require('../controller/OperationLogController');
const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");

router.post("/Add_Details",verifyToken,opUserController.OperationUser);
module.exports = router;