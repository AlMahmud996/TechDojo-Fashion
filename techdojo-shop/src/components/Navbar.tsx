'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, type SVGProps } from 'react';

const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

const ShoppingBag = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <path d="M6 7h12l-1 13H7L6 7z" />
    <path d="M9 10a3 3 0 0 1 6 0" />
  </svg>
);

const User = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogOut = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Navbar () {
  const { data: session } = useSession();
  const { cartCount, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All Products' },
    { href: '/products?category=t-shirt', label: 'T-Shirts' },
    { href: '/company', label: 'Company' },
  ];

  return (
    <>
      <nav
      
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/10'
            : 'bg-black'
        }`}
      >
        {/* Increased horizontal padding - from px-4 to px-6 sm:px-8 lg:px-12 */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - ShopAssist */}
            <Link 
              href="/" 
              className="group relative overflow-hidden"
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                ShopAssist
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-2 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative group"
              >
                <div className="relative p-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
                  <ShoppingBag className="w-5 h-5 text-black" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>

              {/* User Section */}
              {session ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <span className="text-black font-semibold text-sm">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 text-sm hidden lg:block">
                      {session.user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="relative px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold text-sm hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 overflow-hidden group"
                >
                  <span className="relative z-10">Sign in</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 transform ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          {/* Added same padding to mobile menu */}
          <div className="px-6 sm:px-8 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-white text-base font-medium transition-colors border-b border-white/10 hover:border-yellow-400"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 space-y-3">
              {/* Mobile Cart */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-black/20 px-2 py-1 rounded-full text-sm">
                    {cartCount} items
                  </span>
                )}
              </button>
              
              {/* Mobile User */}
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <span className="text-black font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{session.user?.name}</p>
                      <p className="text-gray-400 text-sm">{session.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}