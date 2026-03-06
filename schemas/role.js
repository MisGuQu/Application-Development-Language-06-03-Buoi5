const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('role', roleSchema);
