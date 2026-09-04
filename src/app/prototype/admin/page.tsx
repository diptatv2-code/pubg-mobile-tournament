export default function PrototypeAdmin() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 border-l-4 border-[#e94560] pl-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6 text-center">
           <div className="text-3xl font-bold text-[#00E5FF]">1,248</div>
           <div className="text-sm text-gray-500 mt-2">Total Users</div>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6 text-center">
           <div className="text-3xl font-bold text-green-400">45</div>
           <div className="text-sm text-gray-500 mt-2">Active Tournaments</div>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6 text-center">
           <div className="text-3xl font-bold text-yellow-400">$12,400</div>
           <div className="text-sm text-gray-500 mt-2">Prize Pool Managed</div>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6 text-center">
           <div className="text-3xl font-bold text-[#e94560]">3</div>
           <div className="text-sm text-gray-500 mt-2">Pending Reports</div>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Recent Activity</h2>
        <div className="space-y-4">
           <div className="bg-[#0f0f1a] p-4 rounded border border-[#0f3460] flex justify-between items-center">
             <span>New Tournament Created: Solo Conqueror Clash</span>
             <button className="text-sm bg-gray-700 px-3 py-1 rounded">Review</button>
           </div>
           <div className="bg-[#0f0f1a] p-4 rounded border border-[#0f3460] flex justify-between items-center">
             <span>Payment Verification: Team Apex ($10)</span>
             <button className="text-sm bg-green-600 px-3 py-1 rounded text-white">Approve</button>
           </div>
        </div>
      </div>
    </div>
  );
}
