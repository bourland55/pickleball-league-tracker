/* ─────────────────────────────────────────────────────────────────────
   LEAGUE CONFIG
   This is the only file most people need to edit.
   Copy this file to "config.js" and change the values below.
   The setup wizard in Claude Code can do this for you automatically —
   open this folder in Claude Code and say: "let's get started"
   ───────────────────────────────────────────────────────────────────── */
window.LEAGUE_CONFIG = {

    // ─── Identity ─────────────────────────────────────────────────────
    leagueName: "Your League Name",   // shows as the big header (e.g. "BILL BUCKNERS")
    sport: "Pickleball",              // appears under the league name
    subtitle: "Weekly Games",         // appears next to the sport
    tagline: "Weekly games + season standings",  // shown in the README/intro

    // ─── Logo ─────────────────────────────────────────────────────────
    // Path to a logo file (PNG, JPG, or SVG). Drop your file in assets/
    // and update the path. Set to "" to show only text (no logo).
    // A placeholder lives at assets/logo.svg by default.
    logoSrc: "assets/logo.svg",
    logoAlt: "League logo",

    // ─── Brand color ──────────────────────────────────────────────────
    // Your league's primary green/blue/red/whatever. Used for headers,
    // buttons, active states, the favicon dot, etc.
    // Try: #22c55e (green, default), #3b82f6 (blue), #f59e0b (orange),
    //      #ec4899 (pink), #8b5cf6 (purple), #ef4444 (red)
    brandColor: "#22c55e",
    brandColorDark: "#16a34a",   // a darker shade for hover/active states

    // ─── Storage mode ─────────────────────────────────────────────────
    // "local"    → saves everything to this device's browser. Works offline.
    //              No setup, no internet needed. Best for trying it out or
    //              for a single-person score-keeper.
    // "firebase" → saves to a Firebase cloud project so everyone in your
    //              league sees live scores on their own phones. Requires
    //              one-time Firebase setup (the wizard walks you through it).
    storageMode: "local",

    // ─── Firebase config (only used if storageMode === "firebase") ───
    // Paste the config object from your Firebase project here.
    // Get it at: console.firebase.google.com → Project Settings → Your apps
    firebaseConfig: {
        apiKey:            "",
        authDomain:        "",
        projectId:         "",
        storageBucket:     "",
        messagingSenderId: "",
        appId:             ""
    },

    // ─── Admin password ───────────────────────────────────────────────
    // Required to enter the Admin tab (roster management, week setup,
    // score audit log, danger-zone reset).
    // ⚠️ This is stored in client-side JavaScript — it's casual protection,
    //    not real security. Use it to prevent accidental edits, not to
    //    keep out determined attackers. Don't reuse a serious password.
    adminPassword: "changeme",

    // ─── Scoring (advanced — most leagues won't change these) ─────────
    // The app uses an 11-point pickleball-style game by default.
    // Changing these will affect score validation and the "PICKLED" 11-0
    // shutout detection. SERIES_DEF (4-player doubles rotation) is not
    // configurable here — it's baked into the schedule logic.
    winningScore: 11,
    pickleScore: 0,        // the losing score on an 11-0 shutout

    // ─── External links (optional) ───────────────────────────────────
    // Buttons that appear in the header. Useful for linking to a league
    // rules doc, calendar, group chat, or any related page.
    // Examples:
    //   { label: "Rules", url: "https://docs.google.com/document/d/..." }
    //   { label: "Schedule", url: "https://calendar.google.com/..." }
    externalLinks: []
};
