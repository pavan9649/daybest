const dashboardController = require('../controller/dashboardController')
const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleware/middle");
router.get("/",dashboardController.dashboard);

module.exports=router;