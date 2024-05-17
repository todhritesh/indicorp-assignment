const Mechanic = require("../models/Mechanic")


module.exports = class MechanicController {
    static async register (req,res,next) {
        try {
            const newMechanic = new Mechanic({
                ...req.body,
                image:req.file.path
            });
        
            await newMechanic.save(); 
        
            res.status(201).json({ message: 'Mechanic registered successfully!' });
          } catch (error) {
            console.error(error);
            let errorMessage = 'Registration failed';
        
            if (error.code === 11000 && error.keyValue.email) {
              errorMessage = 'Email already exists';
            }
        
            res.status(400).json({ message: errorMessage, error });
          }
        
    }
}

