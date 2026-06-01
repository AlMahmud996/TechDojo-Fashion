import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    type: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      size: String,
      quantity: { type: Number, default: 1 }
    }],
    default: []
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);