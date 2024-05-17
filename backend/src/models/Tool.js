const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const toolSchema = new Schema({
  toolTitle: {
    type: String,
    required: true,
  },
  toolCount: {
    type: Number,
    required: true,
  },
  issuedCount: {
    type: Number,
    required: true,
    default:0
  },
  toolCategory: {
    type: String,
    required: true,
  },
  toolimage: {
    type: String,
    default: "", 
  },
}, { timestamps: true });

module.exports = model('Tool', toolSchema);
