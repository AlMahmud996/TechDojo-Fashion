import mongoose, { Schema, Model } from 'mongoose';

const ChatHistorySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [{
    role: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const ChatHistory: Model<any> =
  mongoose.models.ChatHistory ||
  mongoose.model('ChatHistory', ChatHistorySchema);

export default ChatHistory;