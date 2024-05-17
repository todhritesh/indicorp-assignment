const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController')
const multer = require("multer")

// Sample route for login
router.post('/register', multer().single("image") ,mechanicController.register);


module.exports = router;
