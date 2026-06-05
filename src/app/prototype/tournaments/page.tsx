import Link from 'next/link';

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

export default function PrototypeTournaments() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold border-l-4 border-[#e94560] pl-4">All Tournaments</h1>

        {/* Simple Filters */}
        <div className="flex gap-4">
          <select className="bg-[#1a1a2e] border border-[#0f3460] text-white p-2 rounded">
            <option>All Modes</option>
            <option>Solo</option>
            <option>Duo</option>
            <option>Squad</option>
          </select>
          <select className="bg-[#1a1a2e] border border-[#0f3460] text-white p-2 rounded">
            <option>Any Entry</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_TOURNAMENTS.map(t => (
          <div key={t.id} className="bg-[#1a1a2e] border border-[#0f3460] rounded-lg p-4 flex flex-col md:flex-row items-center justify-between hover:border-[#00E5FF] transition-colors">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div
                className="w-24 h-24 rounded bg-cover bg-center hidden sm:block"
                style={{ backgroundImage: `url('${t.imageUrl}')` }}
              ></div>
              <div>
                <h3 className="text-xl font-bold text-white">{t.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{t.date} • {t.map}</p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[#0f0f1a] px-2 py-1 rounded border border-[#0f3460] text-[#00E5FF]">{t.gameMode}</span>
                  <span className="bg-[#0f0f1a] px-2 py-1 rounded border border-[#0f3460] text-green-400">{t.entryFee}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-end w-full md:w-auto">
              <div className="text-right flex-grow md:flex-grow-0">
                <div className="text-sm text-gray-500">Prize Pool</div>
                <div className="font-bold text-xl text-yellow-400">{t.prizePool}</div>
              </div>
              <Link href={`/prototype/tournaments/${t.id}`} className="bg-[#00E5FF] hover:bg-[#00b8cc] text-[#0f0f1a] font-bold py-2 px-6 rounded transition-colors whitespace-nowrap text-center">
                Join Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
