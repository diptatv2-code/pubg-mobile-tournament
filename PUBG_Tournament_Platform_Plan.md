# PUBG Mobile Tournament Hosting Platform - Complete Web/App Plan

## Overview
This document outlines the comprehensive plan for a modern, professional, and user-friendly PUBG Mobile tournament hosting platform. It is designed to be built using custom code (e.g., React/Next.js with Node.js/Firebase/Supabase) while remaining structured enough for low-code/no-code adaptation (e.g., Bubble, FlutterFlow). The initial target audience is Bangladesh and South Asian players, meaning it emphasizes mobile-first design, local payment methods, and dual language support (English and Bengali).

---

## 1. Full Feature List

### Core Features
- **Authentication & Profiles:** User registration and login (Email, Phone, Google), specific profiles for Players, Team Captains, and Organizers.
- **Language Support:** English and Bengali toggle.
- **Support & Communication:** WhatsApp/Messenger floating buttons for direct support.

### Tournament Management (Organizers)
- **Tournament Creation:** Set Name, Game Mode (Solo, Duo, Squad), Map, Date/Time, Entry Fee (Free/Paid), Prize Pool, Total Slots, and Rules.
- **Room Management:** Manual input for Room ID and Password.
- **Result Entry:** Manual entry for kills, placement points, total points, and upload capability for result screenshot proofs.
- **Payment Verification:** Dashboard to manually verify, approve, or reject payment proofs uploaded by participants.
- **Leaderboards:** Automated ranking based on manually entered points.

### Participant Features (Players & Team Captains)
- **Team Management:** Create a team, invite members via link or ID, upload team logo, and input in-game PUBG Mobile IDs.
- **Tournament Registration:** Browse, filter, and join free or paid tournaments.
- **Payment Upload:** Upload screenshots of local payment methods (e.g., bKash, Nagad, bank transfer) for paid tournaments.
- **Match Access:** View Room ID and Password 10–15 minutes before the match strictly for confirmed teams/players.

### Media & Content
- **Video Hub:** Embedded YouTube videos, live stream links, and past tournament highlights.
- **Featured Tournaments:** Admin-highlighted tournaments on the homepage.

### Admin Panel
- Comprehensive control over users, tournaments, payments, reports/complaints, and platform-wide settings.

---

## 2. User Flow

### Flow 1: Player / Team Captain Registration
1. **Signup/Login:** User registers on the platform.
2. **Profile Setup:** User enters their PUBG Mobile Character ID and in-game name.
3. **Team Creation (If Squad/Duo):** User creates a team, uploads a logo, and invites friends. Friends accept the invite and link their profiles.
4. **Browse:** User finds a tournament on the Homepage.
5. **Registration:**
   - *Free:* User clicks "Join", selects their team, and is instantly confirmed.
   - *Paid:* User clicks "Join", sees payment instructions (e.g., Send bKash to X number), makes the payment on their app, and uploads the transaction screenshot/TrxID. Status becomes "Pending".
6. **Wait for Approval:** Organizer approves the payment. Status becomes "Confirmed".
7. **Match Day:** 15 minutes before the match, the user checks the Tournament Dashboard to reveal the Room ID and Password.
8. **Post-Match:** User checks the Leaderboard/Results tab to see points and rankings.

### Flow 2: Organizer Hosting
1. **Signup/Login:** User registers and applies for Organizer status (or is automatically granted it based on platform policy).
2. **Create Tournament:** Fills out the form (Title, Date, Map, Solo/Squad, Fee, Prize Pool, Rules).
3. **Manage Registrations:** Checks the Organizer Dashboard for incoming registrations.
4. **Verify Payments:** Reviews uploaded screenshots for paid entry. Approves or rejects them.
5. **Room Details:** 30 minutes before the match, Organizer updates the tournament with the Room ID and Password.
6. **Post-Match:** Organizer collects the in-game result screenshot, enters kills and placement points for the top teams, uploads the proof screenshot, and publishes the results.
7. **Payout:** Contacts winners based on the provided payout details and sends the prize money.

---

## 3. Page-by-page Layout

