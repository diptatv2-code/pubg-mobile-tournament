export default function PrototypeOrganizerDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 border-l-4 border-[#e94560] pl-4">Organizer Dashboard</h1>
      <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Manage Tournaments</h2>
        <div className="bg-[#0f0f1a] rounded border border-[#0f3460] p-4 flex justify-between items-center mb-4">
           <div>
             <h4 className="font-bold text-[#00E5FF]">Global Squad Championship 2024</h4>
             <p className="text-sm text-gray-400 mt-1">25/25 Registered Teams</p>
           </div>
           <button className="bg-[#e94560] hover:bg-[#ff6b81] text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
             Manage Bracket
           </button>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Payment Tracking</h2>
        <div className="text-center text-gray-500 py-8 border-2 border-dashed border-[#0f3460] rounded">
          No pending payments.
        </div>
      </div>
    </div>
  );
}
