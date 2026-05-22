import Link from 'next/link'

export const metadata = { title: 'Privacy Policy — PUBG Mobile Tournament' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{background: 'var(--bg, #040810)', paddingTop: '80px'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px 24px'}}>
        <h1 style={{fontFamily: 'Rajdhani, sans-serif', fontSize: '48px', fontWeight: 700, textTransform: 'uppercase', color: '#E8EAF0', marginBottom: '8px'}}>Privacy Policy</h1>
        <p style={{color: '#6B7A99', marginBottom: '40px', fontSize: '14px'}}>Last updated: May 2026</p>

        {[
          ['1. What We Collect', 'We collect your account email, username, PUBG Mobile UID and in-game name, optional country, and tournament participation history. We do not collect payment information — the platform is free to use.'],
          ['2. How We Use Your Data', 'Your data is used to match you to tournaments, verify eligibility, run leaderboards and scoring, detect fraud and enforce fair play, and provide support. We do not use your data for advertising.'],
          ['3. Data Storage', 'All data is stored securely via Supabase (PostgreSQL). We use industry-standard encryption for data at rest and in transit. Your password is hashed and never stored in plain text.'],
          ['4. What We Share', 'Public usernames, PUBG names, country, and tournament results appear on leaderboards and public profile pages. We do not sell, rent, or trade personal data to third parties.'],
          ['5. Cookies & Analytics', 'We may use minimal analytics cookies to understand how the platform is used. No personal data is shared with analytics providers. You can opt out by disabling cookies in your browser.'],
          ['6. Your Rights', 'You may request deletion of your account and data at any time by contacting us through the platform. We will process deletion requests within 30 days.'],
          ['7. Third-Party Services', 'We use Supabase for database and authentication. Their privacy policy governs data handled by their infrastructure. We do not integrate with social networks or advertising platforms.'],
          ['8. Children', 'This platform is not intended for children under 13. If you believe a child has registered, please contact us to have the account removed.'],
          ['9. Changes to This Policy', 'We may update this privacy policy from time to time. We will notify registered users of significant changes. Continued use of the platform constitutes acceptance.'],
          ['10. Contact', 'For privacy concerns or data requests, contact us through the platform. We are committed to responding within 72 hours.'],
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