1. **Homepage:**
   - **Hero Section:** High-impact PUBG-styled graphics, clear Call-to-Actions ("Host a Tournament", "Join Tournament"). Language toggle.
   - **Featured Tournaments:** Horizontal scrolling cards of premium or verified tournaments.
   - **Upcoming Matches:** List of tournaments open for registration.
   - **Media Section:** Embedded YouTube live streams and highlight clips.
   - **Footer:** Links to FAQ, Rules, Privacy Policy, Contact (WhatsApp/Messenger).

2. **Browse Tournaments Page:**
   - Search bar and Filters (Free/Paid, Solo/Duo/Squad, Map, Status).
   - Grid layout of Tournament Cards.

3. **Tournament Details Page:**
   - **Header:** Tournament Title, Banner, Organizer Name & Rating.
   - **Tabs:**
     - *Overview* (Date, Time, Prize Pool, Entry Fee)
     - *Rules* (Match rules, allowed devices)
     - *Participants* (List of registered teams/players)
     - *Room Details* (Locked until 15 mins before match, only visible to confirmed users)
     - *Results & Leaderboard* (Points table, updated post-match)

4. **Team/Player Profile Page:**
   - Avatar/Logo, Username, PUBG Mobile ID, Win Rate/Stats (manual or calculated), past tournament history.

---

## 4. Dashboard Structure

### Participant Dashboard (Player/Captain)
- **My Tournaments:** Split into 'Upcoming', 'Live', and 'Past'.
- **Pending Actions:** Alerts for pending payments or rejected transactions.
- **Team Management:** Add/remove players, update team name/logo.
- **Match Access:** Dedicated section popping up 15 mins before a match with Room ID & Password.

### Organizer Dashboard
- **My Hosted Tournaments:** List of active and past tournaments.
- **Registration Management:** Table showing Team Name, Captain Contact, Payment Status (Pending/Confirmed/Rejected), and Action buttons (Approve/Reject).
- **Match Management:** Input fields to enter Room ID and Password and push to participants.
- **Result Entry:** A table interface to input kills and placement points for each participating team, plus a file upload for result screenshots.

### Admin Panel
- **Overview:** Total users, active tournaments, total transactions.
- **User Management:** Ban/Suspend users, verify Organizer profiles.
- **Content Management:** Update YouTube links for the homepage, select Featured Tournaments.
- **Dispute Resolution:** Review reported complaints from players regarding organizers (e.g., unpaid prizes).

---

## 5. Database/Table Structure (Relational/NoSQL Concept)

### `users`
- `id` (UUID, Primary Key)
- `name` (String)
- `phone/email` (String)
- `pubg_id` (String)
- `role` (Enum: player, organizer, admin)
- `avatar_url` (String)

### `teams`
- `id` (UUID)
- `captain_id` (UUID, Foreign Key to users)
- `name` (String)
- `logo_url` (String)

### `team_members`
- `team_id` (UUID, Foreign Key to teams)
- `user_id` (UUID, Foreign Key to users)
- `status` (Enum: pending, accepted)

### `tournaments`
- `id` (UUID)
- `organizer_id` (UUID, Foreign Key to users)
- `title` (String)
- `mode` (Enum: solo, duo, squad)
- `map` (String)
- `entry_fee` (Decimal, 0 if free)
- `prize_pool` (Decimal)
- `total_slots` (Integer)
- `start_time` (DateTime)
- `room_id` (String, nullable)
- `room_password` (String, nullable)
- `status` (Enum: upcoming, registration_closed, live, completed)

### `registrations`
- `id` (UUID)
- `tournament_id` (UUID, Foreign Key to tournaments)
- `team_id` (UUID, nullable, Foreign Key to teams)
- `user_id` (UUID, nullable, for Solo)
- `payment_proof_url` (String, nullable)
- `payment_status` (Enum: pending, confirmed, rejected)

### `results`
- `id` (UUID)
- `tournament_id` (UUID, Foreign Key to tournaments)
- `team_id` (UUID, Foreign Key to teams)
- `kills` (Integer)
- `placement_points` (Integer)
- `total_points` (Integer)
- `screenshot_proof_url` (String)

