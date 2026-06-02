import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/SessionProvider';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'TechDojo Fashion',
  description: 'AI-powered fashion store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}