const opUserController=require('../controller/OperationLogController');
const express = require('express');
const router = express.Router();
const {
    auth,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");

router.post("/Add_Details",opUserController.OperationUser);
router.post("/Find_Details",opUserController.OperationUserFind);
module.exports = router;