import { NextRequest, NextResponse } from 'next/server'
import { checkTeamName } from '@/lib/compliance'
export async function POST(req: NextRequest) {
  const { name } = await req.json()
  return NextResponse.json(checkTeamName(name))
}
