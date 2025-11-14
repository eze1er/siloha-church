import mongoose from 'mongoose';

export interface ISermon extends mongoose.Document {
  title: string;
  description: string;
  youtubeId: string;
  publishedAt: Date;
  speaker: string;
  tags: string[];
  duration?: number;
  thumbnail?: string;
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const sermonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  duration: Number,
  thumbnail: String,
  isPublished: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Sermon || mongoose.model<ISermon>('Sermon', sermonSchema);