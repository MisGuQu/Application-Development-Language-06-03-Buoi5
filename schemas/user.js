const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  fullName: { type: String, default: '' },
  avatarUrl: { type: String, default: 'https://i.sstatic.net/l60Hf.png' },
  status: { type: Boolean, default: false },
  role: { type: Schema.Types.ObjectId, ref: 'role' },
  loginCount: { type: Number, default: 0, min: 0 },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
