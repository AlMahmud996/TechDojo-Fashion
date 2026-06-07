'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

type Message = {
  role: 'user' | 'bot';
  content: string;
  products?: any[];
  intent?: string;
};

export default function ChatWidget() {
  const { data: session } = useSession();
  const { refreshCart } = useCart();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: "Hey! 👋 I'm ShopBot. I can help you browse products, add items to cart, and checkout. What are you looking for today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const send = useCallback(async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      setMessages(prev => [...prev, {
        role: 'bot',
        content: data.reply,
        products: data.products,
        intent: data.intent
      }]);

      if (['add_to_cart', 'remove_from_cart', 'checkout'].includes(data.intent)) {
        await refreshCart();
      }

      if (!isOpen) setUnread(prev => prev + 1);

    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "Sorry, something went wrong. Please try again! 😅"
      }]);
    }

    setLoading(false);
  }, [input, loading, isOpen, refreshCart]);

  const suggestions = [
    '👕 Show me t-shirts',
    '👖 Show me pants',
    '🛒 View my cart',
    '🏃 Running products',
  ];

  if (!session) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          border: '2px solid #EAB308',
          color: '#EAB308',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {isOpen ? '✕' : '💬'}
        {unread > 0 && !isOpen && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: '#ef4444',
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {unread}
          </span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '380px',
          maxHeight: '600px',
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#EAB308',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}>
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#fff', fontWeight: '700', fontSize: '14px', margin: 0 }}>
                ShopBot
              </p>
              <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>
                ● Online · Powered by Claude AI
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: '#64748b',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '380px',
            background: '#f8fafc',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                    : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#0f172a',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: msg.role === 'bot' ? '1px solid #e2e8f0' : 'none',
                }}>
                  {msg.content}

                  {/* Product chips */}
                  {msg.products && msg.products.length > 0 && (
                    <div style={{
                      marginTop: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}>
                      {msg.products.slice(0, 5).map((p: any, pi: number) => (
                        <div
                          key={pi}
                          onClick={() => send(`Add ${p.name} to my cart`)}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '8px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          <p style={{
                            fontWeight: '600',
                            fontSize: '12px',
                            color: '#0f172a',
                            margin: 0,
                          }}>
                            {p.name}
                          </p>
                          <p style={{
                            color: '#64748b',
                            fontSize: '11px',
                            margin: '2px 0 0',
                          }}>
                            ${p.price} · {p.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Checkout success */}
                  {msg.intent === 'checkout' && (
                    <div style={{
                      marginTop: '8px',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '8px',
                    }}>
                      <p style={{
                        color: '#16a34a',
                        fontSize: '12px',
                        fontWeight: '600',
                        margin: 0,
                      }}>
                        ✅ Order placed successfully!
                      </p>
                    </div>
                  )}

                  {/* Size unavailable */}
                  {msg.intent === 'size_unavailable' && (
                    <div style={{
                      marginTop: '8px',
                      background: '#fff7ed',
                      border: '1px solid #fed7aa',
                      borderRadius: '8px',
                      padding: '8px',
                    }}>
                      <p style={{
                        color: '#ea580c',
                        fontSize: '12px',
                        fontWeight: '600',
                        margin: 0,
                      }}>
                        📋 Size request submitted!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '18px 18px 18px 4px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: '#64748b',
                }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length <= 2 && (
            <div style={{
              padding: '8px 12px',
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              borderTop: '1px solid #f1f5f9',
              background: '#fff',
            }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    color: '#475569',
                    fontWeight: '500',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: '8px',
            background: '#fff',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                outline: 'none',
                background: '#f8fafc',
                color: '#0f172a',
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim()
                  ? '#e2e8f0'
                  : 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: loading || !input.trim() ? '#94a3b8' : '#EAB308',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}