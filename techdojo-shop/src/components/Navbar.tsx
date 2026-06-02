'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount, setIsOpen } = useCart();

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Logo */}
      <Link href="/" className="text-yellow-300 font-bold text-xl tracking-tight">
        TECHDOJO
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
          Home
        </Link>
        <Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">
          All Products
        </Link>
        <Link href="/products?category=t-shirt" className="text-gray-400 hover:text-white text-sm transition-colors">
          T-Shirts
        </Link>
        <Link href="/products?category=pants" className="text-gray-400 hover:text-white text-sm transition-colors">
          Pants
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Cart button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-400 transition-colors"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>

        {/* User */}
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden md:block">
              Hi, {session.user?.name?.split(' ')[0]}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}