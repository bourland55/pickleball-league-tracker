# Weekly Games — Tournament Template

> A complete, customizable tournament tracker for your weekly pickleball (or ping-pong, or tennis, or…) league. **No coding required.** Just open it in Claude Code and say *"let's get started."*

![Hero screenshot placeholder — drop a 5-up collage at assets/screenshots/hero.png](assets/screenshots/hero.png)

---

## What you get

- **5 mobile-friendly tabs:** This Week setup, live Court scoring, Leaderboard, Season standings, and Admin tools
- **Live multi-user mode** with Firebase — every player sees scores update in real time on their own phone
- **Solo mode** for single-device use (no setup, no internet)
- **Three themes:** dark, light, and a glowing **cyberpunk** mode (☾)
- **Full audit trail** of score edits with reason logging
- **Season standings** with weekly snapshots, ranking deltas, and a Wins-Per-Series scoring system
- **Substitution requests, absences, and edits** — all tracked
- **Sane defaults that work** out of the box; configurable when you need more

---

## 30-second quick start (with Claude Code)

```
1. Download or clone this repo.
2. Open the folder in Claude Code.
3. Say:
```

> **let's get started**

That's it. The setup wizard walks you through naming your league, picking a brand color, uploading a logo, choosing solo or multi-user mode, and deploying. **Total time: 10-15 minutes.**

Don't have Claude Code yet? Get it at [claude.com/code](https://claude.com/code) — free trials are available.

---

## Or, the manual path (no AI)

If you'd rather edit files by hand:

1. **Copy the config:** `cp config.example.js config.js`
2. **Edit `config.js`** — set your league name, sport, brand color, logo path, admin password.
3. **Pick storage mode:**
   - `"local"` → just open `index.html`. Data lives on this device.
   - `"firebase"` → free, multi-user. Follow [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md).
4. **Open `index.html`** in your browser. Done.

Full manual guide: [docs/INSTALL.md](docs/INSTALL.md).

---

## Screenshots

| This Week | Courts | Leaderboard |
|---|---|---|
| ![](assets/screenshots/01-this-week.png) | ![](assets/screenshots/02-courts.png) | ![](assets/screenshots/03-leaderboard.png) |

| Season | Admin | Cyberpunk theme |
|---|---|---|
| ![](assets/screenshots/04-season.png) | ![](assets/screenshots/05-admin.png) | ![](assets/screenshots/06-cyberpunk.png) |

---

## Customizing

Almost everything you'd want to change lives in **one file: `config.js`**.

```js
window.LEAGUE_CONFIG = {
    leagueName:  "Tuesday Night Pickle Crew",
    sport:       "Pickleball",
    subtitle:    "Weekly Games",
    logoSrc:     "assets/logo.png",
    brandColor:  "#22c55e",
    storageMode: "local",      // or "firebase"
    adminPassword: "changeme",
    // … see config.example.js for the full list
};
```

Full reference: [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md).

For deeper changes (new tabs, custom scoring, additional features), open this folder in Claude Code and try one of the prompts in [docs/PROMPTS.md](docs/PROMPTS.md). Example:

> *"Add a tab called 'Playoffs' between Season and Admin that shows the top 4 players in a single-elimination bracket."*

---

## Deploying (free hosting)

Once your `config.js` is set up, get it on the internet so your league can use it on their phones:

| Option | Time | Best for |
|---|---|---|
| **tiiny.host** (drag-and-drop) | 30 sec | Easiest, free, no account needed |
| **GitHub Pages** | 5 min | Long-term hobbyist, version-controlled |
| **Vercel** | 2 min | Polished, custom domains free |

Walkthrough: [docs/DEPLOY.md](docs/DEPLOY.md).

---

## What's in the box

```
pickleball-league-tracker/
├── index.html                 ← the app (~1800 lines, no build step)
├── config.example.js          ← copy → config.js, edit, done
├── firestore.rules            ← Firebase security rules (multi-user mode)
├── assets/
│   ├── logo.png                ← swap with yours
│   ├── favicon.svg             ← swap with yours
│   └── screenshots/            ← README screenshots
├── .claude/skills/             ← Claude Code skills (the setup wizard)
│   ├── getting-started.md      ← "/let's get started" — the flagship
│   ├── customize-branding.md   ← re-skin after install
│   ├── firebase-setup.md       ← multi-user mode walkthrough
│   ├── deploy.md               ← deployment helper
│   └── troubleshoot.md         ← debug common issues
└── docs/
    ├── INSTALL.md
    ├── CUSTOMIZE.md
    ├── PROMPTS.md
    ├── FIREBASE_SETUP.md
    └── DEPLOY.md
```

---

## Tech stack

- **Pure HTML + JavaScript** — no build step, no framework runtime, no npm install.
- **Tailwind CSS via CDN** — for styling.
- **Firebase Web SDK v9 (compat)** — optional, only loaded if you choose multi-user mode.
- **Total weight:** ~70KB compressed. Loads on cellular in <2s.

The app works fully offline in **solo mode**. In **multi-user mode** it needs an internet connection to sync with Firebase.

---

## Sport scope

Out of the box, this template is built around **pickleball-style mechanics:** 11-point games, 4-player doubles with a 3-series rotation. Easy to rename it for any 2v2 sport with similar rules (e.g. ping-pong doubles, padel, doubles tennis to 11).

For different formats (singles, 3v3, custom rotations), you'd need code changes — open the folder in Claude Code and describe what you want.

---

## License

MIT. Use it, fork it, customize it, redistribute it. Attribution appreciated but not required.

See [LICENSE](LICENSE).

---

## Credits

Originally built for the **Bill Buckners Pickleball League** by Dave Bourland. Open-sourced so any league can use it.

If you build something cool with this, I'd love to see it — DM me or open an issue!

---

## Need help?

- Open the folder in Claude Code and say *"troubleshoot"* — the [troubleshoot skill](.claude/skills/troubleshoot.md) diagnoses common issues
- File an issue on this repo
- Check [docs/PROMPTS.md](docs/PROMPTS.md) for common requests
