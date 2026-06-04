import mongoose from 'mongoose';
import { readFileSync } from 'fs';

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
  // T-SHIRTS
  {
    name: 'Nike Dri-FIT Running Tee',
    category: 't-shirt', price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    description: 'Lightweight moisture-wicking running t-shirt perfect for workouts.',
    tags: ['running', 'nike', 'sports', 'workout'],
    sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 8 }]
  },
  {
    name: 'Adidas Trefoil Classic Tee',
    category: 't-shirt', price: 24.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600',
    description: 'Iconic Adidas trefoil logo tee for everyday casual wear.',
    tags: ['casual', 'adidas', 'classic'],
    sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 12 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 3 }, { size: 'XXL', stock: 2 }]
  },
  {
    name: 'Puma Essentials Logo Tee',
    category: 't-shirt', price: 22.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
    description: 'Simple and comfortable everyday tee with Puma logo.',
    tags: ['casual', 'puma', 'essentials'],
    sizes: [{ size: 'M', stock: 8 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 4 }]
  },
  {
    name: 'Under Armour Tech Tee',
    category: 't-shirt', price: 27.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
    description: 'Ultra-soft anti-odor technology tee for all-day comfort.',
    tags: ['sports', 'under armour', 'tech', 'workout'],
    sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 14 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 0 }]
  },
  {
    name: 'Champion Heritage Tee',
    category: 't-shirt', price: 19.99,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600',
    description: 'Classic Champion script logo tee in heavyweight cotton.',
    tags: ['casual', 'champion', 'heritage', 'streetwear'],
    sizes: [{ size: 'S', stock: 3 }, { size: 'M', stock: 9 }, { size: 'L', stock: 12 }, { size: 'XL', stock: 7 }, { size: 'XXL', stock: 5 }]
  },
  {
    name: "Levi's Graphic Print Tee",
    category: 't-shirt', price: 26.99,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600',
    description: "Vintage-inspired graphic tee with Levi's iconic branding.",
    tags: ['casual', 'levis', 'graphic', 'streetwear'],
    sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }]
  },
  {
    name: 'H&M Slim Fit Tee',
    category: 't-shirt', price: 14.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600',
    description: 'Clean and minimal slim fit tee for a sharp casual look.',
    tags: ['casual', 'slim fit', 'minimal', 'hm'],
    sizes: [{ size: 'S', stock: 15 }, { size: 'M', stock: 20 }, { size: 'L', stock: 18 }, { size: 'XL', stock: 10 }]
  },
  {
    name: 'Ralph Lauren Polo Tee',
    category: 't-shirt', price: 49.99,
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600',
    description: 'Premium cotton polo tee with embroidered pony logo.',
    tags: ['premium', 'ralph lauren', 'polo', 'classic'],
    sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 8 }, { size: 'L', stock: 6 }, { size: 'XL', stock: 3 }]
  },
  {
    name: 'Zara Oversized Tee',
    category: 't-shirt', price: 32.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600',
    description: 'Trendy oversized fit tee perfect for a streetwear look.',
    tags: ['streetwear', 'zara', 'oversized', 'trending'],
    sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 12 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 5 }]
  },
  {
    name: 'Tommy Hilfiger Classic Tee',
    category: 't-shirt', price: 39.99,
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600',
    description: 'Timeless Tommy Hilfiger tee with flag logo.',
    tags: ['classic', 'tommy hilfiger', 'premium', 'casual'],
    sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 9 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 4 }, { size: 'XXL', stock: 2 }]
  },
  // PANTS
  {
    name: 'Adidas Tiro Training Pants',
    category: 'pants', price: 44.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
    description: 'Tapered training pants with side pockets and zip ankles.',
    tags: ['training', 'adidas', 'sports', 'running'],
    sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 12 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 5 }]
  },
  {
    name: 'Nike Tech Fleece Joggers',
    category: 'pants', price: 89.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600',
    description: 'Premium tech fleece joggers with tapered fit and zip pockets.',
    tags: ['joggers', 'nike', 'fleece', 'casual', 'premium'],
    sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 7 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 3 }]
  },
  {
    name: 'Puma Swagger Pants',
    category: 'pants', price: 49.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Stylish swagger pants with contrast side stripes.',
    tags: ['casual', 'puma', 'streetwear', 'swagger'],
    sizes: [{ size: 'M', stock: 9 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 3 }]
  },
  {
    name: 'Under Armour Rival Fleece Pants',
    category: 'pants', price: 54.99,
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600',
    description: 'Super-soft rival fleece pants built for comfort and warmth.',
    tags: ['fleece', 'under armour', 'warm', 'casual'],
    sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 0 }]
  },
  {
    name: "Levi's 511 Slim Jeans",
    category: 'pants', price: 69.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    description: 'Classic slim fit jeans with stretch for all-day comfort.',
    tags: ['jeans', 'levis', 'slim', 'denim', 'casual'],
    sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 8 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 4 }]
  },
  {
    name: 'H&M Chino Pants',
    category: 'pants', price: 34.99,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
    description: 'Smart casual chino pants perfect for office or weekend.',
    tags: ['chino', 'casual', 'smart', 'hm', 'office'],
    sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 13 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 5 }, { size: 'XXL', stock: 2 }]
  },
  {
    name: 'Champion Reverse Weave Joggers',
    category: 'pants', price: 59.99,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600',
    description: 'Iconic reverse weave joggers with ribbed cuffs and waistband.',
    tags: ['joggers', 'champion', 'streetwear', 'casual'],
    sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 9 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 3 }]
  },
  {
    name: 'Zara Slim Chinos',
    category: 'pants', price: 45.99,
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600',
    description: 'Modern slim chinos with a clean minimal look.',
    tags: ['chino', 'zara', 'slim', 'smart', 'minimal'],
    sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 11 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }]
  },
  {
    name: 'Ralph Lauren Chino Trousers',
    category: 'pants', price: 79.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Premium chino trousers with a classic straight fit.',
    tags: ['premium', 'ralph lauren', 'chino', 'classic', 'office'],
    sizes: [{ size: 'S', stock: 3 }, { size: 'M', stock: 7 }, { size: 'L', stock: 6 }, { size: 'XL', stock: 2 }]
  },
  {
    name: 'Nike Dri-FIT Running Shorts',
    category: 'pants', price: 34.99,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600',
    description: 'Lightweight running shorts with built-in liner and zip pocket.',
    tags: ['running', 'nike', 'shorts', 'sports', 'workout'],
    sizes: [{ size: 'S', stock: 9 }, { size: 'M', stock: 14 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }]
  },
  // ========== 10 MORE T-SHIRTS ==========