---

## 6. UI Design Description

- **Theme:** Dark Mode by default. Backgrounds in deep charcoal (`#121212`) or dark navy (`#0B0E14`).
- **Accents:** Neon colors associated with gaming.
  - Primary: Neon Green (`#39FF14`) or Electric Blue (`#00F0FF`) for primary buttons and active states.
  - Secondary/Alerts: Orange (`#FF5722`) or Red (`#FF003C`) for warnings, rejections, or live indicators.
- **Typography:** Modern sans-serif fonts (e.g., *Inter*, *Roboto*, or *Rajdhani* for headings to give a tech/gaming vibe). Must cleanly support Bengali characters (e.g., *Hind Siliguri*).
- **Components:**
  - Cards with subtle glowing drop-shadows on hover.
  - Badges for status (e.g., Green pill for "Confirmed", Red for "Live").
  - Skeleton loaders for data fetching to maintain a premium feel.
- **Mobile First:** Bottom navigation bar for mobile users (Home, Browse, My Tournaments, Profile). Large, easily tappable buttons.

---

## 7. Sample Homepage Copy

**Hero Headline (English):** Dominate the Battleground. Host, Join, and Win!
**Hero Subheadline:** The ultimate PUBG Mobile tournament platform for South Asia. Compete with the best, climb the leaderboards, and win real cash prizes.
**Buttons:** [ Join a Match ] [ Host a Tournament ]

**Hero Headline (Bengali):** ব্যাটলগ্রাউন্ডে রাজত্ব করুন। টুর্নামেন্ট খেলুন এবং জিতুন!
**Hero Subheadline:** দক্ষিণ এশিয়ার সবচেয়ে আধুনিক পাবজি মোবাইল টুর্নামেন্ট প্ল্যাটফর্ম। সেরা দলগুলোর সাথে লড়াই করুন এবং জিতে নিন আকর্ষণীয় পুরস্কার।

---

## 8. Sample Tournament Card

**Visual:** A dark card with a subtle Erangel map background image.
**Top Left:** `[LIVE]` (Red pulsating badge) or `[UPCOMING]`
**Top Right:** `Squad` | `Erangel`
**Title:** "Midnight Scrims Season 4"
**Organizer:** Hosted by *Team Alpha* (⭐ 4.8)
**Details Grid:**
- 📅 12 Oct, 9:00 PM
- 💰 Prize Pool: 5,000 BDT
- 🎟️ Entry: 100 BDT / Team
- 👥 Slots: 15 / 25 Filled
**Bottom:** A full-width Neon Blue button: `[ Register Now ]`

---

## 9. Sample Rules Text

### Standard Tournament Rules
1. **Fair Play:** No hacking, cheating, or use of third-party plugins. Any team found violating this will be permanently banned from the platform.
2. **Device Restrictions:** Mobile devices only. Emulators and iPad users are strictly prohibited unless specified otherwise by the organizer.
3. **Punctuality:** The Room ID and Password will be provided 15 minutes before the match. The match will start exactly on time. No remakes for latecomers.
4. **Registration Match:** The in-game name and PUBG Character ID must match the details provided during registration. Unregistered ringers will lead to team disqualification.
5. **Disputes:** Organizers hold the final decision in case of any disputes. Please use the "Report Issue" button to contact admins if an organizer is unresponsive.

---

## 10. Monetization Ideas

1. **Platform Commission:** Charge a small percentage (e.g., 5-10%) on the entry fees collected by organizers.
2. **Premium Organizers:** Offer a monthly subscription for organizers to get a "Verified" badge, priority listing on the homepage, and access to advanced analytics.
3. **Featured Placements:** Allow organizers to pay a flat fee to have their tournament pinned to the "Featured" section on the homepage for maximum visibility.
4. **Ads & Sponsorships:** Display non-intrusive gaming-related advertisements or secure sponsorships from local gaming cafes, ISP providers, or mobile brands.
5. **Withdrawal Fees:** Apply a nominal flat fee when organizers or players withdraw their wallet balance to their local bank or mobile financial service (bKash/Nagad).
