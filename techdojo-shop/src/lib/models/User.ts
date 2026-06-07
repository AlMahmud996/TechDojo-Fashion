import mongoose, { Schema, Model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    size: String,
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

const User: Model<any> =
  mongoose.models.User ||
  mongoose.model('User', UserSchema);

export default User;