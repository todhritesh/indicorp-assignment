const AssignedTool = require('../models/AssignedTool')

module.exports = class AssingToolController {
    static async add(req,res,next) {
        try {
            const { mechanicId, toolId } = req.body;
        
            const newAssignment = new AssignedTool({
              mechanic: mechanicId,
              tool: toolId,
            });
        
            await newAssignment.save();
        
            res.status(201).json(newAssignment); 
          } catch (error) {
            console.error(error);
            let errorMessage = 'Failed to assign tool';
        
            if (error.name === 'ValidationError') {
              errorMessage = 'Invalid mechanic or tool ID';
            }
        
            res.status(400).json({ message: errorMessage, error });
          }
    }
}