import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  organizer: string;
  image?: string;
  isPublic: boolean;
  maxAttendees?: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  image: String,
  isPublic: {
    type: Boolean,
    default: true,
  },
  maxAttendees: Number,
}, {
  timestamps: true,
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);