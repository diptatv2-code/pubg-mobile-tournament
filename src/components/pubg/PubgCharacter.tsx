'use client'

export default function PubgCharacter() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      {/* Animated rings */}
      <div style={{
        position: 'absolute',
        width: 200, height: 200,
        borderRadius: '50%',
        border: '1px solid rgba(0, 212, 255, 0.15)',
        animation: 'spin 20s linear infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: 160, height: 160,
        borderRadius: '50%',
        border: '1px dashed rgba(200, 169, 81, 0.2)',
        animation: 'spin 15s linear infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        width: 120, height: 120,
        borderRadius: '50%',
        border: '1px solid rgba(0, 212, 255, 0.1)',
        animation: 'spin 25s linear infinite',
      }} />

      {/* Center emblem */}
      <div style={{
        width: 80, height: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%)',
        borderRadius: '50%',
        fontSize: 40,
        filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.4))',
        animation: 'float 3s ease-in-out infinite',
      }}>
        🎮
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  )
}
