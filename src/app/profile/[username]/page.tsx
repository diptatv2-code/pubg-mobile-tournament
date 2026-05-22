import { supabaseAdmin } from '@/lib/supabase';
import { ProfileView } from './ProfileView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { data: user } = await supabaseAdmin.from('profiles').select('username').eq('username', username).single();
  if (!user) return { title: 'Player not found' };
  return { title: `${user.username} — PUBG Mobile Tournament` };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { data: user } = await supabaseAdmin.from('profiles').select('*').eq('username', username).single();
  if (!user) return <div className='p-8 text-center'>Profile not found</div>;
  const { data: teams } = await supabaseAdmin.from('teams').select('*, tournaments(*)').eq('captain_id', user.id);
  const { data: tournaments } = await supabaseAdmin.from('tournaments').select('*').eq('organizer_id', user.id);
  return <ProfileView user={user} teams={teams || []} tournaments={tournaments || []} />;
}
