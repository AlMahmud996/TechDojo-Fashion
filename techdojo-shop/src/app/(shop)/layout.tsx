import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import ChatWidget from '@/components/ChatWidget';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <Navbar />
      <CartSidebar />
      <ChatWidget />
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 2rem',
        width: '100%'
      }}>
        {children}
      </main>
    </div>
  );
}