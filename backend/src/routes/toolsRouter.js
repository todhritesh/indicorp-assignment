const express = require('express');
const router = express.Router();
const verifyJWTMiddleware = require("../middlewares/verifyJWTMiddleware")
const ToolsController = require('../controllers/toolsController')
const upload = require('../services/multerService')

router.post('/add', verifyJWTMiddleware, upload.single("image") ,ToolsController.addTool);


module.exports = router;
