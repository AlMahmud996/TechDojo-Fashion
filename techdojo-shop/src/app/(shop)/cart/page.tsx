'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'bank' | '';

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, clearCart, refreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [step, setStep] = useState<'cart' | 'payment'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountName: '', accountNumber: '', bankName: '', branch: ''
  });
  const [paymentError, setPaymentError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) { alert(data.error || 'Checkout failed'); setLoading(false); return; }
      await refreshCart();
      setOrderId(data.orderId);
      setOrdered(true);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handlePaymentSubmit = async () => {
    setPaymentError('');
    if (!paymentMethod) { setPaymentError('Please select a payment method'); return; }
    if (paymentMethod !== 'bank' && !paymentNumber) { setPaymentError('Please enter your mobile number'); return; }
    if (paymentMethod !== 'bank' && !transactionId) { setPaymentError('Please enter your transaction ID'); return; }
    if (paymentMethod === 'bank') {
      if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName) {
        setPaymentError('Please fill all bank details'); return;
      }
    }

    setProcessingPayment(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    setProcessingPayment(false);
    await handleCheckout();
  };

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', color: '#E2136E', bg: '#FDE8F1', number: '01XXXXXXXXX', icon: '💳', desc: 'Send to: 01712-XXX-XXX' },
    { id: 'nagad', name: 'Nagad', color: '#F05829', bg: '#FEEDE8', number: '01XXXXXXXXX', icon: '📱', desc: 'Send to: 01811-XXX-XXX' },
    { id: 'rocket', name: 'Rocket', color: '#8B1FA9', bg: '#F3E8F9', number: '01XXXXXXXXX', icon: '🚀', desc: 'Send to: 01XXXXX-XXXXX' },
    { id: 'bank', name: 'Bank Transfer', color: '#1e40af', bg: '#EFF6FF', number: '', icon: '🏦', desc: 'Transfer to our bank account' },
  ];

  // Order success
  if (ordered) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{
          background: '#f0fdf4', border: '2px solid #86efac',
          borderRadius: '24px', padding: '3rem 2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
            Order Confirmed!
          </h1>
          <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>
            Your payment is being verified. We'll confirm shortly!
          </p>
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '1rem',
            margin: '1.5rem 0', border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 4px' }}>Order ID</p>
            <p style={{ fontFamily: 'monospace', fontWeight: '700', color: '#0f172a', margin: 0, fontSize: '14px' }}>
              #{orderId?.toString().slice(-8).toUpperCase()}
            </p>
          </div>
          <p style={{ color: '#22c55e', fontSize: '14px', fontWeight: '600', marginBottom: '2rem' }}>
            ✅ Payment via {paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'nagad' ? 'Nagad' : paymentMethod === 'rocket' ? 'Rocket' : 'Bank Transfer'}
          </p>
          <Link href="/products" style={{
            background: '#0f172a', color: '#EAB308',
            padding: '12px 28px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: '700', fontSize: '15px'
          }}>
            Continue Shopping →
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
          Your cart is empty
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Add some products to get started!</p>
        <Link href="/products" style={{
          background: '#0f172a', color: '#EAB308',
          padding: '12px 28px', borderRadius: '12px',
          textDecoration: 'none', fontWeight: '700'
        }}>
          Browse Products →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header with steps */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1rem' }}>
          {step === 'cart' ? '🛒 Your Cart' : '💳 Payment'}
        </h1>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['Cart', 'Payment', 'Confirm'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: i === 0 ? '#0f172a' : i === 1 && step === 'payment' ? '#0f172a' : '#e2e8f0',
                color: i === 0 ? '#EAB308' : i === 1 && step === 'payment' ? '#EAB308' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '700'
              }}>
                {i + 1}
              </div>
              <span style={{
                fontSize: '13px', fontWeight: '600',
                color: i === 0 || (i === 1 && step === 'payment') ? '#0f172a' : '#94a3b8'
              }}>{s}</span>
              {i < 2 && <div style={{ width: '40px', height: '1px', background: '#e2e8f0' }} />}
            </div>
          ))}
        </div>
      </div>

      {step === 'cart' ? (
        /* CART STEP */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((item: any, i: number) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '16px', padding: '1.25rem',
                display: 'flex', gap: '1rem', alignItems: 'center',
                border: '1px solid #f1f5f9'
              }}>
                <img src={item.productId?.image} alt={item.productId?.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', color: '#0f172a', margin: 0, fontSize: '15px' }}>
                    {item.productId?.name}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0' }}>
                    Size: <strong>{item.size}</strong> · Qty: <strong>{item.quantity}</strong>
                  </p>
                  <p style={{ fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    ${((item.productId?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.productId?._id, item.size)}
                  style={{
                    background: '#fee2e2', color: '#ef4444', border: 'none',
                    borderRadius: '8px', padding: '8px 12px', cursor: 'pointer',
                    fontSize: '13px', fontWeight: '600'
                  }}>
                  Remove
                </button>
              </div>
            ))}
            <button onClick={clearCart}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
              🗑️ Clear entire cart
            </button>
          </div>

          {/* Summary */}
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '1.5rem',
            border: '1px solid #f1f5f9', position: 'sticky', top: '100px'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>
              Order Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
              {cart.map((item: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>
                    {item.productId?.name?.split(' ').slice(0, 3).join(' ')} × {item.quantity}
                  </span>
                  <span style={{ fontWeight: '600' }}>${((item.productId?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <p style={{ color: '#22c55e', fontSize: '12px', margin: '4px 0 0' }}>✅ Free shipping included</p>
            </div>
            <button onClick={() => setStep('payment')}
              style={{
                width: '100%', background: '#0f172a', color: '#EAB308',
                border: 'none', borderRadius: '12px', padding: '14px',
                fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px'
              }}>
              Proceed to Payment →
            </button>
            <Link href="/products" style={{ display: 'block', textAlign: 'center', color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>

      ) : (
        /* PAYMENT STEP */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          <div>
            {/* Payment methods */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem', fontSize: '16px' }}>
                Select Payment Method
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {paymentMethods.map(method => (
                  <button key={method.id} onClick={() => { setPaymentMethod(method.id as PaymentMethod); setPaymentNumber(''); setTransactionId(''); }}
                    style={{
                      background: paymentMethod === method.id ? method.bg : '#f8fafc',
                      border: `2px solid ${paymentMethod === method.id ? method.color : '#e2e8f0'}`,
                      borderRadius: '12px', padding: '1rem', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.2s'
                    }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{method.icon}</div>
                    <p style={{ fontWeight: '700', color: method.color, margin: 0, fontSize: '15px' }}>{method.name}</p>
                    <p style={{ color: '#64748b', fontSize: '11px', margin: '2px 0 0' }}>{method.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment form */}
            {paymentMethod && paymentMethod !== 'bank' && (
              <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem', fontSize: '16px' }}>
                  {paymentMethod === 'bkash' ? '💳 bKash' : paymentMethod === 'nagad' ? '📱 Nagad' : '🚀 Rocket'} Payment Details
                </h3>

                {/* Instructions */}
                <div style={{
                  background: paymentMethods.find(m => m.id === paymentMethod)?.bg,
                  borderRadius: '12px', padding: '1rem', marginBottom: '1rem',
                  border: `1px solid ${paymentMethods.find(m => m.id === paymentMethod)?.color}33`
                }}>
                  <p style={{ fontWeight: '600', color: '#0f172a', margin: '0 0 4px', fontSize: '13px' }}>
                    📋 Instructions:
                  </p>
                  <p style={{ color: '#64748b', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                    1. Open your {paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'nagad' ? 'Nagad' : 'Rocket'} app<br />
                    2. Send <strong>${cartTotal.toFixed(2)} BDT</strong> to <strong>01712-000-000</strong><br />
                    3. Enter your number and transaction ID below
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>
                      Your {paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'nagad' ? 'Nagad' : 'Rocket'} Number
                    </label>
                    <input type="text" placeholder="01XXXXXXXXX" value={paymentNumber}
                      onChange={e => setPaymentNumber(e.target.value)}
                      style={{
                        width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px',
                        padding: '10px 14px', fontSize: '14px', outline: 'none',
                        boxSizing: 'border-box'
                      }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>
                      Transaction ID
                    </label>
                    <input type="text" placeholder="e.g. 8N7A6B5K4J" value={transactionId}
                      onChange={e => setTransactionId(e.target.value)}
                      style={{
                        width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px',
                        padding: '10px 14px', fontSize: '14px', outline: 'none',
                        boxSizing: 'border-box'
                      }} />
                  </div>
                </div>
              </div>
            )}

            {/* Bank transfer form */}
            {paymentMethod === 'bank' && (
              <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '1rem', fontSize: '16px' }}>
                  🏦 Bank Transfer Details
                </h3>

                {/* Bank info */}
                <div style={{
                  background: '#EFF6FF', borderRadius: '12px', padding: '1rem',
                  marginBottom: '1rem', border: '1px solid #bfdbfe'
                }}>
                  <p style={{ fontWeight: '600', color: '#1e40af', margin: '0 0 8px', fontSize: '13px' }}>
                    Transfer to our account:
                  </p>
                  {[
                    { label: 'Bank Name', value: 'Dutch-Bangla Bank Ltd.' },
                    { label: 'Account Name', value: 'ShopAssist Ltd.' },
                    { label: 'Account No.', value: '1234567890' },
                    { label: 'Branch', value: 'Dhanmondi Branch, Dhaka' },
                    { label: 'Routing No.', value: '090261234' },
                    { label: 'Amount', value: `${cartTotal.toFixed(2)} BDT` },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                      <span style={{ color: '#64748b' }}>{item.label}:</span>
                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Your Account Name', key: 'accountName', placeholder: 'John Doe' },
                    { label: 'Your Account Number', key: 'accountNumber', placeholder: '1234567890' },
                    { label: 'Your Bank Name', key: 'bankName', placeholder: 'e.g. Dutch-Bangla Bank' },
                    { label: 'Branch Name', key: 'branch', placeholder: 'e.g. Dhanmondi Branch' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>
                        {field.label}
                      </label>
                      <input type="text" placeholder={field.placeholder}
                        value={bankDetails[field.key as keyof typeof bankDetails]}
                        onChange={e => setBankDetails({ ...bankDetails, [field.key]: e.target.value })}
                        style={{
                          width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px',
                          padding: '10px 14px', fontSize: '14px', outline: 'none',
                          boxSizing: 'border-box'
                        }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentError && (
              <div style={{
                background: '#fee2e2', border: '1px solid #fca5a5',
                borderRadius: '10px', padding: '12px', marginBottom: '1rem',
                color: '#dc2626', fontSize: '13px', fontWeight: '600'
              }}>
                ⚠️ {paymentError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setStep('cart')}
                style={{
                  background: '#f1f5f9', color: '#64748b', border: 'none',
                  borderRadius: '12px', padding: '14px 24px', fontSize: '14px',
                  fontWeight: '600', cursor: 'pointer'
                }}>
                ← Back
              </button>
              <button onClick={handlePaymentSubmit} disabled={processingPayment || loading}
                style={{
                  flex: 1, background: processingPayment || loading ? '#e2e8f0' : '#0f172a',
                  color: processingPayment || loading ? '#94a3b8' : '#EAB308',
                  border: 'none', borderRadius: '12px', padding: '14px',
                  fontSize: '15px', fontWeight: '700',
                  cursor: processingPayment || loading ? 'not-allowed' : 'pointer'
                }}>
                {processingPayment ? '⏳ Processing Payment...' : loading ? '📦 Placing Order...' : '✅ Confirm Payment & Place Order'}
              </button>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '1.5rem',
            border: '1px solid #f1f5f9', position: 'sticky', top: '100px'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
              Order Summary
            </h2>
            {cart.map((item: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <img src={item.productId?.image} alt={item.productId?.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                    {item.productId?.name?.split(' ').slice(0, 3).join(' ')}
                  </p>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0' }}>
                    Size: {item.size} · Qty: {item.quantity}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    ${((item.productId?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700' }}>Total</span>
                <span style={{ fontSize: '1.3rem', fontWeight: '800' }}>${cartTotal.toFixed(2)}</span>
              </div>
              {paymentMethod && (
                <div style={{
                  marginTop: '12px', background: '#f0fdf4',
                  borderRadius: '8px', padding: '8px 12px',
                  border: '1px solid #bbf7d0'
                }}>
                  <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '600', margin: 0 }}>
                    ✅ Paying via {paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'nagad' ? 'Nagad' : paymentMethod === 'rocket' ? 'Rocket' : 'Bank Transfer'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}