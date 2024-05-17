const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const assignedToolSchema = new Schema({
  mechanic: {
    type: Types.ObjectId,
    ref: 'Mechanic',
    required: true,
  },
  tool: {
    type: Types.ObjectId,
    ref: 'Tool',
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = model('AssignedTool', assignedToolSchema);
