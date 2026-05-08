import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'var(--bg-surface)', paddingTop:48, paddingBottom:32, marginTop:'auto' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:6, background:'linear-gradient(135deg,#f5c518,#e6a800)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:900, fontSize:14, color:'#000' }}>BZ</div>
              <span style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:700, letterSpacing:'0.08em' }}>BATTLE<span style={{ color:'var(--gold)' }}>ZONE</span></span>
            </div>
            <p style={{ color:'var(--text-secondary)', fontSize:13, lineHeight:1.7, maxWidth:260 }}>
              Professional PUBG Mobile tournament platform. Host, join, and compete in esports tournaments worldwide.
            </p>
          </div>
          {[
            { title:'Platform', links:[['Tournaments','/tournaments'],['Leaderboard','/leaderboard'],['Create Tournament','/tournaments/create']] },
            { title:'Account', links:[['Dashboard','/dashboard'],['Profile','/profile'],['Settings','/settings']] },
            { title:'Support', links:[['Rules','/rules'],['FAQ','/faq'],['Contact','/contact']] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily:'var(--font-heading)', fontSize:13, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-secondary)', marginBottom:16 }}>{col.title}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {col.links.map(([label, href]) => (
                  <Link key={href} href={href} style={{ color:'var(--text-muted)', fontSize:13, textDecoration:'none' }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height:1, background:'linear-gradient(90deg,transparent,var(--border),transparent)', marginBottom:24 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ color:'var(--text-muted)', fontSize:12 }}>© 2026 BattleZone. All rights reserved.</span>
          <div style={{ display:'flex', gap:16 }}>
            {['Privacy','Terms','Cookies'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color:'var(--text-muted)', fontSize:12, textDecoration:'none' }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
