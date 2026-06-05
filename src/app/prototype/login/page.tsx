export default function PrototypeLogin() {
  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[70vh]">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#0f3460] p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Login to <span className="text-[#00E5FF]">PUBG</span>PLATFORM</h1>
        <div className="space-y-4 mb-6">
           <input type="email" placeholder="Email Address" className="w-full bg-[#0f0f1a] border border-[#0f3460] rounded p-3 text-white focus:border-[#00E5FF] outline-none" />
           <input type="password" placeholder="Password" className="w-full bg-[#0f0f1a] border border-[#0f3460] rounded p-3 text-white focus:border-[#00E5FF] outline-none" />
        </div>
        <button className="w-full bg-[#e94560] hover:bg-[#ff6b81] text-white font-bold py-3 rounded transition-colors mb-4">
           Sign In
        </button>
        <div className="text-center text-sm text-gray-500">
           Don't have an account? <a href="#" className="text-[#00E5FF] hover:underline">Register now</a>
        </div>
      </div>
    </div>
  );
}
