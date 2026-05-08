import type {
  User,
  Tournament,
  Team,
  Match,
  MatchResult,
  TournamentAnnouncement,
  RoomCode,
  PlayerStats,
  LeaderboardEntry,
  ScoringConfig,
} from "@/types/database";

// ===== Default Scoring Config (PMGC standard) =====
export const DEFAULT_SCORING: ScoringConfig = {
  kill_points: 1,
  placement_points: [
    { placement: 1, points: 15 },
    { placement: 2, points: 12 },
    { placement: 3, points: 10 },
    { placement: 4, points: 8 },
    { placement: 5, points: 6 },
    { placement: 6, points: 4 },
    { placement: 7, points: 2 },
    { placement: 8, points: 1 },
    { placement: 9, points: 0 },
    { placement: 10, points: 0 },
    { placement: 11, points: 0 },
    { placement: 12, points: 0 },
    { placement: 13, points: 0 },
    { placement: 14, points: 0 },
    { placement: 15, points: 0 },
    { placement: 16, points: 0 },
  ],
};

// ===== Users =====
export const mockUsers: User[] = [
  {
    id: "u1",
    email: "shadow@example.com",
    username: "ShadowSniper",
    pubg_id: "5512387401",
    pubg_name: "ShadowSniper⚡",
    avatar_url: "/avatars/shadow.svg",
    bio: "Pro sniper. WWCD hunter. 4-time regional champion.",
    country: "IN",
    role: "player",
    created_at: "2024-08-12T10:00:00Z",
  },
  {
    id: "u2",
    email: "phoenix@example.com",
    username: "PhoenixRise",
    pubg_id: "5512387402",
    pubg_name: "PHX•Phoenix",
    avatar_url: "/avatars/phoenix.svg",
    bio: "Aggressive IGL. Build squads from chaos.",
    country: "PK",
    role: "player",
    created_at: "2024-09-01T10:00:00Z",
  },
  {
    id: "u3",
    email: "vortex@example.com",
    username: "VortexKing",
    pubg_id: "5512387403",
    pubg_name: "VortexKing",
    avatar_url: "/avatars/vortex.svg",
    bio: "Tournament organizer. Streamer. PUBG since 2018.",
    country: "BD",
    role: "organizer",
    created_at: "2024-06-15T10:00:00Z",
  },
  {
    id: "u4",
    email: "blaze@example.com",
    username: "BlazeFury",
    pubg_id: "5512387404",
    pubg_name: "BLZ_Blaze",
    avatar_url: "/avatars/blaze.svg",
    bio: "Squad rusher. Pan enthusiast.",
    country: "IN",
    role: "player",
    created_at: "2024-10-22T10:00:00Z",
  },
  {
    id: "u5",
    email: "cipher@example.com",
    username: "CipherZero",
    pubg_id: "5512387405",
    pubg_name: "Cipher.Zero",
    avatar_url: "/avatars/cipher.svg",
    bio: "Tactical support. M416 main.",
    country: "NP",
    role: "player",
    created_at: "2024-11-03T10:00:00Z",
  },
  {
    id: "u6",
    email: "raven@example.com",
    username: "RavenStrike",
    pubg_id: "5512387406",
    pubg_name: "RavenStrike",
    avatar_url: "/avatars/raven.svg",
    bio: "Squad captain. Aggressive playstyle.",
    country: "PK",
    role: "player",
    created_at: "2024-07-19T10:00:00Z",
  },
  {
    id: "u7",
    email: "ghost@example.com",
    username: "GhostOps",
    pubg_id: "5512387407",
    pubg_name: "GhostOps",
    avatar_url: "/avatars/ghost.svg",
    bio: "Stealth operator. AWM enjoyer.",
    country: "IN",
    role: "player",
    created_at: "2024-12-05T10:00:00Z",
  },
  {
    id: "u8",
    email: "viper@example.com",
    username: "ViperDrop",
    pubg_id: "5512387408",
    pubg_name: "VPR.Viper",
    avatar_url: "/avatars/viper.svg",
    bio: "Hot drop specialist. Always Pochinki.",
    country: "BD",
    role: "player",
    created_at: "2025-01-12T10:00:00Z",
  },
  {
    id: "u9",
    email: "nova@example.com",
    username: "NovaBlast",
    pubg_id: "5512387409",
    pubg_name: "NovaBlast",
    avatar_url: "/avatars/nova.svg",
    bio: "Long-range demon. Kar98 main.",
    country: "IN",
    role: "player",
    created_at: "2025-02-04T10:00:00Z",
  },
  {
    id: "u10",
    email: "titan@example.com",
    username: "TitanCore",
    pubg_id: "5512387410",
    pubg_name: "TitanCore",
    avatar_url: "/avatars/titan.svg",
    bio: "Tournament admin and host since 2021.",
    country: "IN",
    role: "organizer",
    created_at: "2024-05-20T10:00:00Z",
  },
  {
    id: "u11",
    email: "ace@example.com",
    username: "AceWolf",
    pubg_id: "5512387411",
    pubg_name: "AceWolf",
    avatar_url: "/avatars/ace.svg",
    bio: "Team scrim leader.",
    country: "NP",
    role: "player",
    created_at: "2025-01-29T10:00:00Z",
  },
  {
    id: "u12",
    email: "frost@example.com",
    username: "FrostBite",
    pubg_id: "5512387412",
    pubg_name: "FrostBite",
    avatar_url: "/avatars/frost.svg",
    bio: "Cold blooded. Erangel veteran.",
    country: "BD",
    role: "player",
    created_at: "2024-04-11T10:00:00Z",
  },
  {
    id: "u13",
    email: "echo@example.com",
    username: "EchoFlux",
    pubg_id: "5512387413",
    pubg_name: "EchoFlux",
    avatar_url: "/avatars/echo.svg",
    bio: "Sound-focused gameplay. Headphones always.",
    country: "PK",
    role: "player",
    created_at: "2024-09-30T10:00:00Z",
  },
  {
    id: "u14",
    email: "neon@example.com",
    username: "NeonHavoc",
    pubg_id: "5512387414",
    pubg_name: "NeonHavoc",
    avatar_url: "/avatars/neon.svg",
    bio: "Frag artist. SMG specialist.",
    country: "IN",
    role: "player",
    created_at: "2024-11-22T10:00:00Z",
  },
  {
    id: "u15",
    email: "kingpin@example.com",
    username: "KingpinX",
    pubg_id: "5512387415",
    pubg_name: "KingpinX",
    avatar_url: "/avatars/kingpin.svg",
    bio: "Solo Q grinder. Conqueror season after season.",
    country: "IN",
    role: "player",
    created_at: "2025-02-22T10:00:00Z",
  },
];

