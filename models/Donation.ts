import mongoose from 'mongoose';

export interface IDonation extends mongoose.Document {
  userId?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  method: 'stripe' | 'paypal' | 'zelle' | 'venmo' | 'mobile_money' | 'bank_transfer' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripeChargeId?: string;
  paypalOrderId?: string;
  donorEmail: string;
  donorName?: string;
  message?: string;
  isRecurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  method: {
    type: String,
    enum: ['stripe', 'paypal', 'zelle', 'venmo', 'mobile_money', 'bank_transfer', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  stripeChargeId: String,
  paypalOrderId: String,
  donorEmail: {
    type: String,
    required: true,
  },
  donorName: String,
  message: String,
  isRecurring: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', donationSchema);