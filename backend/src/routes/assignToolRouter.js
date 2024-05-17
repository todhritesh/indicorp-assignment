const express = require('express');
const router = express.Router();
const AssignToolController = require('../controllers/assignToolController')
const multer = require("multer")

// Sample route for login
router.post('/add',AssignToolController.add);


module.exports = router;
