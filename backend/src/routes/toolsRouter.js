const express = require('express');
const router = express.Router();
const verifyJWTMiddleware = require("../middlewares/verifyJWTMiddleware")
const ToolsController = require('../controllers/toolsController')
const upload = require('../services/multerService')

router.post('/add', upload.single("image") ,ToolsController.addTool);
router.get('/all', upload.single("image") ,ToolsController.all);


module.exports = router;
