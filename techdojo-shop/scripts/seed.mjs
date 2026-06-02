import mongoose from 'mongoose';
import { readFileSync } from 'fs';

const uri = JSON.parse(readFileSync('.env.local', 'utf-8')
  .split('\n')
  .find(l => l.startsWith('MONGODB_URI'))
  ?.replace('MONGODB_URI=', '')
  ? (() => {
    const lines = readFileSync('.env.local', 'utf-8').split('\n');
    const line = lines.find(l => l.startsWith('MONGODB_URI='));
    return JSON.stringify(line?.replace('MONGODB_URI=', '').trim());
  })()
  : '""');

// simpler approach
const envContent = readFileSync('.env.local', 'utf-8');
const mongoUri = envContent.split('\n')
  .find(l => l.startsWith('MONGODB_URI='))
  ?.replace('MONGODB_URI=', '').trim();

await mongoose.connect(mongoUri);

const ProductSchema = new mongoose.Schema({
  name: String, category: String, price: Number,
  image: String, description: String,
  sizes: [{ size: String, stock: Number }],
  tags: [String]
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

await Product.deleteMany({});

await Product.insertMany([
  {
    name: 'Nike Dri-FIT Running Tee',
    category: 't-shirt', price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    description: 'Lightweight moisture-wicking running t-shirt perfect for workouts.',
    tags: ['running', 'nike', 'sports', 'workout'],
    sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 8 }]
  },
  {
    name: 'Adidas Trefoil Classic Tee',
    category: 't-shirt', price: 24.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
    description: 'Iconic Adidas trefoil logo tee for everyday casual wear.',
    tags: ['casual', 'adidas', 'classic'],
    sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 12 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 3 }, { size: 'XXL', stock: 2 }]
  },
  {
    name: 'Puma Essentials Logo Tee',
    category: 't-shirt', price: 22.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
    description: 'Simple and comfortable everyday tee with Puma logo.',
    tags: ['casual', 'puma', 'essentials'],
    sizes: [{ size: 'M', stock: 8 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 4 }]
  },
  {
    name: 'Under Armour Tech Tee',
    category: 't-shirt', price: 27.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
    description: 'Ultra-soft anti-odor technology tee for all-day comfort.',
    tags: ['sports', 'under armour', 'tech', 'workout'],
    sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 14 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 0 }]
  },
  {
    name: 'Champion Heritage Tee',
    category: 't-shirt', price: 19.99,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400',
    description: 'Classic Champion script logo tee in heavyweight cotton.',
    tags: ['casual', 'champion', 'heritage', 'streetwear'],
    sizes: [{ size: 'S', stock: 3 }, { size: 'M', stock: 9 }, { size: 'L', stock: 12 }, { size: 'XL', stock: 7 }, { size: 'XXL', stock: 5 }]
  },
  {
    name: 'Levi\'s Graphic Print Tee',
    category: 't-shirt', price: 26.99,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
    description: 'Vintage-inspired graphic tee with Levi\'s iconic branding.',
    tags: ['casual', 'levis', 'graphic', 'streetwear'],
    sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }]
  },
  {
    name: 'H&M Slim Fit Tee',
    category: 't-shirt', price: 14.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
    description: 'Clean and minimal slim fit tee for a sharp casual look.',
    tags: ['casual', 'slim fit', 'minimal', 'hm'],
    sizes: [{ size: 'S', stock: 15 }, { size: 'M', stock: 20 }, { size: 'L', stock: 18 }, { size: 'XL', stock: 10 }]
  },
  {
    name: 'Adidas Tiro Training Pants',
    category: 'pants', price: 44.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'Tapered training pants with side pockets and zip ankles.',
    tags: ['training', 'adidas', 'sports', 'running'],
    sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 12 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 5 }]
  },
  {
    name: 'Nike Tech Fleece Joggers',
    category: 'pants', price: 89.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400',
    description: 'Premium tech fleece joggers with tapered fit and zip pockets.',
    tags: ['joggers', 'nike', 'fleece', 'casual', 'premium'],
    sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 7 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 3 }]
  },
  {
    name: 'Puma Swagger Pants',
    category: 'pants', price: 49.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
    description: 'Stylish swagger pants with contrast side stripes.',
    tags: ['casual', 'puma', 'streetwear', 'swagger'],
    sizes: [{ size: 'M', stock: 9 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 3 }]
  },
  {
    name: 'Under Armour Rival Fleece Pants',
    category: 'pants', price: 54.99,
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400',
    description: 'Super-soft rival fleece pants built for comfort and warmth.',
    tags: ['fleece', 'under armour', 'warm', 'casual'],
    sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 0 }]
  },
  {
    name: 'Levi\'s 511 Slim Jeans',
    category: 'pants', price: 69.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'Classic slim fit jeans with stretch for all-day comfort.',
    tags: ['jeans', 'levis', 'slim', 'denim', 'casual'],
    sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 8 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 4 }]
  },
  {
    name: 'H&M Chino Pants',
    category: 'pants', price: 34.99,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400',
    description: 'Smart casual chino pants perfect for office or weekend.',
    tags: ['chino', 'casual', 'smart', 'hm', 'office'],
    sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 13 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 5 }, { size: 'XXL', stock: 2 }]
  },
  {
    name: 'Champion Reverse Weave Joggers',
    category: 'pants', price: 59.99,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400',
    description: 'Iconic reverse weave joggers with ribbed cuffs and waistband.',
    tags: ['joggers', 'champion', 'streetwear', 'casual'],
    sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 9 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 3 }]
  },
  {
    name: 'Nike Dri-FIT Running Shorts',
    category: 'pants', price: 34.99,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400',
    description: 'Lightweight running shorts with built-in liner and zip pocket.',
    tags: ['running', 'nike', 'shorts', 'sports', 'workout'],
    sizes: [{ size: 'S', stock: 9 }, { size: 'M', stock: 14 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }]
  }
]);

console.log('✅ Seeded 15 products successfully!');
await mongoose.disconnect();
process.exit(0);