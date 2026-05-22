import Link from 'next/link'

export const metadata = { title: 'Terms of Service — PUBG Mobile Tournament' }

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{background: 'var(--bg, #040810)', paddingTop: '80px'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px 24px'}}>
        <h1 style={{fontFamily: 'Rajdhani, sans-serif', fontSize: '48px', fontWeight: 700, textTransform: 'uppercase', color: '#E8EAF0', marginBottom: '8px'}}>Terms of Service</h1>
        <p style={{color: '#6B7A99', marginBottom: '40px', fontSize: '14px'}}>Last updated: May 2026</p>

        {[
          ['1. Acceptance of Terms', 'By accessing pubgmobiletournament.com, you agree to these Terms of Service. If you do not agree, do not use the platform.'],
          ['2. Platform Description', 'PUBGMOBILETOURNAMENT is a community platform for organizing and participating in PUBG Mobile tournaments. This platform is not affiliated with Krafton Inc. or PUBG Mobile.'],
          ['3. User Accounts', 'You must provide accurate information when creating an account. You are responsible for maintaining account security. One person may only have one account.'],
          ['4. Tournament Rules', 'All participants must follow tournament rules set by organizers. Cheating, hacking, or unsportsmanlike conduct will result in immediate disqualification and ban.'],
          ['5. Prizes', 'Prize distribution is managed by tournament organizers. The platform is not responsible for prize delivery disputes between organizers and players.'],
          ['6. Prohibited Conduct', 'You may not: use cheats or hacks, harass other users, create fake accounts, manipulate tournament results, or violate any applicable laws.'],
          ['7. Content', 'You retain ownership of content you submit. By submitting content, you grant us a license to display it on the platform.'],
          ['8. Disclaimers', 'The platform is provided "as is" without warranties of any kind. We are not responsible for data loss, service interruptions, or third-party actions.'],
          ['9. Changes to Terms', 'We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.'],
          ['10. Contact', 'For questions about these terms, contact us through the platform.'],
        ].map(([title, body]) => (
          <div key={title} style={{marginBottom: '32px'}}>
            <h2 style={{fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700, color: '#C8A951', marginBottom: '8px', textTransform: 'uppercase'}}>{title}</h2>
            <p style={{color: '#B0BAD0', lineHeight: '1.7', fontSize: '15px'}}>{body}</p>
          </div>
        ))}

        <div style={{marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(200, 169, 81, 0.2)'}}>
          <Link href="/" style={{color: '#C8A951', textDecoration: 'none', fontSize: '14px'}}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