// ===== Player Stats =====
export const mockPlayerStats: Record<string, PlayerStats> = {
  u1: { user_id: "u1", tournaments_played: 47, tournaments_won: 12, total_kills: 1248, total_matches: 312, win_rate: 25.5, avg_placement: 3.4, total_winnings: 18500, rank_points: 6280 },
  u2: { user_id: "u2", tournaments_played: 38, tournaments_won: 8, total_kills: 982, total_matches: 254, win_rate: 21.0, avg_placement: 4.2, total_winnings: 12300, rank_points: 5640 },
  u3: { user_id: "u3", tournaments_played: 22, tournaments_won: 4, total_kills: 412, total_matches: 134, win_rate: 18.2, avg_placement: 5.1, total_winnings: 5400, rank_points: 4120 },
  u4: { user_id: "u4", tournaments_played: 33, tournaments_won: 6, total_kills: 891, total_matches: 220, win_rate: 18.1, avg_placement: 4.8, total_winnings: 8700, rank_points: 4980 },
  u5: { user_id: "u5", tournaments_played: 29, tournaments_won: 5, total_kills: 654, total_matches: 198, win_rate: 17.2, avg_placement: 5.0, total_winnings: 6200, rank_points: 4540 },
  u6: { user_id: "u6", tournaments_played: 41, tournaments_won: 9, total_kills: 1102, total_matches: 274, win_rate: 22.0, avg_placement: 4.0, total_winnings: 14200, rank_points: 5810 },
  u7: { user_id: "u7", tournaments_played: 26, tournaments_won: 4, total_kills: 587, total_matches: 168, win_rate: 15.4, avg_placement: 5.6, total_winnings: 4800, rank_points: 4310 },
  u8: { user_id: "u8", tournaments_played: 19, tournaments_won: 2, total_kills: 412, total_matches: 122, win_rate: 10.5, avg_placement: 6.3, total_winnings: 2300, rank_points: 3680 },
  u9: { user_id: "u9", tournaments_played: 31, tournaments_won: 7, total_kills: 798, total_matches: 204, win_rate: 22.5, avg_placement: 4.1, total_winnings: 9200, rank_points: 5240 },
  u10: { user_id: "u10", tournaments_played: 14, tournaments_won: 3, total_kills: 312, total_matches: 92, win_rate: 21.4, avg_placement: 4.5, total_winnings: 4100, rank_points: 4720 },
  u11: { user_id: "u11", tournaments_played: 17, tournaments_won: 2, total_kills: 354, total_matches: 110, win_rate: 11.7, avg_placement: 5.9, total_winnings: 1800, rank_points: 3540 },
  u12: { user_id: "u12", tournaments_played: 24, tournaments_won: 3, total_kills: 487, total_matches: 156, win_rate: 12.5, avg_placement: 5.4, total_winnings: 3400, rank_points: 4080 },
  u13: { user_id: "u13", tournaments_played: 21, tournaments_won: 3, total_kills: 432, total_matches: 138, win_rate: 14.2, avg_placement: 5.3, total_winnings: 3100, rank_points: 4140 },
  u14: { user_id: "u14", tournaments_played: 28, tournaments_won: 5, total_kills: 712, total_matches: 184, win_rate: 17.8, avg_placement: 4.9, total_winnings: 6800, rank_points: 4870 },
  u15: { user_id: "u15", tournaments_played: 52, tournaments_won: 14, total_kills: 1411, total_matches: 348, win_rate: 26.9, avg_placement: 3.2, total_winnings: 21000, rank_points: 6520 },
};

