'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [strength, setStrength] = useState(0);

  const checkStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.match(/[A-Z]/)) score++;
    if (pwd.match(/[0-9]/)) score++;
    if (pwd.match(/[@$!%*?&]/)) score++;
    setStrength(score);
  };

  const strengthColor = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][strength - 1] || 'bg-gray-200';
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) { setError('Please agree to the Terms & Conditions'); return; }
    setLoading(true);
    setError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Registration failed'); setLoading(false); return; }
    router.push('/login?registered=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">

      <div className="w-full max-w-md">
        {/* Feature badges */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: '💳', label: 'Secure Payment' },
            { icon: '🚚', label: 'Free Shipping' },
            { icon: '🎧', label: '24/7 Support' },
          ].map(item => (
            <div key={item.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-white text-xs font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 mb-3">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">ShopAssist</h1>
          <p className="text-white/80 text-sm mt-1">Join the future of smart shopping</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                <input type="text" required placeholder="John Doe"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                <input type="email" required placeholder="john@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input type={showPassword ? 'text' : 'password'} required
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); checkStrength(e.target.value); }}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strengthColor}`}
                      style={{ width: `${(strength / 4) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{strengthLabel}</span>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-purple-500 cursor-pointer" />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="#" className="text-purple-600 font-medium hover:underline">Terms & Conditions</Link>
                {' '}and{' '}
                <Link href="#" className="text-purple-600 font-medium hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 hover:shadow-lg flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create Account →</>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-2">
            <span className="text-purple-600">🛡️</span>
            <p className="text-xs text-purple-800">Your data is protected with bank-grade encryption</p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 font-semibold hover:text-purple-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}