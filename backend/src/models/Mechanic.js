const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt")

const mechanicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "", 
  },
  mechanicLevel: {
    type: String,
    enum: [
      "Expert",
      "Medium",
      "New Recruit",
      "Trainee"
  ]
  },
  mobileNo: {
    type: String,
    required: true,
  },
}, { timestamps: true });

mechanicSchema.pre('save', async function (next) {
  const mechanic = this; 
  if (!mechanic.isModified('password')) return next(); 

  try {
    const salt = await bcrypt.genSalt(10); 
    mechanic.password = await bcrypt.hash(mechanic.password, salt); 
    next();
  } catch (error) {
    console.error(error);
    next(error); 
  }
});


module.exports = model('Mechanic', mechanicSchema);




