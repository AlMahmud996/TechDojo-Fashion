import mongoose, { Schema, Model } from 'mongoose';

const SizeRequestSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  requestedSize: String,
}, { timestamps: true });

const SizeRequest: Model<any> =
  mongoose.models.SizeRequest ||
  mongoose.model('SizeRequest', SizeRequestSchema);

export default SizeRequest;