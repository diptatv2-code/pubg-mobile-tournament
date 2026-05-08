'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient bg-grid overflow-hidden flex items-center">

      {/* Ambient light blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{background: 'radial-gradient(circle, #F2A900, transparent)'}} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{background: 'radial-gradient(circle, #00C2FF, transparent)'}} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{background: 'radial-gradient(circle, #8B5CF6, transparent)'}} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Text */}
          <div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{background:'rgba(242,169,0,0.1)', border:'1px solid rgba(242,169,0,0.3)', color:'#F2A900'}}>
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot inline-block" />
              Live Tournaments Active
            </motion.div>

            <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none mb-2">
              <span className="gradient-text-gold text-glow-gold block">PUBG MOBILE</span>
              <span className="text-white block">TOURNAMENT</span>
              <span className="gradient-text-multi block">PLATFORM</span>
            </motion.h1>

            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.25}}
              className="text-lg mt-6 mb-8 max-w-lg"
              style={{color:'#8888AA'}}>
              Host epic tournaments, build your squad, and compete for glory.
              The #1 platform for <span style={{color:'#F2A900',fontWeight:700}}>PUBG Mobile</span> competitive play.
            </motion.p>

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.35}}
              className="flex flex-wrap gap-4">
              <Link href="/tournaments/create" className="btn-primary text-sm">
                🏆 Host Tournament
              </Link>
              <Link href="/tournaments" className="btn-secondary text-sm">
                🎮 Find Tournaments
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
              className="flex flex-wrap gap-6 mt-10">
              {[
                {label:'Tournaments', value:'2,400+', color:'#F2A900'},
                {label:'Players', value:'48,000+', color:'#00C2FF'},
                {label:'Prize Pool', value:'$240K+', color:'#00FF88'},
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-black" style={{color:s.color}}>{s.value}</div>
                  <div className="text-xs uppercase tracking-widest" style={{color:'#8888AA'}}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — PUBG Character */}
          <motion.div initial={{opacity:0,x:60,scale:0.9}} animate={{opacity:1,x:0,scale:1}}
            transition={{duration:0.8,delay:0.2,type:'spring',stiffness:80}}
            className="flex justify-center items-end relative">

            {/* Glow circle behind character */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full opacity-20 blur-2xl"
                style={{background:'radial-gradient(circle, #F2A900 0%, #00C2FF 50%, #8B5CF6 100%)'}} />
            </div>

            {/* PUBG Character CSS Art */}
            <div className="pubg-character relative z-10">
              <div className="pubg-helmet" />
              <div className="pubg-face" />
              <div className="pubg-body" />
              <div className="pubg-arm-left" />
              <div className="pubg-arm-right" />
              <div className="pubg-gun" />
              <div className="pubg-leg-left" />
              <div className="pubg-leg-right" />
            </div>

            {/* Floating stat badges around character */}
            <motion.div animate={{y:[-6,6,-6]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
              className="absolute top-8 right-0 px-3 py-2 rounded-lg text-xs font-bold card-gold"
              style={{background:'rgba(14,15,28,0.9)'}}>
              <div style={{color:'#F2A900'}} className="font-display text-lg">🏆 WWCD</div>
              <div style={{color:'#8888AA'}}>Winner Winner</div>
            </motion.div>

            <motion.div animate={{y:[6,-6,6]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}
              className="absolute top-1/3 left-0 px-3 py-2 rounded-lg text-xs font-bold card-blue"
              style={{background:'rgba(14,15,28,0.9)'}}>
              <div style={{color:'#00C2FF'}} className="font-display text-lg">💀 18 Kills</div>
              <div style={{color:'#8888AA'}}>Match MVP</div>
            </motion.div>

            <motion.div animate={{y:[-4,8,-4]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}
              className="absolute bottom-16 right-4 px-3 py-2 rounded-lg text-xs font-bold card-purple"
              style={{background:'rgba(14,15,28,0.9)'}}>
              <div style={{color:'#8B5CF6'}} className="font-display text-lg">⚡ LIVE</div>
              <div style={{color:'#8888AA'}} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot inline-block"/>
                Match #3
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Kill feed ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-2 overflow-hidden"
        style={{background:'rgba(0,0,0,0.6)', borderTop:'1px solid rgba(242,169,0,0.2)'}}>
        <div className="kill-feed-ticker whitespace-nowrap text-xs font-mono">
          {['🔫 Ghost_X99 eliminated ShadowHunter with M416',
            '💀 NightRaider knocked Phantom_01',
            '🏆 Team Alpha wins Match #2',
            '⚡ DragonSlayer — 8 kill streak!',
            '🎯 SniperKing headshot from 450m',
            '💣 BlitzSquad wins Match #3 — WWCD!',
          ].map((e,i) => (
            <span key={i} className="mx-8" style={{color: i%2===0 ? '#F2A900':'#00C2FF'}}>{e}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
