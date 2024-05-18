const AssignedTool = require('../models/AssignedTool')
const Tool = require('../models/Tool')

module.exports = class AssingToolController {
    static async add(req,res,next) {
        try {
            const { employee, tools } = req.body;


        

            
            const temp = () => (
              new Promise((resolve,reject)=>{
                const assigningTools = []
               tools.forEach(async (toolId,i)=>{
                 const tool = await Tool.findById(toolId);
                 const rem =tool.toolCount -  tool.issuedCount
                 if(rem>0){
                   assigningTools.push({
                     mechanic: employee,
                     tool: toolId,
                   }) 
                 }
                 if((i+1)===tools.length){
                   resolve(assigningTools)
                 }
               })
              })
            ) 

             const assigningTools = await temp()

            if(!assigningTools.length){
              return res.status(400).json({message:"Unable to assign tool"})
            }

            const newAssignment = await AssignedTool.insertMany(assigningTools);

            assigningTools.map(async item=> {
              const tool = await Tool.findById(item.tool)
              await Tool.findByIdAndUpdate(item.tool,{issuedCount:tool.issuedCount+1})
            })
        
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