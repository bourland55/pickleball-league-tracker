# Manual Install (without Claude Code)

If you don't want to use Claude Code, follow these steps to set up the app by hand.

> **Most people should use the wizard instead.** Open this folder in Claude Code and say *"let's get started"* — it walks you through everything in 10 minutes with no manual editing. See the main [README.md](../README.md).

---

## What you need

- **A web browser** — any modern one (Chrome, Safari, Firefox, Edge).
- **A text editor** — VS Code is free and great, but Notepad / TextEdit also works.
- **(Optional) A Google account** — only if you want multi-user mode with cloud sync.

## Step 1 — Copy the config

```bash
cp config.example.js config.js
```

Or on Windows in Explorer: copy/paste `config.example.js` and rename the copy to `config.js`.

## Step 2 — Edit config.js

Open `config.js` in your text editor. Update these values:

| Field | What to put |
|---|---|
| `leagueName` | Your league name. UPPERCASE in the header at runtime, so type it normally. |
| `sport` | "Pickleball", "Ping Pong", "Tennis", etc. |
| `subtitle` | Tagline. "Weekly Games" is fine. |
| `logoSrc` | Path to your logo file. Drop it in `assets/` and update. Set to `""` to hide. |
| `brandColor` | A `#RRGGBB` hex color. Try `#22c55e` (green), `#3b82f6` (blue), `#ef4444` (red). |
| `brandColorDark` | A slightly darker version of `brandColor` for hover states. |
| `adminPassword` | Pick something. **Casual protection only — not real security.** |
| `storageMode` | `"local"` (single device, no setup) or `"firebase"` (multi-user, requires Firebase setup) |

## Step 3a — Solo mode (single device)

If you set `storageMode: "local"`, you're done. Open `index.html` in your browser. Data lives in this browser, on this device, only.

## Step 3b — Multi-user mode (Firebase)

If you set `storageMode: "firebase"`, you need a free Firebase project. Follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## Step 4 — Open the app

- **Mac:** Double-click `index.html`, or `open index.html` in Terminal.
- **Windows:** Double-click `index.html`.
- **Linux:** `xdg-open index.html`.

The app loads in your default browser.

## Step 5 — Deploy (optional)

Get a public URL so your league can use it on their phones. See [DEPLOY.md](DEPLOY.md).

---

## Troubleshooting

- **"Setup needed" message instead of the app:** `config.js` is missing. Did Step 1 finish?
- **App loads but looks like the default placeholder:** the file still has `"Your League Name"` etc. — you didn't update `config.js`, or you edited `config.example.js` by mistake.
- **Console errors mention Firebase:** see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) — most likely Anonymous auth or Authorized domains.