{
  name: 'Uniqlo AIRism Cotton Tee',
  category: 't-shirt', price: 19.99,
  image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
  description: 'Breathable AIRism fabric keeps you cool and dry all day.',
  tags: ['casual', 'uniqlo', 'airism', 'comfort'],
  sizes: [{ size: 'S', stock: 12 }, { size: 'M', stock: 18 }, { size: 'L', stock: 14 }, { size: 'XL', stock: 8 }, { size: 'XXL', stock: 4 }]
},
{
  name: 'Supreme Box Logo Tee',
  category: 't-shirt', price: 98.99,
  image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
  description: 'Iconic box logo tee, a streetwear essential.',
  tags: ['streetwear', 'supreme', 'hype', 'limited'],
  sizes: [{ size: 'S', stock: 2 }, { size: 'M', stock: 3 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 1 }]
},
{
  name: 'Carhartt WIP Pocket Tee',
  category: 't-shirt', price: 44.99,
  image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb9f4?w=600',
  description: 'Heavyweight cotton pocket tee with Carhartt script logo.',
  tags: ['workwear', 'carhartt', 'heavyweight', 'streetwear'],
  sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 9 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 3 }]
},
{
  name: 'Stüssy Stock Tee',
  category: 't-shirt', price: 39.99,
  image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600',
  description: 'Signature Stüssy stock logo tee in soft cotton.',
  tags: ['streetwear', 'stussy', 'skate', 'casual'],
  sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 12 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 5 }]
},
{
  name: 'The North Face Box Tee',
  category: 't-shirt', price: 34.99,
  image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
  description: 'Box logo tee with TNF branding, perfect for outdoor vibes.',
  tags: ['outdoor', 'north face', 'hiking', 'casual'],
  sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }]
},
{
  name: 'Fear of God Essentials Tee',
  category: 't-shirt', price: 89.99,
  image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600',
  description: 'Oversized fit with rubberized logo, premium heavyweight cotton.',
  tags: ['premium', 'essentials', 'fear of god', 'minimal', 'streetwear'],
  sizes: [{ size: 'S', stock: 3 }, { size: 'M', stock: 5 }, { size: 'L', stock: 4 }, { size: 'XL', stock: 2 }, { size: 'XXL', stock: 1 }]
},
{
  name: 'Bape Ape Head Tee',
  category: 't-shirt', price: 149.99,
  image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
  description: 'Iconic Ape Head graphic tee from A Bathing Ape.',
  tags: ['streetwear', 'bape', 'hype', 'luxury', 'graphic'],
  sizes: [{ size: 'M', stock: 2 }, { size: 'L', stock: 3 }, { size: 'XL', stock: 1 }]
},
{
  name: 'Patagonia P-6 Logo Tee',
  category: 't-shirt', price: 49.99,
  image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600',
  description: 'Classic P-6 logo tee made from 100% organic cotton.',
  tags: ['outdoor', 'patagonia', 'eco', 'hiking', 'sustainable'],
  sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 14 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 3 }]
},
{
  name: 'Dickies Heavyweight Tee',
  category: 't-shirt', price: 21.99,
  image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600',
  description: 'Workwear-inspired heavyweight tee built to last.',
  tags: ['workwear', 'dickies', 'heavyweight', 'utility'],
  sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 16 }, { size: 'L', stock: 14 }, { size: 'XL', stock: 9 }, { size: 'XXL', stock: 5 }]
},
{
  name: 'Obey Propaganda Tee',
  category: 't-shirt', price: 34.99,
  image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600',
  description: 'Andre the Giant propaganda graphic tee.',
  tags: ['streetwear', 'obey', 'skate', 'graphic'],
  sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 11 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 5 }]
},
{
  name: 'Vans Off The Wall Tee',
  category: 't-shirt', price: 26.99,
  image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600',
  description: 'Classic Off The Wall skate tee from Vans.',
  tags: ['skate', 'vans', 'streetwear', 'casual'],
  sizes: [{ size: 'S', stock: 9 }, { size: 'M', stock: 15 }, { size: 'L', stock: 12 }, { size: 'XL', stock: 7 }]
},
{
  name: 'New Balance Athletics Tee',
  category: 't-shirt', price: 29.99,
  image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600',
  description: 'Retro-inspired athletics tee with NB branding.',
  tags: ['retro', 'new balance', 'sports', 'casual'],
  sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 13 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 5 }]
},
{
  name: 'ASICS Sport Tee',
  category: 't-shirt', price: 24.99,
  image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
  description: 'Lightweight performance tee for running and training.',
  tags: ['running', 'asics', 'sports', 'workout'],
  sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 14 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }]
},
{
  name: 'Gildan Heavy Cotton Tee',
  category: 't-shirt', price: 12.99,
  image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600',
  description: 'Budget-friendly heavy cotton tee, perfect for everyday wear.',
  tags: ['budget', 'gildan', 'basics', 'cotton'],
  sizes: [{ size: 'S', stock: 20 }, { size: 'M', stock: 30 }, { size: 'L', stock: 25 }, { size: 'XL', stock: 15 }, { size: 'XXL', stock: 10 }]
},
{
  name: 'Hanes ComfortSoft Tee',
  category: 't-shirt', price: 9.99,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
  description: 'Value pack-ready ComfortSoft tee for ultimate comfort.',
  tags: ['budget', 'hanes', 'basics', 'comfort'],
  sizes: [{ size: 'S', stock: 25 }, { size: 'M', stock: 35 }, { size: 'L', stock: 28 }, { size: 'XL', stock: 18 }, { size: 'XXL', stock: 12 }]
},

