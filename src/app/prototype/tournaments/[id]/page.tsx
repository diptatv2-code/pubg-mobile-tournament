export default function PrototypeTournamentDetails({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4 text-[#00E5FF]">Global Squad Championship 2024</h1>
        <div className="flex gap-4 text-sm text-gray-400 mb-6">
           <span className="bg-[#0f0f1a] px-3 py-1 rounded border border-[#0f3460]">Squad</span>
           <span className="bg-[#0f0f1a] px-3 py-1 rounded border border-[#0f3460]">Erangel</span>
           <span className="bg-[#0f0f1a] px-3 py-1 rounded border border-[#0f3460]">Oct 15, 2024 - 18:00 UTC</span>
        </div>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Welcome to the Global Squad Championship! Prepare your team for the ultimate battle royale experience. Registration is free, and the prize pool is huge.
        </p>
        <div className="flex gap-8 border-t border-[#0f3460] pt-6">
           <div>
             <div className="text-sm text-gray-500">Prize Pool</div>
             <div className="font-bold text-2xl text-yellow-400">$5,000</div>
           </div>
           <div>
             <div className="text-sm text-gray-500">Registered</div>
             <div className="font-bold text-2xl text-white">25/25 Teams</div>
           </div>
           <div>
             <div className="text-sm text-gray-500">Status</div>
             <div className="font-bold text-2xl text-green-400">Ongoing</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6">
           <h2 className="text-2xl font-bold mb-4 text-white border-l-4 border-[#e94560] pl-4">Rules & Information</h2>
           <ul className="list-disc pl-6 space-y-2 text-gray-300">
             <li>No hacking or cheating. Violators will be permanently banned.</li>
             <li>No emulator usage. This is a mobile-only tournament.</li>
             <li>Teams must join the room 15 minutes before start time.</li>
             <li>Team names and player IDs must match registration exactly.</li>
             <li>The Organizer's decision is final in all disputes.</li>
           </ul>
        </div>
        <div className="lg:col-span-1 bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6">
           <h2 className="text-2xl font-bold mb-4 text-white border-l-4 border-[#e94560] pl-4">Actions</h2>
           <button className="w-full bg-[#00E5FF] hover:bg-[#00b8cc] text-[#0f0f1a] font-bold py-3 rounded mb-4 transition-colors">
             View Bracket / Leaderboard
           </button>
           <button className="w-full bg-[#0f0f1a] hover:bg-[#0f3460] text-white border border-[#0f3460] font-bold py-3 rounded transition-colors">
             Contact Organizer
           </button>
        </div>
      </div>
    </div>
  );
}
