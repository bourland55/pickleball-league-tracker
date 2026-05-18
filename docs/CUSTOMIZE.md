# What You Can Customize

Everything you'd reasonably want to change lives in `config.js`. Here's the full guide.

> **Easier:** Open this folder in Claude Code and say *"customize my branding"* — the [customize-branding](../.claude/skills/customize-branding.md) skill handles all of this for you. The docs below are the manual reference.

---

## Identity

```js
leagueName: "Your League Name",   // shows as the big header
sport: "Pickleball",              // appears under the name
subtitle: "Weekly Games",         // appears next to the sport
tagline: "Weekly games + season standings",
```

- The header takes whatever you put in `leagueName` and renders it in CAPS. Type it normally.
- `sport — subtitle` shows together as the smaller text under the name.
- `tagline` isn't shown in the app yet, but is reserved for future use (and README references).

## Logo

```js
logoSrc: "assets/logo.png",   // path; "" hides
logoAlt: "League logo",        // alt text for accessibility
```

- Drop your file in `assets/` (or anywhere — the path is relative to `index.html`).
- PNG with transparency works best. SVG also works. Recommended size: **512×512**, scaled to ~36px tall.
- Set `logoSrc: ""` to show text only with no logo.

## Brand color

```js
brandColor: "#22c55e",       // primary
brandColorDark: "#16a34a",   // hover/active darker shade
```

Used for: header underline, active tab indicator, primary buttons, links, badges. A handful of suggested combos:

| Color | brandColor | brandColorDark |
|---|---|---|
| Green | `#22c55e` | `#16a34a` |
| Blue | `#3b82f6` | `#2563eb` |
| Purple | `#8b5cf6` | `#7c3aed` |
| Orange | `#f59e0b` | `#d97706` |
| Red | `#ef4444` | `#dc2626` |
| Teal | `#14b8a6` | `#0d9488` |
| Pink | `#ec4899` | `#db2777` |

Other UI colors (text grays, card backgrounds, danger reds) auto-derive from a light/dark theme palette — you don't need to touch them.

## Storage

```js
storageMode: "local",   // "local" | "firebase"
```

- `"local"` — single device, no internet needed, no setup. Data lives in this browser's `localStorage`. Two tabs on the same device sync via `BroadcastChannel`.
- `"firebase"` — multi-user with live cross-phone sync. Requires a free Firebase project. See [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

You can switch between modes at any time, but **switching does not migrate data** — you'd start fresh in the new mode.

## Firebase config

```js
firebaseConfig: {
    apiKey: "", authDomain: "", projectId: "",
    storageBucket: "", messagingSenderId: "", appId: ""
}
```

Only used when `storageMode: "firebase"`. Get the values from Firebase Console → Project Settings → Your apps → Web app.

## Admin password

```js
adminPassword: "changeme",
```

Gates the Admin tab (player roster, week setup, score audit log, danger-zone reset). **Casual protection only** — stored as plain text in the JavaScript, visible to anyone who views the page source. Don't reuse a serious password.

## Scoring (advanced)

```js
winningScore: 11,
pickleScore: 0,
```

- `winningScore` — the score that wins a game. Default 11 (pickleball-style). Could go to 21 for ping-pong, 6 for tennis games, etc.
- `pickleScore` — what counts as a "PICKLED" shutout for the losing team. Default 0.

> **Note:** `SERIES_DEF` (the 4-player doubles rotation in `index.html`) is *not* configurable here. The schedule logic assumes 4 players per court and 3 series per session. Adapting that takes a code change, not a config tweak.

## External links

```js
externalLinks: [
    { label: "Rules",    url: "https://docs.google.com/document/d/..." },
    { label: "Schedule", url: "https://calendar.google.com/..." }
]
```

Buttons that show up in the header next to the theme toggle. Useful for league rules docs, calendars, group chat invites, or any related page. Set to `[]` (empty array) to show none.

---

## Things you might want to customize that aren't in config.js yet

These would require editing `index.html` itself (or asking Claude Code to add them as config options):

- **Schedule rotation** (the SERIES_DEF doubles pattern)
- **Court count and order** (COURT_ORDER)
- **Scoring rules** (+5 for game win, etc. — see line ~1130 in index.html for the league settings card)
- **Tab names** (This Week, Courts, Leaderboard, Season, Admin)

Just open the folder in Claude Code and describe what you want — e.g. *"add a tab called 'Playoffs' between Season and Admin"*.
