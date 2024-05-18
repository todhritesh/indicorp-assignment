const Tool = require("../models/Tool")

class ToolsController {
    static async addTool(req,res,next) {

        try {
            // if (!req.file) {
            //   throw new Error('No file uploaded'); 
            // } 
        
            const newTool = new Tool({
              toolTitle: req.body.toolTitle,
              toolCount: req.body.toolCount,
              toolCategory: req.body.toolCategory,
              toolimage: "", 
            });
        
            await newTool.save(); 
        
            res.status(201).json({ message: 'Tool added successfully!' }); 
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding tool', error });
          }
        
    }

    static async all(req,res,next) {

      try {
        const tools = await Tool.find({}); 
        res.status(200).json(tools); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tools' });
      }
    }


    static async updateTool(req,res,next) {

        try {
            const { toolId } = req.params; 
            const updates = req.body; 
        
        
            const updatedTool = await Tool.findByIdAndUpdate(toolId, updates, {
              runValidators: true, 
            });
        
            if (!updatedTool) {
              return res.status(404).json({ message: 'Tool not found' });
            }
        
            res.status(200).json(updatedTool);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating tool', error });
          }
        
        
    }
}

module.exports = ToolsController