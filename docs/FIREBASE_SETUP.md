# Firebase Setup — Detailed Walkthrough

Use this if you picked `storageMode: "firebase"` for multi-user / cross-phone live sync. Takes ~5 minutes the first time.

> **Even easier:** Open this folder in Claude Code and say *"set up Firebase"*. The [firebase-setup](../.claude/skills/firebase-setup.md) skill walks you through it interactively. This doc is the manual reference.

---

## What you'll need

- A Google account (regular Gmail works).
- ~5 minutes.
- **No credit card** — Firebase's free tier (Spark plan) is plenty for a casual league.

## Step 1 — Create the Firebase project

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)**.
2. Sign in with your Google account.
3. Click **"Create a project"** (or **"Add project"** if you have others).
4. **Project name:** Use your league name — e.g. `tuesday-pickle-crew`. Letters, numbers, hyphens only.
5. **Disable Google Analytics** when prompted. You don't need it. Toggle it off → **Continue**.
6. Wait ~30s. Click **Continue** when the project is ready.

## Step 2 — Enable Firestore Database

1. In the left sidebar, **Build** → **Firestore Database**.
2. Click **Create database**.
3. **Location:** Pick the region closest to you (e.g. `us-central` for North America). **This is permanent.**
4. **Security rules:** Choose **"Start in test mode"** — we'll lock it down in Step 5.
5. Click **Create**.

## Step 3 — Grab your web app config

1. Click the **⚙ gear icon** next to "Project Overview" → **Project settings**.
2. Scroll to **"Your apps"** → click the **`</>`** icon (Web app).
3. **App nickname:** anything (e.g. "Weekly Games"). **Don't** check Firebase Hosting.
4. Click **Register app**.
5. You'll see a `firebaseConfig` block. **Copy the values** into your `config.js`:

```js
// In config.js — replace the empty firebaseConfig:
firebaseConfig: {
    apiKey:            "AIzaSy...",
    authDomain:        "your-project.firebaseapp.com",
    projectId:         "your-project",
    storageBucket:     "your-project.firebasestorage.app",
    messagingSenderId: "123456789",
    appId:             "1:123:web:abc123"
}
```

Also set:
```js
storageMode: "firebase",
```

6. Click **Continue to console**.

## Step 4 — Enable Anonymous Authentication

> **This is the step most people forget.** Without it, the app will silently fail to read or write data.

1. Sidebar → **Build** → **Authentication**.
2. Click **Get started**.
3. On the **Sign-in method** tab, find **Anonymous** → click → toggle **Enable** → **Save**.

## Step 5 — Deploy security rules

The "test mode" rules from Step 2 allow anyone to read/write anything — fine for testing, but you should replace them with the more sensible defaults in this template:

1. Open the file `firestore.rules` in this folder. Copy the entire contents (Cmd+A, Cmd+C).
2. Back in Firebase Console: **Firestore Database** → **Rules** tab.
3. **Delete the existing rules.** Paste in the contents of `firestore.rules`.
4. Click **Publish**.

You should see a green "Rules published successfully" toast.

**Optional — CLI version** if you're comfortable with the terminal:
```bash
npm install -g firebase-tools
firebase login
cd /path/to/pickleball-league-tracker
firebase use --add        # pick your project
firebase deploy --only firestore:rules
```

## Step 6 — Test the connection

1. From a terminal in this folder: `open index.html` (Mac) or double-click `index.html` (Windows).
2. Open the browser's developer console (F12 → Console tab).
3. **You should NOT see any red errors.** A friendly Firebase init message is fine.
4. The app should load with your league name at the top.
5. Try the Admin tab → log in with your `adminPassword` → add a test player. If the player appears in the roster, you're good.

## Step 7 — Authorized domains (only when you deploy)

When you deploy the app to tiiny.host / GitHub Pages / Vercel, you need to tell Firebase that the new domain is allowed:

1. Firebase Console → **Authentication** → **Settings** tab.
2. Scroll to **Authorized domains**.
3. Click **Add domain** and add each domain where you've deployed:
   - `my-league.tiiny.site`
   - `username.github.io`
   - `*.vercel.app` (you'll need to add specific subdomains, not wildcards)
4. Save.

Without this, your deployed app shows "Permission denied" errors and nothing works.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Firebase mode is selected but firebaseConfig is missing` alert | One of the 6 config values is still empty |
| Browser console: `Permission denied` | Anonymous auth not enabled, or rules block this collection |
| Browser console: `auth/unauthorized-domain` | Domain not in Firebase Authentication → Settings → Authorized domains |
| Browser console: API key error | The `apiKey` string was truncated when you pasted |
| Scores save for you but not for others | Authorized domains issue (see above) |
| Console: `Failed to load resource: 400` | Firestore not actually enabled, or wrong `projectId` |

---

## What about cost?

The free Spark plan covers:
- 1 GB storage
- 50K document reads/day
- 20K document writes/day
- 20K document deletes/day

For a typical league (8-16 players, 1-2 sessions/week), you'll use **maybe 0.1% of that**. You will never see a bill. If you somehow do approach the limits, Firebase warns you and pauses writes — it won't surprise-bill you.

## Security disclaimer (one more time)

The default rules in `firestore.rules` require that the user be **signed in** (via anonymous auth) to read or write. They do NOT restrict by user — anyone with your `firebaseConfig` (which is embedded in the HTML and visible to anyone viewing the page) can read and write everything in those collections.

For a private league of friends, that's totally fine. **Do not use this template for anything with sensitive data.**

If you want real per-user permissions, you'd need to add real auth providers (Google, email, etc.) and modify the rules to scope writes to the signing user. That's a bigger lift — happy to help if you go there.
