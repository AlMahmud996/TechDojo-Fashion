'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }
    setAdding(true);
    await addToCart(product._id, selectedSize);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-black text-yellow-300 text-xs font-semibold px-2 py-1 rounded-lg capitalize">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.description}</p>

        {/* Price */}
        <p className="text-black font-bold text-lg mb-3">${product.price}</p>

        {/* Sizes */}
        <div className="flex gap-1 flex-wrap mb-4">
          {product.sizes.map(({ size, stock }) => (
            <button
              key={size}
              onClick={() => stock > 0 && setSelectedSize(size)}
              disabled={stock === 0}
              className={`text-xs px-2 py-1 rounded-md border font-medium transition-all
                ${stock === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                  : selectedSize === size
                    ? 'border-black bg-black text-yellow-300'
                    : 'border-gray-300 text-gray-600 hover:border-black'
                }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={adding || !selectedSize}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
            ${added
              ? 'bg-green-500 text-white'
              : 'bg-black text-yellow-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
        >
          {added ? '✓ Added to Cart!' : adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}