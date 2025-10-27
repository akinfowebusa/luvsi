const mongoose = require('mongoose');

const MessageSubSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: '' },
  media: { type: String, default: null },
  mediaType: { type: String, enum: ['images', 'gif', 'audio', 'video', null], default: null },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: { type: [MessageSubSchema], default: [] },
  },
  { timestamps: true }
);

ChatSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Chat', ChatSchema);