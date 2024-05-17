const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController')
const multer = require("multer")
const verifyJWTMiddleware = require("../middlewares/verifyJWTMiddleware")


// Sample route for login
router.post('/register', verifyJWTMiddleware, multer().single("image") ,mechanicController.register);


module.exports = router;
