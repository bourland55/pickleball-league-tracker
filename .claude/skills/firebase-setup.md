---
name: firebase-setup
description: Walk a non-coder through creating a free Firebase project for the Weekly Games multi-user storage mode. Invoked from getting-started.md when the user picks multi-user mode, or directly with "set up firebase".
---

You are guiding a total beginner through creating their first Firebase project. Be patient. Use plain English. Confirm each step before moving on.

**Tone:** "Here's exactly what to click. Tell me when you're there."

---

## Workflow

### Pre-flight

> You'll need a Google account (a regular Gmail account works). Got one?

If no: "No problem — go to [accounts.google.com](https://accounts.google.com) and create one, then come back."

### Step 1 — Create the Firebase project

> 1. Open this link in your browser: **https://console.firebase.google.com**
> 2. Sign in with your Google account.
> 3. Click the big card that says **"Create a project"** (or **"Add project"** if you've used Firebase before).
> 4. **Project name:** Whatever you want — your league name works great. (e.g. "tuesday-pickle-crew")
> 5. **Disable Google Analytics** when it asks — you don't need it. Toggle it off and click **Continue**.
> 6. Wait ~30 seconds while Firebase sets things up.
> 7. When it says "Your new project is ready," click **Continue**.

Pause. Ask: "Are you at the project dashboard now? (You should see your project name at the top and a bunch of icons for Firebase services.)"

### Step 2 — Enable Firestore

> 1. In the left sidebar, click **Build** → **Firestore Database**.
>    *(If the sidebar is hidden, click the ☰ menu icon at the top-left.)*
> 2. Click **Create database**.
> 3. **Location:** Pick the one closest to you (e.g. `us-central` for North America, `europe-west` for Europe). **This can't be changed later, so pick carefully.**
> 4. Click **Next**.
> 5. **Security rules:** Select **"Start in test mode"** for now. (We'll lock it down with proper rules in Step 4.)
> 6. Click **Create**.
> 7. Wait ~30 seconds.

Pause. Ask: "Are you on the Firestore page now? (You should see an empty database with no collections yet.)"

### Step 3 — Get the web app config

This is the magic step — we need 6 string values to paste into `config.js`.

> 1. Click the **⚙ gear icon** next to "Project Overview" at the top of the left sidebar.
> 2. Choose **Project settings**.
> 3. Scroll down to **"Your apps"**.
> 4. Click the **`</>`** icon (Web app).
> 5. **App nickname:** Anything you want. ("Weekly Games" is fine.)
> 6. **DON'T** check "Also set up Firebase Hosting" — we don't need it.
> 7. Click **Register app**.
> 8. You'll see a code block that looks like this:
>
>    ```js
>    const firebaseConfig = {
>      apiKey: "AIzaSy...",
>      authDomain: "your-project.firebaseapp.com",
>      projectId: "your-project",
>      storageBucket: "your-project.firebasestorage.app",
>      messagingSenderId: "123456789",
>      appId: "1:123:web:abc123"
>    };
>    ```
>
> 9. **Copy the whole `{ ... }` block** — every line between the curly braces.
> 10. Click **Continue to console** (you're done with this part).

Now ask the user: "Paste the whole config block here and I'll save it to your `config.js`."

When they paste, parse the 6 values and update `config.js` accordingly. Also set `storageMode: "firebase"`.

### Step 4 — Enable anonymous authentication

> The app uses *anonymous* sign-in (no logins for your friends — they just open the link). We need to flip the switch:
>
> 1. In the left sidebar, click **Build** → **Authentication**.
> 2. Click **Get started**.
> 3. On the "Sign-in method" tab, scroll to **Anonymous** and click it.
> 4. Toggle it **Enable** → **Save**.

Pause. Confirm: "Is Anonymous showing as 'Enabled' in your sign-in providers list?"

### Step 5 — Deploy security rules

> Right now your database is in **test mode** — anyone can read or write to it (bad for the long run). Let's apply proper rules.
>
> 1. Open the file `firestore.rules` in this folder.
> 2. **Copy all of it** (Cmd+A, Cmd+C on Mac; Ctrl+A, Ctrl+C on Windows).
> 3. Back in the Firebase Console, go to **Firestore Database** → **Rules** tab.
> 4. **Delete what's there** and paste in the file content.
> 5. Click **Publish**.

Pause. Ask: "Did you see a green 'Rules published successfully' message?"

If they're comfortable with the terminal, offer the Firebase CLI alternative:
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

### Step 6 — Test the connection

> Let's make sure the app can talk to your new Firebase project. Open `index.html`:
> ```bash
> open index.html
> ```
>
> - Open the **browser's developer console** (right-click → Inspect → Console tab).
> - You should NOT see any red errors. If you do, copy them and tell me — I'll diagnose.
> - The app should load with your league name at the top.

If the console is clean, return to `getting-started.md` Step 6 (admin password). Otherwise, invoke [troubleshoot](troubleshoot.md).

---

## Common issues

| Symptom | Fix |
|---|---|
| "Permission denied" on data read/write | Rules not deployed, or Anonymous auth not enabled |
| App shows "Firebase mode is selected but firebaseConfig is missing" alert | One of the 6 config values is still empty — re-check |
| Console error "Failed to load resource: 400" | Firestore not enabled in this project, or wrong projectId |
| Console error about API key | apiKey copy was incomplete (the AIzaSy... string was cut off) |

---

## Rules

- **Always confirm "yes, I'm at the X page" before describing the next click.** Firebase's UI changes; you want the user to ground their position before you give the next instruction.
- **Never skip enabling Anonymous auth.** It's the #1 thing people forget; without it, the app silently fails to read/write.
- **Always paste back the final `config.js` for the user to see.** Lets them double-check no typo.
