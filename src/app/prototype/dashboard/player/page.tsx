const MOCK_TOURNAMENTS = [
  {
    id: 't-1',
    name: 'Global Squad Championship 2024',
    gameMode: 'Squad',
    map: 'Erangel',
    date: 'Oct 15, 2024 - 18:00 UTC',
    entryFee: 'Free',
    prizePool: '$5,000',
    slots: '25/25',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    organizer: 'PUBG Masters',
  }
];

const MOCK_USER = {
  name: 'Alex "Striker" Chen',
  role: 'Player',
  team: 'Team Apex',
  pubgId: '5123456789',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=0D8ABC&color=fff',
  stats: {
    matchesPlayed: 142,
    wins: 28,
    kdRatio: 4.2,
  }
};

export default function PrototypePlayerDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 border-l-4 border-[#00E5FF] pl-4">Player Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6 lg:col-span-1">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#0f3460]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-[#00E5FF]" />
            <div>
              <h2 className="text-2xl font-bold">{MOCK_USER.name}</h2>
              <p className="text-[#00E5FF]">{MOCK_USER.team}</p>
              <p className="text-xs text-gray-500 mt-1">ID: {MOCK_USER.pubgId}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-300">Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#0f0f1a] p-3 rounded border border-[#0f3460]">
              <span className="text-gray-400">Matches Played</span>
              <span className="font-bold">{MOCK_USER.stats.matchesPlayed}</span>
            </div>
            <div className="flex justify-between items-center bg-[#0f0f1a] p-3 rounded border border-[#0f3460]">
              <span className="text-gray-400">Wins</span>
              <span className="font-bold text-green-400">{MOCK_USER.stats.wins}</span>
            </div>
            <div className="flex justify-between items-center bg-[#0f0f1a] p-3 rounded border border-[#0f3460]">
              <span className="text-gray-400">K/D Ratio</span>
              <span className="font-bold text-[#e94560]">{MOCK_USER.stats.kdRatio}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">My Active Tournaments</h2>
            <div className="bg-[#0f0f1a] rounded border border-[#0f3460] p-4 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-[#00E5FF]">{MOCK_TOURNAMENTS[0].name}</h4>
                <p className="text-sm text-gray-400 mt-1">Starts in: 2h 45m</p>
              </div>
              <button className="bg-[#e94560] hover:bg-[#ff6b81] text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                View Room ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
