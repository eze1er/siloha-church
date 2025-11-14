import mongoose from 'mongoose';

export interface IMessage {
  from: mongoose.Types.ObjectId;
  text: string;
  timestamp: Date;
  isAI: boolean;
  read: boolean;
}

export interface IChat extends mongoose.Document {
  participants: mongoose.Types.ObjectId[];
  messages: IMessage[];
  status: 'active' | 'resolved' | 'pending';
  title?: string;
  lastMessageAt: Date;
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isAI: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  messages: [messageSchema],
  status: {
    type: String,
    enum: ['active', 'resolved', 'pending'],
    default: 'active',
  },
  title: String,
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);