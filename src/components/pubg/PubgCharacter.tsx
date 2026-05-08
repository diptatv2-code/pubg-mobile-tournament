'use client'

import type { CSSProperties } from 'react'

const wrapperStyle: CSSProperties = {
  position: 'relative',
  width: 220,
  height: 400,
  animation: 'floatY 4s ease-in-out infinite',
  filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.3))',
}

const helmet: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 75,
  width: 70,
  height: 52,
  background: 'linear-gradient(180deg, #2d2d2d, #1a1a1a)',
  borderRadius: '50% 50% 15% 15%',
  borderTop: '3px solid #C8A951',
  boxShadow: '0 0 8px rgba(200, 169, 81, 0.3)',
}

const visor: CSSProperties = {
  position: 'absolute',
  top: 36,
  left: 82,
  width: 56,
  height: 16,
  background: 'rgba(0, 212, 255, 0.3)',
  borderRadius: 2,
  boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
}

const neck: CSSProperties = {
  position: 'absolute',
  top: 50,
  left: 103,
  width: 14,
  height: 15,
  background: '#2a1f14',
}

const torso: CSSProperties = {
  position: 'absolute',
  top: 65,
  left: 65,
  width: 90,
  height: 105,
  background: '#1e2a1e',
  borderRadius: 4,
}

const vest: CSSProperties = {
  position: 'absolute',
  top: 65,
  left: 65,
  width: 90,
  height: 100,
  background: 'rgba(55, 45, 10, 0.85)',
  border: '2px solid #8B7536',
  borderRadius: 6,
}

const lShoulder: CSSProperties = {
  position: 'absolute',
  top: 65,
  left: 40,
  width: 28,
  height: 40,
  background: '#1e2a1e',
  borderRadius: '4px 0 0 4px',
}

const rShoulder: CSSProperties = {
  position: 'absolute',
  top: 65,
  left: 152,
  width: 28,
  height: 40,
  background: '#1e2a1e',
  borderRadius: '0 4px 4px 0',
}

const lArm: CSSProperties = {
  position: 'absolute',
  top: 105,
  left: 38,
  width: 22,
  height: 80,
  background: '#1e2a1e',
  borderRadius: 4,
  transform: 'rotate(8deg)',
}

const rArm: CSSProperties = {
  position: 'absolute',
  top: 95,
  left: 158,
  width: 22,
  height: 65,
  background: '#1e2a1e',
  borderRadius: 4,
  transform: 'rotate(-22deg)',
}

const belt: CSSProperties = {
  position: 'absolute',
  top: 168,
  left: 65,
  width: 90,
  height: 14,
  background: '#2a1a08',
  border: '1px solid #8B7536',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const buckle: CSSProperties = {
  width: 10,
  height: 10,
  background: 'linear-gradient(135deg, #E5C76B, #C8A951, #8B7536)',
  boxShadow: '0 0 4px rgba(200, 169, 81, 0.6)',
}

const lLeg: CSSProperties = {
  position: 'absolute',
  top: 182,
  left: 70,
  width: 38,
  height: 115,
  background: '#1e2a1e',
  borderRadius: 2,
}

const rLeg: CSSProperties = {
  position: 'absolute',
  top: 182,
  left: 112,
  width: 38,
  height: 115,
  background: '#1e2a1e',
  borderRadius: 2,
}

const lBoot: CSSProperties = {
  position: 'absolute',
  top: 293,
  left: 66,
  width: 44,
  height: 26,
  background: '#0f0f0f',
  borderRadius: '2px 2px 6px 6px',
}

const rBoot: CSSProperties = {
  position: 'absolute',
  top: 293,
  left: 110,
  width: 44,
  height: 26,
  background: '#0f0f0f',
  borderRadius: '2px 2px 6px 6px',
}

const rifleBody: CSSProperties = {
  position: 'absolute',
  top: 120,
  left: 148,
  width: 135,
  height: 16,
  background: '#131313',
  borderRadius: 2,
  borderTop: '1px solid #333',
}

const rifleBarrel: CSSProperties = {
  position: 'absolute',
  top: 124,
  left: 281,
  width: 45,
  height: 9,
  background: '#0a0a0a',
  borderRadius: '0 3px 3px 0',
}

const rifleScope: CSSProperties = {
  position: 'absolute',
  top: 107,
  left: 180,
  width: 38,
  height: 13,
  background: '#1a1a1a',
  borderRadius: 2,
  border: '1px solid #3a3a3a',
}

const rifleMag: CSSProperties = {
  position: 'absolute',
  top: 134,
  left: 192,
  width: 16,
  height: 30,
  background: '#111',
  borderRadius: '0 0 4px 4px',
}

const rifleGrip: CSSProperties = {
  position: 'absolute',
  top: 125,
  left: 155,
  width: 12,
  height: 22,
  background: '#0f0f0f',
  borderRadius: '0 0 3px 3px',
  transform: 'rotate(-10deg)',
}

export default function PubgCharacter() {
  return (
    <div style={wrapperStyle} role="img" aria-label="PUBG Mobile soldier with M416">
      <div style={helmet} aria-hidden />
      <div style={visor} aria-hidden />
      <div style={neck} aria-hidden />

      <div style={torso} aria-hidden />
      <div style={vest} aria-hidden />
      <div style={lShoulder} aria-hidden />
      <div style={rShoulder} aria-hidden />

      <div style={lArm} aria-hidden />
      <div style={rArm} aria-hidden />

      <div style={belt} aria-hidden>
        <div style={buckle} />
      </div>

      <div style={lLeg} aria-hidden />
      <div style={rLeg} aria-hidden />
      <div style={lBoot} aria-hidden />
      <div style={rBoot} aria-hidden />

      <div style={rifleBody} aria-hidden />
      <div style={rifleBarrel} aria-hidden />
      <div style={rifleScope} aria-hidden />
      <div style={rifleMag} aria-hidden />
      <div style={rifleGrip} aria-hidden />
    </div>
  )
}
