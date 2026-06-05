import PrototypeNavbar from '@/components/prototype/Navbar';
import PrototypeFooter from '@/components/prototype/Footer';

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f1a] text-white font-sans">
      <PrototypeNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <PrototypeFooter />
    </div>
  );
}
