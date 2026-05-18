---
name: troubleshoot
description: Diagnose common issues with the Weekly Games app — broken setup, scores not saving, Firebase errors, missing branding, can't log into Admin. Trigger phrases include "something's broken", "scores aren't saving", "help me debug".
---

You're the help desk. Ask one focused question to localize the problem, then walk through the fix.

---

## Workflow

### Step 1 — Ask what's wrong

> What's happening?
>
> 1. The app won't load / shows the "Setup needed" message
> 2. I see the app but it looks wrong (no logo, wrong colors, wrong name)
> 3. Scores aren't saving / I can't enter a score
> 4. I can't get into the Admin tab
> 5. Other players can't see my scores (Firebase mode)
> 6. Something else — let me describe it

### Branch 1 — Setup needed / blank page

Most common cause: `config.js` doesn't exist or has a syntax error.

```bash
ls -la "config.js" 2>/dev/null || echo "MISSING"
node -c config.js 2>/dev/null && echo "VALID JS" || echo "SYNTAX ERROR"
```

- **Missing:** run `cp config.example.js config.js`, then invoke `/getting-started` to fill it in.
- **Syntax error:** read `config.js`, find the offending line (usually a missing quote, comma, or curly brace). Compare against `config.example.js` line by line if needed.
- **Looks fine but still blank:** check the browser console (F12 → Console). Copy any red errors and diagnose.

### Branch 2 — Visual issues (logo, color, name)

> Quick check — let me look at your config.

Read `config.js`. Common causes:
- **No logo showing:** `logoSrc` points to a file that doesn't exist. Run `ls assets/` to verify the file's there with that exact name (case-sensitive).
- **Wrong brand color:** `brandColor` value is invalid hex. Must be `#RRGGBB` format with 6 hex digits.
- **Wrong league name:** `leagueName` in config is different from what they expect. Update it.
- **Changes not appearing:** hard refresh the browser (Cmd+Shift+R / Ctrl+Shift+R). Maybe also check they edited `config.js` not `config.example.js`.

### Branch 3 — Scores not saving

**If `storageMode: "local"`:**
- Open dev tools → Application → Local Storage → check for `bbpl-games-local-db` key. If empty, the app isn't writing — check console for errors.
- If using **private/incognito mode**, localStorage might be cleared on close. Warn the user and suggest a regular window.
- If they cleared browser data recently, the data is gone. (localStorage is per-browser-per-device.)

**If `storageMode: "firebase"`:**
- Browser console probably has "Permission denied" or "Missing or insufficient permissions" errors.
- Check Firestore rules are deployed (Firebase Console → Firestore → Rules).
- Check Anonymous auth is enabled (Firebase Console → Authentication → Sign-in method).
- Check `firebaseConfig` values in `config.js` are correct — no typos, no truncated apiKey.
- If deployed: did they add the deployment domain to Firebase Authentication → Settings → Authorized domains?

### Branch 4 — Can't log into Admin

- Check the `adminPassword` value in `config.js` matches what they're typing (case-sensitive, no extra spaces).
- Clear the input field, type it fresh.
- If they forgot the password: edit `config.js`, change `adminPassword`, hard refresh.

### Branch 5 — Other players can't see scores (Firebase mode)

- Other players are getting "Permission denied" errors in their browser console? → Authorized domains not configured. Add the URL to Firebase Authentication → Settings → Authorized domains.
- Other players see an outdated version? → They have a stale cached copy. They should hard refresh (Cmd+Shift+R) or close and reopen the tab.
- They're seeing the right URL but no scores? → Different Firebase project. Verify everyone's loading the same URL.

### Branch 6 — Describe the issue

Ask for:
1. What were you trying to do?
2. What happened instead?
3. Any error messages? (Open browser console: F12 → Console)
4. What's your `storageMode`?

Then walk through diagnosis based on the answer.

---

## Universal first-resort checks

When unsure where to start, run these:

```bash
# 1. Is the project structure intact?
ls -la "/Users/david.bourland/Desktop/Claude Code/pickleball-league-tracker/"

# 2. Does config.js exist and parse?
node -c "/Users/david.bourland/Desktop/Claude Code/pickleball-league-tracker/config.js" && echo "OK"

# 3. Browser console errors? — tell user to:
#    Right-click → Inspect → Console tab → screenshot any red text
```

If the config parses and the files exist but the app still misbehaves, the issue is almost always:
- Wrong values in `config.js` (typo)
- Firebase permissions (rules / anon auth / authorized domains)
- Browser cache (hard refresh)

---

## Rules

- **Always ask before suggesting destructive fixes** (like deleting localStorage data — that wipes scores).
- **Capture error messages verbatim.** "It's broken" isn't actionable; "Permission denied: writing weekGroups" is.
- **If completely stumped**, suggest the user post the error in the project's GitHub issues (or wherever they got the template from).
