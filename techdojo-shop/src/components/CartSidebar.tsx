'use client';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const { cart, cartTotal, removeFromCart, clearCart, isOpen, setIsOpen } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/cart');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-black text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🛒</p>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-black underline text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 line-clamp-1">
                    {item.productId?.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                  <p className="font-bold text-sm mt-1">${item.productId?.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId?._id, item.size)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-lg self-start"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-yellow-300 font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout →
            </button>
            <button
              onClick={clearCart}
              className="w-full text-gray-500 text-sm hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}