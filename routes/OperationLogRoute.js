const opUserController=require('../controller/OperationLogController');
const express = require('express');
const router = express.Router();
const {
    auth,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");

router.post("/Add_Details",auth,opUserController.OperationUser);
router.post("/Find_Details",auth,opUserController.OperationUserFind);
module.exports = router;