'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
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

export default function HomePage() {
  const { data: session } = useSession();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => setFeatured((d.products || []).slice(0, 4)));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="inline-block bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
              New Collection 2026
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Shop Smarter<br />
              with <span className="text-yellow-300">AI Chat</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Browse products, add to cart and checkout — all through natural conversation with our AI assistant.
            </p>
            <div className="flex gap-4">
              <Link href="/products"
                className="bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors">
                Shop Now →
              </Link>
              <Link href="/products"
                className="border border-gray-600 text-white font-semibold px-6 py-3 rounded-xl hover:border-white transition-colors">
                View Collection
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            {[
              { label: 'Products', value: '15+' },
              { label: 'Brands', value: '6+' },
              { label: 'Categories', value: '2' },
              { label: 'AI Powered', value: '100%' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-900 rounded-2xl p-6 text-center">
                <p className="text-yellow-300 text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black">Featured Products</h2>
            <p className="text-gray-500 text-sm mt-1">Hand-picked for you</p>
          </div>
          <Link href="/products"
            className="text-black font-medium text-sm border border-gray-300 px-4 py-2 rounded-lg hover:border-black transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Chat CTA */}
      <div className="bg-black mx-6 mb-16 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Try our <span className="text-yellow-300">AI Shopping Assistant</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Just type what you're looking for and our bot will find it, add it to your cart, and help you checkout.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            '"Show me running products"',
            '"Add Nike tee size M"',
            '"What\'s in my cart?"',
            '"Place my order"'
          ].map(example => (
            <span key={example} className="bg-gray-800 text-gray-300 text-sm px-4 py-2 rounded-full">
              {example}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}