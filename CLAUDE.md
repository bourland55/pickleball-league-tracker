# CLAUDE.md — Pickleball League Tracker

This file loads into every Claude Code session opened in this folder. It's the canonical project guide for both maintainers and AI assistants working on the codebase.

---

## What This Project Is

A public, MIT-licensed open-source template that anyone can fork to run their own weekly pickleball league. Originally derived from Dave Bourland's private Bill Buckners app (`~/Desktop/Claude Code/Personal Projects/bbpl-games.html`) but **sanitized and re-architected** for non-coder adoption.

**Repo:** https://github.com/bourland55/pickleball-league-tracker
**Live demo (GitHub Pages):** https://bourland55.github.io/pickleball-league-tracker/
**License:** MIT
**Audience:** Total non-coders. Setup is via a Claude Code skill that walks them through everything.

---

## Architecture at a Glance

- **Single-file app** — `index.html` (~2093 lines) is the whole thing. No build step, no `npm install`.
- **Config-driven branding** — Everything customizable lives in `config.js` (user-created from `config.example.js`). Loaded *before* the inline app script.
- **Storage adapter pattern** — Same Firestore-compatible API, two backends:
  - `storageMode: "local"` → in-memory shim backed by `localStorage` + `BroadcastChannel` for cross-tab sync on one device
  - `storageMode: "firebase"` → real Firestore (multi-user, cross-phone)
  - The app code calls `db.collection(...)` etc. regardless of mode — the shim quacks like Firestore
- **Three themes** — Dark, light, cyberpunk. Cycle order: `THEME_ORDER = ['dark','light','cyberpunk']`. Stored in `localStorage` under `bbpl-theme`.
- **CSS variable for brand color** — `--brand` is set at runtime from `CFG.brandColor`. Powered by the `applyBranding()` IIFE.

## File Inventory

```
pickleball-league-tracker/
├── CLAUDE.md                    ← this file
├── README.md                    ← GitHub landing page
├── README.html                  ← Sage-themed browser version (served via GH Pages)
├── LICENSE                      ← MIT
├── .gitignore                   ← excludes config.js, _seed.html, etc.
├── index.html                   ← THE APP (~2093 lines, single-file)
├── config.example.js            ← canonical template; users copy → config.js
├── config.js                    ← user-edited; gitignored
├── firestore.rules              ← security rules for multi-user mode
├── _seed.html                   ← local dev helper for screenshots; gitignored
├── assets/
│   ├── favicon.svg              ← default green-square placeholder
│   ├── logo.svg                 ← "YOUR LEAGUE" placeholder
│   └── screenshots/             ← README screenshots (currently empty)
├── .claude/skills/
│   ├── getting-started.md       ← flagship wizard ("let's get started")
│   ├── firebase-setup.md        ← multi-user mode walkthrough
│   ├── customize-branding.md    ← re-skin after install
│   ├── deploy.md                ← tiiny.host / GH Pages / Vercel
│   └── troubleshoot.md          ← common-issue debug
└── docs/
    ├── INSTALL.md               ← manual setup (no Claude path)
    ├── CUSTOMIZE.md             ← every config knob explained
    ├── PROMPTS.md               ← 30+ copy-paste prompts for users
    ├── FIREBASE_SETUP.md        ← long-form Firebase walkthrough
    └── DEPLOY.md                ← hosting comparison + steps
```

## Source Decisions (Don't Re-Litigate Without Cause)

These were locked during the build via AskUserQuestion. If a future change appears to violate one of them, flag it before implementing.

| # | Decision | Implication |
|---|---|---|
| 1 | **Pickleball-first, easy to rename** | `SERIES_DEF` (4-player doubles rotation) and the 11-point winning score stay structural. Branding/labels are configurable. Don't refactor to be sport-agnostic without explicit go. |
| 2 | **Total non-coder audience** | Every doc and skill assumes zero terminal experience. No jargon without definition. Walk through clicks step by step. |
| 3 | **Pick storage at setup** | The two-mode storage adapter is load-bearing. Both `local` and `firebase` modes must keep working. |
| 4 | **Project-internal `.claude/skills/`** | Skills ship in the repo, not as separate `.skill` archives. Anyone who opens the repo in Claude Code can invoke them. |