// ===== Teams =====
export const mockTeams: Team[] = [
  {
    id: "t1",
    tournament_id: "tn1",
    name: "Phantom Reapers",
    tag: "PHR",
    captain_id: "u1",
    status: "checked_in",
    logo_url: "",
    created_at: "2026-04-25T10:00:00Z",
    members: [
      { id: "tm1", team_id: "t1", user_id: "u1", role: "captain", pubg_id: "5512387401", pubg_name: "ShadowSniper⚡", avatar_url: "/avatars/shadow.svg" },
      { id: "tm2", team_id: "t1", user_id: "u4", role: "member", pubg_id: "5512387404", pubg_name: "BLZ_Blaze", avatar_url: "/avatars/blaze.svg" },
      { id: "tm3", team_id: "t1", user_id: "u9", role: "member", pubg_id: "5512387409", pubg_name: "NovaBlast", avatar_url: "/avatars/nova.svg" },
      { id: "tm4", team_id: "t1", user_id: "u14", role: "member", pubg_id: "5512387414", pubg_name: "NeonHavoc", avatar_url: "/avatars/neon.svg" },
    ],
  },
  {
    id: "t2",
    tournament_id: "tn1",
    name: "Vortex Legion",
    tag: "VTX",
    captain_id: "u2",
    status: "checked_in",
    logo_url: "",
    created_at: "2026-04-26T10:00:00Z",
    members: [
      { id: "tm5", team_id: "t2", user_id: "u2", role: "captain", pubg_id: "5512387402", pubg_name: "PHX•Phoenix", avatar_url: "/avatars/phoenix.svg" },
      { id: "tm6", team_id: "t2", user_id: "u5", role: "member", pubg_id: "5512387405", pubg_name: "Cipher.Zero", avatar_url: "/avatars/cipher.svg" },
      { id: "tm7", team_id: "t2", user_id: "u11", role: "member", pubg_id: "5512387411", pubg_name: "AceWolf", avatar_url: "/avatars/ace.svg" },
      { id: "tm8", team_id: "t2", user_id: "u13", role: "member", pubg_id: "5512387413", pubg_name: "EchoFlux", avatar_url: "/avatars/echo.svg" },
    ],
  },
  {
    id: "t3",
    tournament_id: "tn1",
    name: "Iron Wolves",
    tag: "IWV",
    captain_id: "u6",
    status: "checked_in",
    logo_url: "",
    created_at: "2026-04-26T11:00:00Z",
    members: [
      { id: "tm9", team_id: "t3", user_id: "u6", role: "captain", pubg_id: "5512387406", pubg_name: "RavenStrike", avatar_url: "/avatars/raven.svg" },
      { id: "tm10", team_id: "t3", user_id: "u7", role: "member", pubg_id: "5512387407", pubg_name: "GhostOps", avatar_url: "/avatars/ghost.svg" },
      { id: "tm11", team_id: "t3", user_id: "u12", role: "member", pubg_id: "5512387412", pubg_name: "FrostBite", avatar_url: "/avatars/frost.svg" },
      { id: "tm12", team_id: "t3", user_id: "u8", role: "member", pubg_id: "5512387408", pubg_name: "VPR.Viper", avatar_url: "/avatars/viper.svg" },
    ],
  },
  {
    id: "t4",
    tournament_id: "tn1",
    name: "Crimson Hex",
    tag: "CRH",
    captain_id: "u15",
    status: "checked_in",
    logo_url: "",
    created_at: "2026-04-27T08:00:00Z",
    members: [
      { id: "tm13", team_id: "t4", user_id: "u15", role: "captain", pubg_id: "5512387415", pubg_name: "KingpinX", avatar_url: "/avatars/kingpin.svg" },
      { id: "tm14", team_id: "t4", user_id: "u3", role: "member", pubg_id: "5512387403", pubg_name: "VortexKing", avatar_url: "/avatars/vortex.svg" },
      { id: "tm15", team_id: "t4", user_id: "u10", role: "member", pubg_id: "5512387410", pubg_name: "TitanCore", avatar_url: "/avatars/titan.svg" },
      { id: "tm16", team_id: "t4", user_id: "u14", role: "member", pubg_id: "5512387414", pubg_name: "NeonHavoc", avatar_url: "/avatars/neon.svg" },
    ],
  },
  {
    id: "t5",
    tournament_id: "tn1",
    name: "Storm Riders",
    tag: "STR",
    captain_id: "u9",
    status: "registered",
    logo_url: "",
    created_at: "2026-04-28T10:00:00Z",
    members: [
      { id: "tm17", team_id: "t5", user_id: "u9", role: "captain", pubg_id: "5512387409", pubg_name: "NovaBlast", avatar_url: "/avatars/nova.svg" },
      { id: "tm18", team_id: "t5", user_id: "u11", role: "member", pubg_id: "5512387411", pubg_name: "AceWolf", avatar_url: "/avatars/ace.svg" },
      { id: "tm19", team_id: "t5", user_id: "u8", role: "member", pubg_id: "5512387408", pubg_name: "VPR.Viper", avatar_url: "/avatars/viper.svg" },
      { id: "tm20", team_id: "t5", user_id: "u12", role: "member", pubg_id: "5512387412", pubg_name: "FrostBite", avatar_url: "/avatars/frost.svg" },
    ],
  },
  {
    id: "t6",
    tournament_id: "tn1",
    name: "Black Echo",
    tag: "BLE",
    captain_id: "u7",
    status: "registered",
    logo_url: "",
    created_at: "2026-04-29T10:00:00Z",
    members: [
      { id: "tm21", team_id: "t6", user_id: "u7", role: "captain", pubg_id: "5512387407", pubg_name: "GhostOps", avatar_url: "/avatars/ghost.svg" },
      { id: "tm22", team_id: "t6", user_id: "u13", role: "member", pubg_id: "5512387413", pubg_name: "EchoFlux", avatar_url: "/avatars/echo.svg" },
      { id: "tm23", team_id: "t6", user_id: "u5", role: "member", pubg_id: "5512387405", pubg_name: "Cipher.Zero", avatar_url: "/avatars/cipher.svg" },
      { id: "tm24", team_id: "t6", user_id: "u4", role: "member", pubg_id: "5512387404", pubg_name: "BLZ_Blaze", avatar_url: "/avatars/blaze.svg" },
    ],
  },
  {
    id: "t7",
    tournament_id: "tn1",
    name: "Apex Squad",
    tag: "APX",
    captain_id: "u10",
    status: "checked_in",
    logo_url: "",
    created_at: "2026-04-30T10:00:00Z",
    members: [
      { id: "tm25", team_id: "t7", user_id: "u10", role: "captain", pubg_id: "5512387410", pubg_name: "TitanCore", avatar_url: "/avatars/titan.svg" },
      { id: "tm26", team_id: "t7", user_id: "u3", role: "member", pubg_id: "5512387403", pubg_name: "VortexKing", avatar_url: "/avatars/vortex.svg" },
      { id: "tm27", team_id: "t7", user_id: "u15", role: "member", pubg_id: "5512387415", pubg_name: "KingpinX", avatar_url: "/avatars/kingpin.svg" },
      { id: "tm28", team_id: "t7", user_id: "u1", role: "member", pubg_id: "5512387401", pubg_name: "ShadowSniper⚡", avatar_url: "/avatars/shadow.svg" },
    ],
  },
  {
    id: "t8",
    tournament_id: "tn1",
    name: "Razor Edge",
    tag: "RZE",
    captain_id: "u14",
    status: "waitlisted",
    logo_url: "",
    created_at: "2026-05-01T10:00:00Z",
    members: [
      { id: "tm29", team_id: "t8", user_id: "u14", role: "captain", pubg_id: "5512387414", pubg_name: "NeonHavoc", avatar_url: "/avatars/neon.svg" },
      { id: "tm30", team_id: "t8", user_id: "u2", role: "member", pubg_id: "5512387402", pubg_name: "PHX•Phoenix", avatar_url: "/avatars/phoenix.svg" },
      { id: "tm31", team_id: "t8", user_id: "u6", role: "member", pubg_id: "5512387406", pubg_name: "RavenStrike", avatar_url: "/avatars/raven.svg" },
      { id: "tm32", team_id: "t8", user_id: "u13", role: "member", pubg_id: "5512387413", pubg_name: "EchoFlux", avatar_url: "/avatars/echo.svg" },
    ],
  },
];

