'use client';
import { useState } from 'react';

const faqs = [
  {
    q: '1. How does the AI shopping assistant work?',
    a: 'Our AI chatbot understands natural language. Just type what you\'re looking for — like "Show me Nike t-shirts" or "Add Adidas pants size M to cart" — and it handles everything instantly.'
  },
  {
    q: '2. What platforms is it compatible with?',
    a: 'ShopAssist works on any modern browser — Chrome, Firefox, Safari, Edge. It\'s fully responsive so you can shop from desktop, tablet, or mobile.'
  },
  {
    q: '3. Is it easy to set up?',
    a: 'Absolutely! Just create an account, browse products or chat with our AI bot, add items to your cart and checkout. The whole process takes less than 2 minutes.'
  },
  {
    q: '4. Can I customise the assistant\'s tone and responses?',
    a: 'The assistant adapts to your conversation style automatically. It\'s always friendly, concise and helpful — whether you\'re asking casually or giving specific product details.'
  },
  {
    q: '5. Is my payment information secure?',
    a: 'Yes! We support bKash, Nagad, Rocket and Bank Transfer. All transactions are encrypted and your payment details are never stored on our servers.'
  },
  {
    q: '6. What if a product size is out of stock?',
    a: 'Our AI bot will automatically detect unavailable sizes and submit a size request on your behalf. You\'ll be notified when the size becomes available.'
  },
  {
    q: '7. Can I track my order after placing it?',
    a: 'Yes! After placing your order you receive a unique Order ID. You can use this to track your order status. Our team processes orders within 24 hours.'
  },
  {
    q: '8. What is your return policy?',
    a: 'We offer a 7-day return policy for all items in original condition with tags attached. Contact our support team and we\'ll guide you through the return process.'
  },
];

const brands = [
  { name: 'Nike', emoji: '✔️', desc: 'World\'s leading sportswear brand' },
  { name: 'Adidas', emoji: '🌟', desc: 'Premium athletic & lifestyle wear' },
  { name: 'Puma', emoji: '🐆', desc: 'Fast fashion meets sport' },
  { name: "Levi's", emoji: '👖', desc: 'Iconic denim since 1853' },
  { name: 'Champion', emoji: '🏆', desc: 'Heritage American sportswear' },
  { name: 'Under Armour', emoji: '💪', desc: 'Performance gear for athletes' },
  { name: 'H&M', emoji: '🛍️', desc: 'Affordable everyday fashion' },
  { name: 'Zara', emoji: '✨', desc: 'Trendy fast fashion leader' },
  { name: 'Ralph Lauren', emoji: '👑', desc: 'Premium American luxury' },
  { name: 'Tommy Hilfiger', emoji: '🇺🇸', desc: 'Classic American style' },
];

const brandColors: Record<string, string> = {
  'Nike': '#111',
  'Adidas': '#000',
  'Puma': '#E31837',
  "Levi's": '#C41230',
  'Champion': '#CC0000',
  'Under Armour': '#1D1D1B',
  'H&M': '#CC0000',
  'Zara': '#111',
  'Ralph Lauren': '#00234B',
  'Tommy Hilfiger': '#003087',
};

function BrandCard({ brand }: { brand: typeof brands[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', flexShrink: 0 }}
    >
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '12px 28px',
        minWidth: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
        transition: 'transform 0.2s ease',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
      }}>
        <span style={{
          fontWeight: '800',
          fontSize: '16px',
          color: brandColors[brand.name] || '#111',
          letterSpacing: '-0.5px',
        }}>
          {brand.name}
        </span>
      </div>

      {/* Hover popup */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e293b',
          color: '#fff',
          borderRadius: '10px',
          padding: '10px 14px',
          minWidth: '180px',
          zIndex: 100,
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{brand.emoji}</div>
          <p style={{ fontWeight: '700', fontSize: '13px', margin: '0 0 2px' }}>{brand.name}</p>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{brand.desc}</p>
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            background: '#1e293b',
            rotate: '45deg',
          }} />
        </div>
      )}
    </div>
  );
}

