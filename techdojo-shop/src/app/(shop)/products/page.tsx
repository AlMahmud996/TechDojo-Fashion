'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: { size: string; stock: number }[];
  tags: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (search) params.set('search', search);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setLoading(false);
    };
    fetchProducts();
  }, [category, search]);

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <Navbar />
      <CartSidebar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">All Products</h1>
          <p className="text-gray-500">Discover our latest collection</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black bg-white transition-colors"
          />

          {/* Category filter */}
          <div className="flex gap-2">
            {['all', 't-shirt', 'pants'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all capitalize
                  ${category === cat
                    ? 'bg-black text-yellow-300'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                  }`}
              >
                {cat === 'all' ? 'All' : cat === 't-shirt' ? 'T-Shirts' : 'Pants'}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">{products.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}