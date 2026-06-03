import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: { size: string; stock: number }[];
  tags: string[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, enum: ['t-shirt', 'pants'], required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  sizes: [{
    size: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    stock: { type: Number, default: 0 }
  }],
  tags: [{ type: String }]
}, { timestamps: true });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;