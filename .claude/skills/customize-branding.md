---
name: customize-branding
description: Re-skin a Weekly Games install — change the league name, sport, brand color, logo, or external links after initial setup. Trigger phrases include "change the colors", "update the logo", "rename my league", "customize branding".
---

You help users change branding on an already-set-up Weekly Games install. Unlike `getting-started`, the user already has a working `config.js` — just walk them through the specific change they want, edit `config.js`, and remind them to reload.

---

## Workflow

### Step 1 — Ask what to change

> Which of these do you want to update?
>
> 1. League name
> 2. Sport / subtitle / tagline
> 3. Brand color
> 4. Logo
> 5. External links (header buttons to other sites)
> 6. Admin password
> 7. Multiple things at once

You can do multiple in one session — just collect all the changes first, then edit `config.js` once at the end.

### Step 2 — Make the change(s)

**League name:** Read `config.js`, replace `leagueName: "..."` value.

**Sport / subtitle:** Replace `sport`, `subtitle`, or `tagline`.

**Brand color:** Offer the same swatches as `getting-started.md` Step 3, OR accept a custom hex. Update both `brandColor` and `brandColorDark` (derive `brandColorDark` by darkening — see helper below). Confirm with the user before writing.

**Logo:** Same three branches as `getting-started.md` Step 4:
- File upload → copy to `assets/logo.png`
- AI generate → run `generate_image.py` if available, otherwise hand them a prompt
- Default / remove → set `logoSrc: ""` or restore the default path

**External links:** Ask what label + URL they want. Append to the `externalLinks` array as `{ label: "Rules", url: "https://..." }`. Common uses: league rules doc, group calendar, group chat invite link.

**Admin password:** Replace the `adminPassword` value. Warn again about it being casual protection only.

### Step 3 — Confirm changes

Show the user the updated `config.js` (or just the changed lines) and confirm before saving:

> Here's what's about to change in `config.js`:
> - `leagueName:` "Old" → "New"
> - `brandColor:` `#22c55e` → `#3b82f6`
>
> OK to write this?

### Step 4 — Reload the app

> ✓ Updated! Reload the app to see the changes:
> - If you're running it locally: refresh the browser tab
> - If it's deployed: redeploy with `/deploy` (or re-upload the folder to your host)

If the brand color didn't seem to update visually, suggest a hard refresh (Cmd+Shift+R / Ctrl+Shift+R).

---

## Helpers

### Deriving `brandColorDark` from a brand hex

Take the brand hex and reduce the lightness ~15%. Easiest mapping for common colors:

| Brand | brandColor | brandColorDark |
|---|---|---|
| Green | `#22c55e` | `#16a34a` |
| Blue | `#3b82f6` | `#2563eb` |
| Purple | `#8b5cf6` | `#7c3aed` |
| Orange | `#f59e0b` | `#d97706` |
| Red | `#ef4444` | `#dc2626` |
| Teal | `#14b8a6` | `#0d9488` |
| Pink | `#ec4899` | `#db2777` |

For custom hexes, use `chroma.js` style logic: parse RGB, multiply each channel by 0.82, clamp. Or just ask the user to pick a darker variant manually.

### Logo file path conventions

- PNG with transparency works best.
- 512×512 is a good size — header crops to 36px tall and scales.
- If they provide a square-ish file, keep filename as `logo.png` regardless of original extension (just save as PNG via the OS if needed).
- For SVG, save as `logo.svg` and update `logoSrc: "assets/logo.svg"`.

---

## Rules

- **Always read `config.js` before editing** to preserve other values they may have customized.
- **Never silently change the storage mode.** If the user asks "can I switch to multi-user mode?", invoke `firebase-setup` — don't just flip the flag.
- **Keep `config.example.js` untouched.** That's the canonical template.
