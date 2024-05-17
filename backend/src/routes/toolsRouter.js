const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController')
const ToolsController = require('../controllers/toolsController')
const upload = require('../services/multerService')

router.post('/add', upload.single("image") ,ToolsController.addTool);


module.exports = router;