// ===== Tournaments =====
export const mockTournaments: Tournament[] = [
  {
    id: "tn1",
    title: "PUBG Mobile Tournament Champions Cup",
    slug: "pubgmobiletournament-champions-cup",
    organizer_id: "u3",
    game_mode: "squad",
    format: "battle_royale",
    map: "Erangel",
    status: "ongoing",
    max_teams: 16,
    registered_teams: 16,
    entry_fee: 0,
    prize_pool: 5000,
    prize_distribution: [
      { position: 1, amount: 2500, percent: 50 },
      { position: 2, amount: 1500, percent: 30 },
      { position: 3, amount: 1000, percent: 20 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-04-20T00:00:00Z",
    registration_closes_at: "2026-05-05T00:00:00Z",
    starts_at: "2026-05-08T14:00:00Z",
    ends_at: "2026-05-08T20:00:00Z",
    description:
      "The PUBG Mobile Tournament Champions Cup brings together the top 16 squads in a single-day BR aggregate tournament. Six maps, one champion. Live broadcast and full caster coverage.",
    rules:
      "Standard PUBG Mobile competitive ruleset. No emulators. Region: South Asia. Min level 50. All squad members must be checked in 30 minutes before scheduled match start. Disconnections are not grounds for replays. Use of any third-party software results in immediate DQ.",
    banner_url: "",
    total_matches: 6,
    created_at: "2026-04-15T10:00:00Z",
  },
  {
    id: "tn2",
    title: "Solo Sniper Showdown",
    slug: "solo-sniper-showdown",
    organizer_id: "u10",
    game_mode: "solo",
    format: "battle_royale",
    map: "Miramar",
    status: "registration_open",
    max_teams: 100,
    registered_teams: 67,
    entry_fee: 5,
    prize_pool: 1000,
    prize_distribution: [
      { position: 1, amount: 500, percent: 50 },
      { position: 2, amount: 300, percent: 30 },
      { position: 3, amount: 200, percent: 20 },
    ],
    scoring_config: { ...DEFAULT_SCORING, kill_points: 2 },
    registration_opens_at: "2026-04-28T00:00:00Z",
    registration_closes_at: "2026-05-15T00:00:00Z",
    starts_at: "2026-05-18T18:00:00Z",
    ends_at: "2026-05-18T22:00:00Z",
    description:
      "100-player solo BR. Kill-weighted scoring. Sand and dunes only — Miramar veterans encouraged.",
    rules:
      "Solo only. No teaming. Snipers and DMRs only weapon class. Standard placement points + 2 kill points per kill. Final ring shrinks 30% faster than default.",
    banner_url: "",
    total_matches: 4,
    created_at: "2026-04-25T10:00:00Z",
  },
  {
    id: "tn3",
    title: "Duo Mayhem Open",
    slug: "duo-mayhem-open",
    organizer_id: "u3",
    game_mode: "duo",
    format: "battle_royale",
    map: "Sanhok",
    status: "registration_open",
    max_teams: 50,
    registered_teams: 23,
    entry_fee: 0,
    prize_pool: 800,
    prize_distribution: [
      { position: 1, amount: 400, percent: 50 },
      { position: 2, amount: 240, percent: 30 },
      { position: 3, amount: 160, percent: 20 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-05-01T00:00:00Z",
    registration_closes_at: "2026-05-25T00:00:00Z",
    starts_at: "2026-05-28T16:00:00Z",
    ends_at: "2026-05-28T21:00:00Z",
    description:
      "Two-player chaos on Sanhok. Fast circles, hot drops, all skill. Free entry.",
    rules:
      "Duo only. Sanhok exclusive. 5 matches aggregate. Standard scoring. No friendly fire abuse.",
    banner_url: "",
    total_matches: 5,
    created_at: "2026-04-28T10:00:00Z",
  },
  {
    id: "tn4",
    title: "Pro League Qualifier — Season 7",
    slug: "pro-league-qualifier-s7",
    organizer_id: "u10",
    game_mode: "squad",
    format: "battle_royale",
    map: "Mixed",
    status: "registration_open",
    max_teams: 32,
    registered_teams: 19,
    entry_fee: 25,
    prize_pool: 15000,
    prize_distribution: [
      { position: 1, amount: 7500, percent: 50 },
      { position: 2, amount: 4500, percent: 30 },
      { position: 3, amount: 3000, percent: 20 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-04-15T00:00:00Z",
    registration_closes_at: "2026-06-01T00:00:00Z",
    starts_at: "2026-06-05T13:00:00Z",
    ends_at: "2026-06-07T22:00:00Z",
    description:
      "Top 4 teams qualify directly into Pro League Season 7. Three-day competitive marathon, 12 matches across all four maps.",
    rules:
      "Squad mode. Mixed maps (Erangel, Miramar, Sanhok, Vikendi). 12 matches over 3 days. Standard PMGC scoring.",
    banner_url: "",
    total_matches: 12,
    created_at: "2026-04-10T10:00:00Z",
  },
  {
    id: "tn5",
    title: "Friday Night Frags",
    slug: "friday-night-frags",
    organizer_id: "u3",
    game_mode: "squad",
    format: "single_elim",
    map: "Erangel",
    status: "registration_closed",
    max_teams: 8,
    registered_teams: 8,
    entry_fee: 0,
    prize_pool: 500,
    prize_distribution: [
      { position: 1, amount: 300, percent: 60 },
      { position: 2, amount: 150, percent: 30 },
      { position: 3, amount: 50, percent: 10 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-04-25T00:00:00Z",
    registration_closes_at: "2026-05-07T00:00:00Z",
    starts_at: "2026-05-09T19:00:00Z",
    ends_at: "2026-05-09T23:00:00Z",
    description:
      "8-team single elimination bracket. Last squad standing wins. Friday night under pressure.",
    rules:
      "Single elimination. Best-of-3 head-to-head squad matches. Erangel only. Random spawn locations.",
    banner_url: "",
    total_matches: 7,
    created_at: "2026-04-22T10:00:00Z",
  },
  {
    id: "tn6",
    title: "Vikendi Winter Brawl",
    slug: "vikendi-winter-brawl",
    organizer_id: "u10",
    game_mode: "squad",
    format: "battle_royale",
    map: "Vikendi",
    status: "completed",
    max_teams: 16,
    registered_teams: 16,
    entry_fee: 10,
    prize_pool: 2400,
    prize_distribution: [
      { position: 1, amount: 1200, percent: 50 },
      { position: 2, amount: 720, percent: 30 },
      { position: 3, amount: 480, percent: 20 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-03-15T00:00:00Z",
    registration_closes_at: "2026-04-05T00:00:00Z",
    starts_at: "2026-04-10T15:00:00Z",
    ends_at: "2026-04-10T20:00:00Z",
    description:
      "Snowy survival. 5-match aggregate on Vikendi only. Cold-blooded competition.",
    rules:
      "Squad only. Vikendi map. 5 matches. Aggregate scoring.",
    banner_url: "",
    total_matches: 5,
    created_at: "2026-03-10T10:00:00Z",
  },
  {
    id: "tn7",
    title: "Karakin Mini Cup",
    slug: "karakin-mini-cup",
    organizer_id: "u3",
    game_mode: "duo",
    format: "round_robin",
    map: "Karakin",
    status: "draft",
    max_teams: 12,
    registered_teams: 0,
    entry_fee: 0,
    prize_pool: 300,
    prize_distribution: [
      { position: 1, amount: 200, percent: 67 },
      { position: 2, amount: 100, percent: 33 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-05-15T00:00:00Z",
    registration_closes_at: "2026-05-30T00:00:00Z",
    starts_at: "2026-06-02T19:00:00Z",
    ends_at: "2026-06-02T22:00:00Z",
    description:
      "Quick-play duo round robin on Karakin. Fast matches, intense action.",
    rules:
      "Duos only. Karakin only. Round robin format — every team plays every other team.",
    banner_url: "",
    total_matches: 11,
    created_at: "2026-05-05T10:00:00Z",
  },
  {
    id: "tn8",
    title: "Erangel Legends Invitational",
    slug: "erangel-legends-invitational",
    organizer_id: "u10",
    game_mode: "squad",
    format: "battle_royale",
    map: "Erangel",
    status: "completed",
    max_teams: 24,
    registered_teams: 24,
    entry_fee: 50,
    prize_pool: 12000,
    prize_distribution: [
      { position: 1, amount: 6000, percent: 50 },
      { position: 2, amount: 3600, percent: 30 },
      { position: 3, amount: 2400, percent: 20 },
    ],
    scoring_config: DEFAULT_SCORING,
    registration_opens_at: "2026-02-20T00:00:00Z",
    registration_closes_at: "2026-03-10T00:00:00Z",
    starts_at: "2026-03-14T14:00:00Z",
    ends_at: "2026-03-15T22:00:00Z",
    description:
      "Two-day invitational on classic Erangel. Heritage of competitive PUBG. Legends only.",
    rules:
      "Invite-only. Erangel only. 10 matches over 2 days. Strict anti-cheat.",
    banner_url: "",
    total_matches: 10,
    created_at: "2026-02-15T10:00:00Z",
  },
];

// ===== Matches =====
export const mockMatches: Match[] = [
  { id: "m1", tournament_id: "tn1", match_number: 1, round: 1, status: "completed", started_at: "2026-05-08T14:00:00Z", completed_at: "2026-05-08T14:35:00Z", map: "Erangel" },
  { id: "m2", tournament_id: "tn1", match_number: 2, round: 1, status: "completed", started_at: "2026-05-08T15:00:00Z", completed_at: "2026-05-08T15:35:00Z", map: "Miramar" },
  { id: "m3", tournament_id: "tn1", match_number: 3, round: 1, status: "completed", started_at: "2026-05-08T16:00:00Z", completed_at: "2026-05-08T16:35:00Z", map: "Sanhok" },
  { id: "m4", tournament_id: "tn1", match_number: 4, round: 1, status: "ongoing", started_at: "2026-05-08T17:00:00Z", completed_at: null, map: "Erangel" },
  { id: "m5", tournament_id: "tn1", match_number: 5, round: 1, status: "scheduled", started_at: null, completed_at: null, map: "Vikendi" },
  { id: "m6", tournament_id: "tn1", match_number: 6, round: 1, status: "scheduled", started_at: null, completed_at: null, map: "Erangel" },
];

// ===== Match Results (for tn1, completed matches) =====
type ResultSeed = { team_id: string; placement: number; kills: number };

function makeResults(matchId: string, seed: ResultSeed[]): MatchResult[] {
  return seed.map((s) => {
    const placement_points =
      DEFAULT_SCORING.placement_points.find((p) => p.placement === s.placement)?.points || 0;
    const kill_points = s.kills * DEFAULT_SCORING.kill_points;
    return {
      id: `mr-${matchId}-${s.team_id}`,
      match_id: matchId,
      team_id: s.team_id,
      placement: s.placement,
      kills: s.kills,
      kill_points,
      placement_points,
      total_points: placement_points + kill_points,
      wwcd: s.placement === 1,
    } as MatchResult;
  });
}

export const mockMatchResults: MatchResult[] = [
  ...makeResults("m1", [
    { team_id: "t1", placement: 1, kills: 12 },
    { team_id: "t3", placement: 2, kills: 8 },
    { team_id: "t7", placement: 3, kills: 9 },
    { team_id: "t2", placement: 4, kills: 6 },
    { team_id: "t4", placement: 5, kills: 4 },
    { team_id: "t6", placement: 6, kills: 5 },
    { team_id: "t5", placement: 7, kills: 2 },
    { team_id: "t8", placement: 8, kills: 1 },
  ]),
  ...makeResults("m2", [
    { team_id: "t2", placement: 1, kills: 14 },
    { team_id: "t1", placement: 2, kills: 7 },
    { team_id: "t4", placement: 3, kills: 10 },
    { team_id: "t7", placement: 4, kills: 5 },
    { team_id: "t3", placement: 5, kills: 6 },
    { team_id: "t5", placement: 6, kills: 3 },
    { team_id: "t8", placement: 7, kills: 4 },
    { team_id: "t6", placement: 8, kills: 2 },
  ]),
  ...makeResults("m3", [
    { team_id: "t7", placement: 1, kills: 11 },
    { team_id: "t1", placement: 2, kills: 9 },
    { team_id: "t6", placement: 3, kills: 7 },
    { team_id: "t3", placement: 4, kills: 8 },
    { team_id: "t2", placement: 5, kills: 5 },
    { team_id: "t4", placement: 6, kills: 4 },
    { team_id: "t5", placement: 7, kills: 3 },
    { team_id: "t8", placement: 8, kills: 1 },
  ]),
];

// ===== Announcements =====
export const mockAnnouncements: TournamentAnnouncement[] = [
  {
    id: "a1",
    tournament_id: "tn1",
    organizer_id: "u3",
    title: "Match 4 starting in 15 min",
    message:
      "Room codes are now distributed. Check your dashboard. Map: Erangel. Lobby opens at 17:00 UTC.",
    created_at: "2026-05-08T16:45:00Z",
  },
  {
    id: "a2",
    tournament_id: "tn1",
    organizer_id: "u3",
    title: "Match 3 results uploaded",
    message:
      "Match 3 leaderboard is live. Apex Squad takes WWCD. Phantom Reapers extends overall lead.",
    created_at: "2026-05-08T16:40:00Z",
  },
  {
    id: "a3",
    tournament_id: "tn1",
    organizer_id: "u3",
    title: "Tournament begins",
    message:
      "Welcome to PUBG Mobile Tournament Champions Cup. All 16 squads checked in. GLHF.",
    created_at: "2026-05-08T13:55:00Z",
  },
];

// ===== Room Codes =====
export const mockRoomCodes: RoomCode[] = [
  {
    id: "rc1",
    tournament_id: "tn1",
    match_id: "m4",
    room_code: "47281950",
    room_password: "BZCC2026",
    distributed_at: "2026-05-08T16:45:00Z",
  },
];

// ===== Helpers =====
export function getTournament(idOrSlug: string): Tournament | undefined {
  return mockTournaments.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
}

export function getUser(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return mockUsers.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function getTeamsForTournament(tournamentId: string): Team[] {
  return mockTeams.filter((t) => t.tournament_id === tournamentId);
}

export function getMatchesForTournament(tournamentId: string): Match[] {
  return mockMatches.filter((m) => m.tournament_id === tournamentId);
}

export function getResultsForMatch(matchId: string): MatchResult[] {
  return mockMatchResults.filter((r) => r.match_id === matchId);
}

export function getAnnouncementsForTournament(tournamentId: string): TournamentAnnouncement[] {
  return mockAnnouncements
    .filter((a) => a.tournament_id === tournamentId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getLeaderboard(tournamentId: string): LeaderboardEntry[] {
  const teams = getTeamsForTournament(tournamentId);
  const matches = getMatchesForTournament(tournamentId);
  const completedMatches = matches.filter((m) => m.status === "completed");

  return teams
    .map((team) => {
      const per_match = completedMatches.map((m) => {
        const r = mockMatchResults.find((x) => x.match_id === m.id && x.team_id === team.id);
        return {
          match_number: m.match_number,
          placement: r?.placement || 0,
          kills: r?.kills || 0,
          points: r?.total_points || 0,
        };
      });
      const allResults = mockMatchResults.filter(
        (r) => r.team_id === team.id && completedMatches.some((m) => m.id === r.match_id),
      );
      return {
        team,
        per_match,
        total_kills: allResults.reduce((s, r) => s + r.kills, 0),
        total_placement_points: allResults.reduce((s, r) => s + r.placement_points, 0),
        total_kill_points: allResults.reduce((s, r) => s + r.kill_points, 0),
        total_points: allResults.reduce((s, r) => s + r.total_points, 0),
        wwcd_count: allResults.filter((r) => r.wwcd).length,
      };
    })
    .sort((a, b) => {
      if (b.total_points !== a.total_points) return b.total_points - a.total_points;
      if (b.wwcd_count !== a.wwcd_count) return b.wwcd_count - a.wwcd_count;
      return b.total_kills - a.total_kills;
    });
}

export function getTopPlayers(limit: number = 5) {
  return [...mockUsers]
    .filter((u) => u.role !== "admin")
    .map((u) => ({ user: u, stats: mockPlayerStats[u.id] }))
    .filter((x) => x.stats)
    .sort((a, b) => b.stats.rank_points - a.stats.rank_points)
    .slice(0, limit);
}

// ===== Live stats (mocked aggregates) =====
export const mockGlobalStats = {
  total_tournaments: 1247,
  active_players: 38420,
  prize_pool_distributed: 1840000,
  live_now: 4,
};

// ===== Kill feed mock entries (for ticker) =====
export const mockKillFeed = [
  { killer: "ShadowSniper⚡", victim: "GhostOps", weapon: "AWM", headshot: true, distance: "287m" },
  { killer: "PHX•Phoenix", victim: "Cipher.Zero", weapon: "M416", headshot: false, distance: "42m" },
  { killer: "RavenStrike", victim: "VPR.Viper", weapon: "Kar98", headshot: true, distance: "165m" },
  { killer: "KingpinX", victim: "FrostBite", weapon: "Groza", headshot: false, distance: "18m" },
  { killer: "NovaBlast", victim: "EchoFlux", weapon: "AWM", headshot: true, distance: "412m" },
  { killer: "BLZ_Blaze", victim: "AceWolf", weapon: "UMP45", headshot: false, distance: "9m" },
  { killer: "NeonHavoc", victim: "TitanCore", weapon: "Vector", headshot: false, distance: "23m" },
];