function BrandScroller() {
  return (
    <div style={{
      background: '#0f172a',
      borderRadius: '24px',
      padding: '2.5rem 0',
      marginBottom: '3rem',
      overflow: 'hidden',
    }}>
      <p style={{
        color: '#EAB308',
        fontWeight: '700',
        fontSize: '1.1rem',
        textAlign: 'center',
        marginBottom: '1.5rem',
      }}>
        Leading brands trust us.
      </p>

      <div style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0' }}>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          animation: 'brandScroll 25s linear infinite',
          width: 'max-content',
        }}>
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <BrandCard key={i} brand={brand} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brandScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{
      background: '#0f172a',
      borderRadius: '24px',
      padding: '3rem 2rem',
      marginBottom: '3rem',
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        Got questions? We've got answers.
      </h2>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '1rem',
                padding: '1.25rem 0',
              }}
            >
              <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>
                {faq.q}
              </span>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: openIndex === i ? '#EAB308' : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: openIndex === i ? '#000' : '#EAB308',
                fontSize: '12px',
                flexShrink: 0,
                transition: 'all 0.3s',
                transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </span>
            </button>
            {openIndex === i && (
              <p style={{
                color: '#94a3b8',
                fontSize: '14px',
                lineHeight: '1.7',
                margin: '0 0 1.25rem',
                paddingRight: '48px',
              }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e40af', margin: 0 }}>
        {value}
      </h3>
      <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
        border: hovered ? '1px solid #EAB308' : '1px solid #f1f5f9',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '8px', fontSize: '18px' }}>
        {title}
      </h3>
      <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>{desc}</p>
    </div>
  );
}

function MissionCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.12)' : '0 4px 24px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {[
        { title: '🎯 Mission', desc: 'Simplify product discovery through AI-driven assistance.' },
        { title: '👁️ Vision', desc: 'Become the most trusted AI shopping assistant in Bangladesh.' },
        { title: '💎 Values', desc: 'Innovation, Trust, Simplicity, and Customer Success.' },
      ].map((item, i) => (
        <div key={item.title} style={{ marginBottom: i < 2 ? '1.5rem' : 0 }}>
          <h3 style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>
            {item.title}
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function CompanyPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af, #4f46e5, #7c3aed)',
        borderRadius: '24px',
        padding: '5rem 3rem',
        textAlign: 'center',
        marginBottom: '3rem',
      }}>
        <span style={{
          background: 'rgba(255,255,255,0.2)',
          color: '#fff',
          fontSize: '20px',
          fontWeight: '600',
          padding: '6px 16px',
          borderRadius: '999px',
          display: 'inline-block',
          marginBottom: '1.5rem',
        }}>
          ShopAssist
        </span>
        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '1rem',
        }}>
          Smart Shopping<br />
          <span style={{ color: '#FDE047' }}>Powered by AI</span>
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.7',
        }}>
          ShopAssist helps customers discover products faster, compare options intelligently,
          and receive personalized recommendations through artificial intelligence.
        </p>
      </div>

      {/* Who we are */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem',  }}>
            Who We Are
          </h2>
          <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '1rem' }}>
            ShopAssist is an AI-powered e-commerce assistant designed to make online shopping
            easier, faster, and more personalized. We help users find products, compare
            alternatives, and make informed purchasing decisions.
          </p>
          <p style={{ color: '#64748b', lineHeight: '1.8' }}>
            By combining modern AI technologies with user-friendly interfaces, ShopAssist
            transforms the shopping experience into a simple conversation.
          </p>
        </div>
        <MissionCard />
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem',
      }}>
        {[
          { value: '50+', label: 'Products', icon: '👕' },
          { value: '24/7', label: 'AI Support', icon: '🤖' },
          { value: '95%', label: 'Satisfaction', icon: '😊' },
          { value: '100%', label: 'Secure', icon: '🛡️' },
        ].map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Features */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '800',
          textAlign: 'center',
          color: '#0f172a',
          marginBottom: '2rem',
        }}>
          Why ShopAssist?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          <FeatureCard icon="🔍" title="AI Product Search" desc="Search products using natural language — just describe what you want and our AI finds it instantly." />
          <FeatureCard icon="⭐" title="Smart Recommendations" desc="Personalized suggestions based on your preferences, browsing history and needs." />
          <FeatureCard icon="🛒" title="Chat to Checkout" desc="Add to cart and complete your entire order through a simple chat conversation." />
        </div>
      </div>

      {/* Brand Scroller */}
      <BrandScroller />

      {/* FAQ */}
      <FAQSection />
    </div>
  );
}