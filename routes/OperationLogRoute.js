const opUserController=require('../controller/OperationLogController');
const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");

router.post("/Add_Details",verifyToken,opUserController.OperationUser);
router.post("/find_user",verifyToken,opUserController.OperationUserFind);
module.exports = router;