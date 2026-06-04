'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

type Product = {
  _id: string; name: string; category: string; price: number;
  image: string; description: string;
  sizes: { size: string; stock: number }[];
  tags: string[];
};

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { setFeatured((d.products || []).slice(0, 8)); setLoading(false); });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
        borderRadius: '24px',
        padding: '4rem 3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(234, 179, 8, 0.08)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '40%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(234, 179, 8, 0.05)', pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {/* Left content */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{
              display: 'inline-block', background: '#EAB308',
              color: '#000', fontSize: '12px', fontWeight: '700',
              padding: '6px 14px', borderRadius: '999px', marginBottom: '1.5rem'
            }}>
              ✨ New Collection 2026
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '800',
              color: '#ffffff', lineHeight: '1.15', marginBottom: '1rem'
            }}>
              Dress Better.<br />
              <span style={{ color: '#EAB308' }}>Shop Smarter.</span>
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '420px' }}>
              Discover premium fashion from top brands. Browse, add to cart and checkout — all through our AI assistant or the store.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/products" style={{
                background: '#EAB308', color: '#000',
                fontWeight: '700', padding: '14px 28px',
                borderRadius: '12px', textDecoration: 'none',
                fontSize: '15px', transition: 'all 0.2s'
              }}>
                Shop Collection →
              </Link>
              <Link href="/products?category=t-shirt" style={{
                background: 'transparent', color: '#fff',
                fontWeight: '600', padding: '14px 28px',
                borderRadius: '12px', textDecoration: 'none',
                fontSize: '15px', border: '1px solid rgba(255,255,255,0.2)'
              }}>
                Browse T-Shirts
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {['🚚 Free Shipping', '🔄 Easy Returns', '🛡️ Secure Payment'].map(badge => (
                <span key={badge} style={{ color: '#64748b', fontSize: '13px' }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Right — Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flexShrink: 0 }}>
            {[
              { label: 'Products', value: '45+', icon: '👕' },
              { label: 'Brands', value: '8+', icon: '🏷️' },
              { label: 'Happy Customers', value: '500+', icon: '😊' },
              { label: 'AI Assistant', value: '24/7', icon: '🤖' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '1.2rem',
                textAlign: 'center', minWidth: '110px'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{stat.icon}</div>
                <p style={{ color: '#EAB308', fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>{stat.value}</p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Link href="/products?category=t-shirt" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            borderRadius: '16px', padding: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', transition: 'transform 0.2s'
          }}>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Category</p>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>T-Shirts</h3>
              <p style={{ color: '#EAB308', fontSize: '13px', margin: '4px 0 0' }}>10 styles →</p>
            </div>
            <span style={{ fontSize: '3rem' }}>👕</span>
          </div>
        </Link>
        <Link href="/products?category=pants" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            borderRadius: '16px', padding: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer'
          }}>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Category</p>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Pants</h3>
              <p style={{ color: '#EAB308', fontSize: '13px', margin: '4px 0 0' }}>10 styles →</p>
            </div>
            <span style={{ fontSize: '3rem' }}>👖</span>
          </div>
        </Link>
      </div>

      {/* Featured Products */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Featured Products</h2>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0' }}>Hand-picked for you</p>
          </div>
          <Link href="/products" style={{
            color: '#0f172a', fontWeight: '600', fontSize: '14px',
            border: '1px solid #e2e8f0', padding: '8px 16px',
            borderRadius: '10px', textDecoration: 'none'
          }}>
            View All →
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', height: '320px', border: '1px solid #f1f5f9' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {featured.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* AI Chat CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
        <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Try our <span style={{ color: '#EAB308' }}>AI Shopping Assistant</span>
        </h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          Just type what you're looking for — our bot finds it, adds it to your cart, and helps you checkout instantly.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {['"Show me Nike products"', '"Add Adidas tee size M"', '"What\'s in my cart?"', '"Place my order"'].map(ex => (
            <span key={ex} style={{
              background: 'rgba(255,255,255,0.06)', color: '#94a3b8',
              fontSize: '13px', padding: '8px 16px', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>{ex}</span>
          ))}
        </div>
      </div>

    </div>
  );
}