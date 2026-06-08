'use client';
import { useState, type SVGProps } from 'react';
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

const Heart = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 21c-.6 0-1.2-.2-1.7-.5C5.8 16.8 2 13.3 2 8.8 2 5.7 4.5 3 7.6 3c1.8 0 3.4.8 4.4 2.1C13 3.8 14.6 3 16.4 3 19.5 3 22 5.7 22 8.8c0 4.5-3.8 8-8.3 11.7-.5.3-1.1.5-1.7.5Z" />
  </svg>
);

const ShoppingBag = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M6 7h12l1 14H5L6 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="m12 17.3-4.8 2.5 1-5.8L3.5 9.8l5.9-.5L12 4.2l2.6 5.1 5.9.5-4.7 4.4 1 5.8L12 17.3Z" />
  </svg>
);

const TrendingUp = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);


export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [noSizeWarning, setNoSizeWarning] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setNoSizeWarning(true);
      setTimeout(() => setNoSizeWarning(false), 2000);
      return;
    }
    setAdding(true);
    try {
      await addToCart(product._id, selectedSize);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Add to cart error:', error);
    }
    setAdding(false);
  };

  const getStockStatus = () => {
    const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);
    if (totalStock === 0) return { text: 'Out of Stock', color: 'text-red-500', bg: 'bg-red-50' };
    if (totalStock < 10) return { text: 'Low Stock', color: 'text-orange-500', bg: 'bg-orange-50' };
    return { text: 'In Stock', color: 'text-green-500', bg: 'bg-green-50' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`w-4 h-4 transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
        />
      </button>

      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-gradient-to-r from-black to-gray-900 text-yellow-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {product.category}
          </span>
          {product.tags?.includes('trending') && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm text-black px-6 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-yellow-300 hover:scale-105">
          Quick View
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 bg-white">
        {/* Stock Status */}
        <div className="mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Product Name & Rating */}
        <div className="mb-2">
          <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1 hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-gray-500">({Math.floor(Math.random() * 200) + 20} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            ${product.price}
          </p>
          {product.price > 50 && (
            <p className="text-sm text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</p>
          )}
          {product.price > 50 && (
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              -20%
            </span>
          )}
        </div>

        {/* Sizes */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">Select Size</span>
            {noSizeWarning
              ? <span className="text-xs text-red-500 font-semibold">⚠️ Pick a size first!</span>
              : <span className="text-xs text-gray-400">Size Guide</span>
            }
          </div>
          <div className="size-selector flex gap-2 flex-wrap">
            {product.sizes.map(({ size, stock }) => (
              <button
                key={size}
                onClick={() => stock > 0 && setSelectedSize(size)}
                disabled={stock === 0}
                className={`relative text-xs px-3 py-2 rounded-lg font-medium transition-all duration-300
                  ${stock === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                    : selectedSize === size
                      ? 'bg-black text-yellow-300 shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
              >
                {size}
                {stock > 0 && stock < 5 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={adding || stockStatus.text === 'Out of Stock' || !selectedSize}
          className={`relative w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden group/btn
            ${added
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              : stockStatus.text === 'Out of Stock'
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-black to-gray-800 text-yellow-300 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:scale-105 active:scale-95'
            }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart!
              </>
            ) : adding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : stockStatus.text === 'Out of Stock' ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                {selectedSize ? 'Add to Cart' : 'Select a Size'}
              </>
            )}
          </span>

          {/* Button hover effect */}
          {!added && stockStatus.text !== 'Out of Stock' && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          )}
        </button>

        {/* Free Shipping Badge */}
        {product.price > 30 && (
          <div className="mt-3 text-center">
            <p className="text-xs text-green-600 font-medium">✨ Free Shipping on this item</p>
          </div>
        )}
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-500" />
    </div>
  );
}