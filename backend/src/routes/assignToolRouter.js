const express = require('express');
const router = express.Router();
const AssignToolController = require('../controllers/assignToolController')
const multer = require("multer")
const verifyJWTMiddleware = require("../middlewares/verifyJWTMiddleware")

// Sample route for login
router.post('/add',verifyJWTMiddleware,AssignToolController.add);


module.exports = router;