// ========== 15 MORE PANTS ==========

{
  name: 'Uniqlo Ultra Stretch Jeans',
  category: 'pants', price: 49.99,
  image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
  description: 'Ultra stretch jeans with exceptional flexibility and comfort.',
  tags: ['jeans', 'uniqlo', 'stretch', 'casual', 'comfort'],
  sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 14 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 3 }]
},
{
  name: 'Carhartt WIP Cargo Pants',
  category: 'pants', price: 89.99,
  image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600',
  description: 'Durable cargo pants with multiple utility pockets.',
  tags: ['cargo', 'carhartt', 'workwear', 'utility', 'streetwear'],
  sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 8 }, { size: 'L', stock: 7 }, { size: 'XL', stock: 3 }]
},
{
  name: 'Stüssy Work Pants',
  category: 'pants', price: 79.99,
  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
  description: 'Relaxed fit work pants with Stüssy branding.',
  tags: ['workwear', 'stussy', 'casual', 'streetwear'],
  sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 9 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }]
},
{
  name: 'Dickies 874 Work Pants',
  category: 'pants', price: 44.99,
  image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
  description: 'Iconic 874 original fit work pants, a true classic.',
  tags: ['workwear', 'dickies', '874', 'classic', 'utility'],
  sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 12 }, { size: 'XL', stock: 8 }, { size: 'XXL', stock: 5 }]
},
{
  name: 'The North Face Cargo Joggers',
  category: 'pants', price: 69.99,
  image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600',
  description: 'Cargo joggers with stretch and TNF branding.',
  tags: ['joggers', 'north face', 'cargo', 'outdoor', 'casual'],
  sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 11 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 5 }]
},
{
  name: 'Patagonia Baggies Pants',
  category: 'pants', price: 59.99,
  image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600',
  description: 'Quick-dry baggies pants for outdoor adventures.',
  tags: ['outdoor', 'patagonia', 'baggies', 'hiking', 'summer'],
  sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 12 }, { size: 'L', stock: 9 }, { size: 'XL', stock: 5 }]
},
{
  name: 'Fear of God Essentials Sweatpants',
  category: 'pants', price: 119.99,
  image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600',
  description: 'Premium oversized sweatpants with rubberized logo.',
  tags: ['premium', 'essentials', 'sweatpants', 'streetwear', 'fear of god'],
  sizes: [{ size: 'S', stock: 3 }, { size: 'M', stock: 5 }, { size: 'L', stock: 4 }, { size: 'XL', stock: 2 }]
},
{
  name: 'Bape Shark Pants',
  category: 'pants', price: 199.99,
  image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600',
  description: 'Iconic shark camo pants from A Bathing Ape.',
  tags: ['streetwear', 'bape', 'camo', 'hype', 'luxury'],
  sizes: [{ size: 'M', stock: 2 }, { size: 'L', stock: 3 }, { size: 'XL', stock: 1 }]
},
{
  name: 'Supreme Work Pants',
  category: 'pants', price: 138.99,
  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
  description: 'Supreme work pants with cordura reinforcement.',
  tags: ['streetwear', 'supreme', 'workwear', 'hype'],
  sizes: [{ size: 'S', stock: 1 }, { size: 'M', stock: 2 }, { size: 'L', stock: 2 }, { size: 'XL', stock: 1 }]
},
{
  name: 'Zara Cargo Pants',
  category: 'pants', price: 49.99,
  image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
  description: 'Trendy cargo pants with multiple pockets and tapered fit.',
  tags: ['cargo', 'zara', 'streetwear', 'trendy'],
  sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 14 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }]
},
{
  name: 'H&M Relaxed Chinos',
  category: 'pants', price: 39.99,
  image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600',
  description: 'Relaxed fit chinos for a comfortable smart-casual look.',
  tags: ['chino', 'hm', 'casual', 'relaxed', 'smart'],
  sizes: [{ size: 'S', stock: 9 }, { size: 'M', stock: 16 }, { size: 'L', stock: 13 }, { size: 'XL', stock: 8 }, { size: 'XXL', stock: 4 }]
},
{
  name: 'Levi\'s 501 Original Jeans',
  category: 'pants', price: 79.99,
  image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
  description: 'The original button-fly straight cut jeans.',
  tags: ['jeans', 'levis', '501', 'vintage', 'classic'],
  sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 5 }]
},
{
  name: 'Adidas Tiro 21 Pants',
  category: 'pants', price: 64.99,
  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
  description: 'Slim-fit soccer training pants with zipped hems.',
  tags: ['sports', 'adidas', 'training', 'soccer', 'slim'],
  sizes: [{ size: 'S', stock: 7 }, { size: 'M', stock: 13 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 5 }]
},
{
  name: 'Puma Liga Training Pants',
  category: 'pants', price: 54.99,
  image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
  description: 'Regular-fit training pants with dryCELL technology.',
  tags: ['sports', 'puma', 'training', 'drycell'],
  sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 14 }, { size: 'L', stock: 11 }, { size: 'XL', stock: 6 }]
},
{
  name: 'Under Armour Rival Terry Pants',
  category: 'pants', price: 59.99,
  image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600',
  description: 'French terry pants for ultimate warmth and comfort.',
  tags: ['joggers', 'under armour', 'french terry', 'warm'],
  sizes: [{ size: 'S', stock: 6 }, { size: 'M', stock: 11 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }]
}
]);

console.log('✅ Seeded 50 products successfully!');
await mongoose.disconnect();
process.exit(0);