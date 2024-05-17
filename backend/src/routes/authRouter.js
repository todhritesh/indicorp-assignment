const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')
const multer = require("multer")

// Sample route for login
router.post('/login',AuthController.login);


module.exports = router;