## House Rules for Future Changes

- **Never bring "Bill Buckners" or "BBPL" branding back into this repo.** It's public. Dave's personal league lives at `~/Desktop/Claude Code/Personal Projects/bbpl-games.html` — keep that mental wall.
- **Never bring "bets" or betting-app references back.** This repo is just the games tracker. The Dec 2026 cleanup removed every reference; don't re-add.
- **`config.js` is per-fork — never commit it.** It's in `.gitignore`. `config.example.js` is the canonical template that ships.
- **Don't change `--brand` to a hardcoded hex.** Keep it as a CSS variable set at runtime from `CFG.brandColor`. Same for any branding-derived value.
- **When adding features, default to config-driven.** New UI text → `CFG.someText`. New behavior → toggleable in config. Resist hardcoding.
- **Keep the single-HTML constraint.** No npm dependencies, no build step, no bundler. CDN-loaded Tailwind + Firebase. Deployability via tiiny.host is the magic.
- **Preserve both storage modes** in any data-model change. If you add a new collection, the local shim handles it automatically (it's untyped), but verify the Firestore rules cover it.

## Common Maintenance Prompts

```
Add a [feature] to the app. Keep it configurable via config.example.js where possible. Test in both solo (local) and Firebase modes.
```

```
Run /troubleshoot — someone reported [issue].
```

```
Capture screenshots:
1. Open _seed.html to populate sample data
2. Drive through tabs and capture each at 420×900
3. Save to assets/screenshots/{01-this-week,02-courts,03-leaderboard,04-season,05-admin,06-cyberpunk}.png
4. Commit
```

```
Update the Earl Duque series alignment — fetch his latest post and refresh the guides if anything's changed.
```

## Deploying / Publishing Changes

```bash
cd ~/Desktop/Claude\ Code/pickleball-league-tracker
git add .
git commit -m "describe the change"
git push
```

GitHub Pages auto-redeploys within ~60 seconds. tiiny.host / Vercel users need to re-upload or push to their own forks.

## Testing Checklist Before Pushing

- [ ] Open `index.html` in a fresh browser tab — solo mode loads, no console errors
- [ ] Theme toggle cycles dark → light → cyberpunk → dark
- [ ] Admin password works (`changeme` in the smoke-test `config.js`)
- [ ] Add a sample player → appears in roster
- [ ] If Firebase code changed: test against a real Firebase project too
- [ ] `git status` shows no `config.js` or `_seed.html` in pending changes (both are gitignored)

## Related Resources (in this workspace)

- **Original private app:** `~/Desktop/Claude Code/Personal Projects/bbpl-games.html` — source of truth for the league mechanics. Do NOT cross-pollinate it back here.
- **Round-robin sibling app:** `~/Desktop/Claude Code/Personal Projects/bbpl-round-robin.html` — where the cyberpunk theme was first built. Reference it if porting more themes.
- **Memory file:** `~/.claude/projects/.../memory/project_pickleball_league_tracker.md` — a higher-level pointer record. This CLAUDE.md is the canonical guide.

## Open Follow-ups

- **Screenshots** — `assets/screenshots/` is empty. Plan: use `_seed.html` to populate sample data, capture each tab at 420×900. Manual capture is fine via `Cmd+Shift+4 → Space → click window`.
- **Social preview image** (1280×640) — upload via repo Settings → Social preview.
- **Pin repo to GitHub profile** + star self.
- **External promotion** — r/pickleball, r/selfhosted, LinkedIn, Show HN.
- **CONTRIBUTING.md** — write one if/when the project gets real outside contributors.
