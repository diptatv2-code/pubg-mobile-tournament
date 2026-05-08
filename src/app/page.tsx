import Link from 'next/link'

const STATS = [
  { label: 'Active Tournaments', value: '2,400+', color: 'var(--gold)' },
  { label: 'Registered Players', value: '18,000+', color: 'var(--cyan)' },
  { label: 'Prize Distributed', value: '$340K', color: 'var(--purple-light)' },
  { label: 'Countries', value: '42+', color: '#22c55e' },
]

const FEATURED = [
  { title: 'PMGC Qualifier Series', prize: '$10,000', teams: '128', status: 'live', map: 'Erangel', mode: 'Squad TPP', tag: 'HIGH TIER', tagColor: 'tag-gold' },
  { title: 'Asia Open Championship', prize: '$5,000', teams: '64', status: 'registration', map: 'Miramar', mode: 'Squad FPP', tag: 'OPEN', tagColor: 'tag-cyan' },
  { title: 'Weekday Warriors #48', prize: '$500', teams: '32', status: 'upcoming', map: 'Sanhok', mode: 'Squad TPP', tag: 'COMMUNITY', tagColor: 'tag-purple' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Create or Browse', desc: 'Find the perfect tournament for your skill level, or host your own with full configuration control.', icon: '🔍' },
  { step: '02', title: 'Register Your Team', desc: 'Form a squad of up to 4 players, submit PUBG UIDs, and lock your roster before the deadline.', icon: '🎮' },
  { step: '03', title: 'Compete Live', desc: 'Receive encrypted room codes at match time. Play, dominate, and watch your kills update the live leaderboard.', icon: '⚔️' },
  { step: '04', title: 'Claim Victory', desc: 'Tiebreakers resolved automatically. Winners receive prize payouts directly to their digital wallet.', icon: '🏆' },
]

export default function HomePage() {
  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', alignItems: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,212,255,0.06) 0%, transparent 50%), var(--bg-base)',
        overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}/>

        {/* Glow orbs */}
        <div style={{ position:'absolute', top:'20%', right:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'20%', left:'5%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents:'none' }}/>

        <div className="container" style={{ position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          {/* Left */}
          <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
            <div className="live-badge" style={{ marginBottom: 24 }}>🔴 LIVE TOURNAMENTS NOW</div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05,
              letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              <span style={{ display:'block', color:'var(--text-primary)' }}>DOMINATE</span>
              <span style={{ display:'block', background:'linear-gradient(135deg,#f5c518,#ff8c00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>THE BATTLEGROUND</span>
            </h1>

            <p style={{ fontSize:18, color:'var(--text-secondary)', lineHeight:1.7, marginBottom:40, maxWidth:520 }}>
              The most advanced PUBG Mobile tournament platform. Real-time leaderboards, encrypted room codes, automated scoring — built for champions.
            </p>

            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link href="/tournaments" className="btn btn-gold btn-lg" style={{ textDecoration:'none' }}>
                Browse Tournaments →
              </Link>
              <Link href="/tournaments/create" className="btn btn-outline btn-lg" style={{ textDecoration:'none' }}>
                Host a Tournament
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ display:'flex', gap:32, marginTop:48, paddingTop:32, borderTop:'1px solid var(--border)' }}>
              {STATS.slice(0,3).map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div style={{ display:'flex', justifyContent:'center', animation:'float 5s ease-in-out infinite' }}>
            <div style={{
              width:380, height:420,
              background:'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))',
              border:'1px solid var(--border-bright)',
              borderRadius:24,
              padding:28,
              position:'relative',
              boxShadow:'0 0 60px rgba(245,197,24,0.1), 0 0 120px rgba(0,212,255,0.05)',
            }}>
              {/* Match card preview */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <span style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--text-secondary)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Live Match</span>
                <span className="live-badge">LIVE</span>
              </div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'var(--gold)', marginBottom:6, letterSpacing:'0.04em' }}>PMGC QUALIFIER</div>
              <div style={{ color:'var(--text-secondary)', fontSize:14, marginBottom:20 }}>Match 3 of 5 · Erangel · Squad TPP</div>

              {/* Leaderboard preview */}
              {[
                { rank:1, team:'ALPHA WOLVES', kills:24, pts:68, color:'#f5c518' },
                { rank:2, team:'STORM RIDERS', kills:19, pts:54, color:'#94a3b8' },
                { rank:3, team:'GHOST SQUAD', kills:17, pts:49, color:'#cd7f32' },
                { rank:4, team:'IRON EAGLES', kills:15, pts:43, color:'var(--text-muted)' },
              ].map(row => (
                <div key={row.rank} style={{
                  display:'flex', alignItems:'center', gap:12, padding:'10px 12px',
                  background: row.rank===1 ? 'rgba(245,197,24,0.08)' : 'transparent',
                  borderRadius:8, marginBottom:4,
                  border: row.rank===1 ? '1px solid rgba(245,197,24,0.2)' : '1px solid transparent',
                }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:700, color:row.color, width:20 }}>#{row.rank}</span>
                  <span style={{ fontFamily:'var(--font-heading)', fontSize:14, fontWeight:600, flex:1, color: row.rank===1 ? 'var(--gold)' : 'var(--text-primary)' }}>{row.team}</span>
                  <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{row.kills}K</span>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:700, color: row.rank===1 ? 'var(--gold)' : 'var(--text-primary)' }}>{row.pts}</span>
                </div>
              ))}

              <div style={{ position:'absolute', bottom:20, left:28, right:28, height:2, background:'linear-gradient(90deg, var(--gold), var(--cyan), var(--purple))', borderRadius:2, opacity:0.6 }}/>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'32px 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
            {STATS.map(stat => (
              <div key={stat.label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:36, fontWeight:900, color:stat.color, lineHeight:1 }}>{stat.value}</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:6, textTransform:'uppercase', letterSpacing:'0.08em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOURNAMENTS */}
      <section className="section">
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40 }}>
            <div>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:8 }}>● Featured</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, letterSpacing:'-0.01em' }}>
                Active <span className="gradient-gold">Tournaments</span>
              </h2>
            </div>
            <Link href="/tournaments" className="btn btn-outline btn-sm" style={{ textDecoration:'none' }}>View All →</Link>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {FEATURED.map((t, i) => (
              <div key={i} className="card border-glow" style={{ position:'relative', overflow:'hidden' }}>
                {/* Top accent */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
                  background: i===0 ? 'linear-gradient(90deg,#f5c518,#ff8c00)' : i===1 ? 'linear-gradient(90deg,#00d4ff,#0099bb)' : 'linear-gradient(90deg,#9d5cf6,#7c3aed)' }}/>

                <div style={{ paddingTop:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                    <span className={`tag ${t.tagColor}`}>{t.tag}</span>
                    {t.status === 'live' && <span className="live-badge">LIVE</span>}
                    {t.status === 'registration' && <span className="tag tag-green">OPEN</span>}
                    {t.status === 'upcoming' && <span className="tag" style={{ background:'rgba(148,163,184,0.1)', color:'var(--text-secondary)', border:'1px solid var(--border)' }}>UPCOMING</span>}
                  </div>

                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:20, fontWeight:700, marginBottom:16, lineHeight:1.2 }}>{t.title}</h3>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
                    {[
                      { label:'Prize Pool', value:t.prize, highlight:true },
                      { label:'Teams', value:`${t.teams} Max` },
                      { label:'Map', value:t.map },
                      { label:'Mode', value:t.mode },
                    ].map(info => (
                      <div key={info.label} style={{ padding:'10px 12px', background:'var(--bg-elevated)', borderRadius:8 }}>
                        <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>{info.label}</div>
                        <div style={{ fontFamily: info.highlight ? 'var(--font-display)' : 'inherit', fontSize:14, fontWeight:600, color: info.highlight ? 'var(--gold)' : 'var(--text-primary)' }}>{info.value}</div>
                      </div>
                    ))}
                  </div>

                  <Link href="/tournaments" className="btn btn-outline" style={{ textDecoration:'none', width:'100%', justifyContent:'center' }}>
                    View Tournament
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background:'var(--bg-surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:60 }}>
            <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--cyan)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:8 }}>● How It Works</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700 }}>
              From Register to <span className="gradient-cyan">Champion</span>
            </h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ position:'relative' }}>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{ position:'absolute', top:28, left:'calc(50% + 40px)', width:'calc(100% - 20px)', height:1, background:'linear-gradient(90deg, var(--border-bright), var(--border))', zIndex:0 }}/>
                )}
                <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                  <div style={{
                    width:56, height:56, borderRadius:12, marginBottom:20, marginLeft:'auto', marginRight:'auto',
                    background:'var(--bg-card)', border:'1px solid var(--border-bright)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:24,
                  }}>{step.icon}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:900, color:'var(--border-bright)', lineHeight:1, marginBottom:8 }}>{step.step}</div>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:18, fontWeight:700, marginBottom:10 }}>{step.title}</h3>
                  <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div style={{
            background:'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,212,255,0.08))',
            border:'1px solid var(--border-bright)', borderRadius:24,
            padding:'64px 48px', textAlign:'center',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:-60, right:-60, width:250, height:250, borderRadius:'50%', background:'radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents:'none' }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:13, color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:16 }}>● Start Competing Today</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:900, letterSpacing:'-0.02em', marginBottom:20 }}>
                ARE YOU READY TO<br/><span className="gradient-gold">CLAIM THE CHICKEN DINNER?</span>
              </h2>
              <p style={{ color:'var(--text-secondary)', fontSize:16, marginBottom:40, maxWidth:500, marginLeft:'auto', marginRight:'auto', lineHeight:1.7 }}>
                Join 18,000+ players competing in PUBG Mobile tournaments. Registration is free. Glory is earned.
              </p>
              <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/auth/register" className="btn btn-gold btn-lg" style={{ textDecoration:'none' }}>Create Free Account</Link>
                <Link href="/tournaments" className="btn btn-outline btn-lg" style={{ textDecoration:'none' }}>Browse Tournaments</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
