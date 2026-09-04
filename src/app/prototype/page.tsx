import Link from 'next/link';

// Use local mock data so we don't interfere with the main app's lib
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
  },
  {
    id: 't-2',
    name: 'Weekly Duo Scrims',
    gameMode: 'Duo',
    map: 'Miramar',
    date: 'Oct 20, 2024 - 20:00 UTC',
    entryFee: '$10',
    prizePool: '$500',
    slots: '12/25',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80',
    organizer: 'Elite Gaming',
  },
  {
    id: 't-3',
    name: 'Solo Conqueror Clash',
    gameMode: 'Solo',
    map: 'Sanhok',
    date: 'Oct 25, 2024 - 15:00 UTC',
    entryFee: '$5',
    prizePool: '$250',
    slots: '45/100',
    status: 'Registration Open',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80',
    organizer: 'Solo Kings',
  },
];

export default function PrototypeHome() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl p-12 text-center border border-[#0f3460] shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] via-[#e94560] to-[#00E5FF]"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          DOMINATE THE <span className="text-[#00E5FF]">BATTLEGROUNDS</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The ultimate community-run tournament platform. Compete for glory, climb the leaderboards, and win real prizes.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/prototype/tournaments" className="bg-[#00E5FF] hover:bg-[#00b8cc] text-[#0f0f1a] font-bold py-3 px-8 rounded text-lg transition-transform hover:scale-105">
            Find a Match
          </Link>
          <button className="bg-transparent border-2 border-[#e94560] text-[#e94560] hover:bg-[#e94560] hover:text-white font-bold py-3 px-8 rounded text-lg transition-colors">
            Host Tournament
          </button>
        </div>
      </div>

      {/* Featured Tournaments */}
      <h2 className="text-3xl font-bold mb-8 border-l-4 border-[#00E5FF] pl-4">Featured Tournaments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {MOCK_TOURNAMENTS.map(t => (
          <div key={t.id} className="bg-[#1a1a2e] rounded-lg overflow-hidden border border-[#0f3460] hover:border-[#00E5FF] transition-all hover:-translate-y-1">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url('${t.imageUrl}')` }}
            >
              <div className="w-full h-full bg-black bg-opacity-40 flex items-end p-4">
                <span className={`px-3 py-1 rounded text-sm font-bold ${
                  t.status === 'Ongoing' ? 'bg-green-500 text-white' :
                  t.status === 'Upcoming' ? 'bg-orange-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {t.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{t.name}</h3>
              <p className="text-gray-400 text-sm mb-4">By {t.organizer}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0f0f1a] p-2 rounded text-center">
                  <span className="block text-xs text-gray-500">Mode</span>
                  <span className="font-semibold text-[#00E5FF]">{t.gameMode}</span>
                </div>
                <div className="bg-[#0f0f1a] p-2 rounded text-center">
                  <span className="block text-xs text-gray-500">Entry</span>
                  <span className="font-semibold text-green-400">{t.entryFee}</span>
                </div>
                <div className="bg-[#0f0f1a] p-2 rounded text-center">
                  <span className="block text-xs text-gray-500">Prize</span>
                  <span className="font-semibold text-yellow-400">{t.prizePool}</span>
                </div>
                <div className="bg-[#0f0f1a] p-2 rounded text-center">
                  <span className="block text-xs text-gray-500">Slots</span>
                  <span className="font-semibold">{t.slots}</span>
                </div>
              </div>

              <Link href={`/prototype/tournaments/${t.id}`} className="block text-center w-full bg-[#16213e] hover:bg-[#0f3460] text-white py-2 rounded transition-colors border border-[#0f3460]">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
