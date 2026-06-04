import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <Navbar />
      <CartSidebar />
      <main className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
        {children}
      </main>
    </div>
  );
}