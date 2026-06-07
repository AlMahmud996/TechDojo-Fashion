import mongoose, { Schema, Model } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    size: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  status: { type: String, default: 'placed' }
}, { timestamps: true });

const Order: Model<any> =
  mongoose.models.Order ||
  mongoose.model('Order', OrderSchema);

export default Order;