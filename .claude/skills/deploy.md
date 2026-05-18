---
name: deploy
description: Help the user deploy the Weekly Games app to a public URL. Walks through tiiny.host (easiest), GitHub Pages (free + version-controlled), or Vercel. Trigger phrases include "deploy", "publish", "put it online", "share with my league".
---

You help the user pick a deployment target and walk through it. Recommend tiiny.host first for non-coders; only escalate to GitHub Pages / Vercel if they ask.

---

## Workflow

### Step 1 — Recommend

> Now let's get this on the internet so your league can use it from their phones. Three options, easiest to fanciest:
>
> **🚀 tiiny.host** (recommended for most people) — Drag the folder, get a public URL. **30 seconds, free, no account on day one.**
>
> **📦 GitHub Pages** — Free, version-controlled, professional. Best if you'll keep tweaking the app. Requires a GitHub account.
>
> **▲ Vercel** — Polished platform with previews. Requires a Vercel account, slightly more setup.
>
> Which one?

### Branch A — tiiny.host

> 1. Open [https://tiiny.host](https://tiiny.host) in your browser.
> 2. **Drag the entire `pickleball-league-tracker` folder** onto the upload zone. (Just the folder — tiiny will zip it for you.)
> 3. Pick a **subdomain** for your URL. Something like `my-league.tiiny.site`.
> 4. Click **Launch**.
> 5. Copy the URL — that's your league's link!

After they share the URL, help them save it somewhere safe (suggest: pin in a group chat, bookmark, add to phone home screen as a PWA shortcut).

**Important note for tiiny.host + Firebase mode:**
> Firebase only accepts requests from domains you've whitelisted. After deployment:
> 1. Go to Firebase Console → Project Settings → "Your apps" → web app
> 2. Click the link to **Authentication** → **Settings** → **Authorized domains**
> 3. Add your `.tiiny.site` URL to the list

### Branch B — GitHub Pages

Prereqs: `git` installed (check with `git --version`), GitHub account.

If `gh` CLI is installed, the fast path:
```bash
cd "/Users/david.bourland/Desktop/Claude Code/pickleball-league-tracker"
git init
git add .
git commit -m "Initial setup"
gh repo create <repo-name> --public --source=. --push
gh repo edit --enable-pages --pages-branch main --pages-path /
```

Otherwise the manual path:
> 1. Create a new repo at [https://github.com/new](https://github.com/new) — pick "Public," don't initialize with anything.
> 2. In Terminal (from your project folder):
>    ```bash
>    git init
>    git add .
>    git commit -m "Initial setup"
>    git remote add origin https://github.com/<your-username>/<repo-name>.git
>    git branch -M main
>    git push -u origin main
>    ```
> 3. On the repo page on GitHub, go to **Settings** → **Pages** → **Source**: pick **Deploy from a branch** → **main** → **/ (root)** → **Save**.
> 4. Wait ~1 minute. Your URL will be `https://<username>.github.io/<repo-name>/`.

**Important for GitHub Pages + Firebase mode:** Add the `<username>.github.io` domain to your Firebase Authentication → Settings → Authorized domains.

### Branch C — Vercel

If `vercel` CLI is installed:
```bash
cd "/Users/david.bourland/Desktop/Claude Code/pickleball-league-tracker"
vercel
```
Follow the prompts (pick the project name, hit Y for defaults).

Otherwise:
> 1. Sign up at [https://vercel.com](https://vercel.com) (free, GitHub login works).
> 2. Click **Add New → Project**.
> 3. Import from GitHub (need to push there first — see Branch B steps 1-2) OR drag-and-drop the folder.
> 4. Click **Deploy**. URL appears in ~30 seconds.

**Important for Vercel + Firebase mode:** Add the `*.vercel.app` domain (or your custom domain) to Firebase Authentication → Settings → Authorized domains.

### Step 2 — Smoke test on the live URL

> Open the URL on your phone. Verify:
> - The page loads
> - You see your league name + brand color
> - You can enter the Admin tab with your password
>
> If anything looks off, run `/troubleshoot`.

### Step 3 — Save & share

Help the user document where they deployed:

> Save your URL somewhere safe:
> - **Pin it in your league group chat**
> - **Add to your phone home screen** (mobile browser → Share → Add to Home Screen) so it acts like an app
> - **Bookmark on your computer**

---

## Comparison cheat-sheet

| Feature | tiiny.host | GitHub Pages | Vercel |
|---|---|---|---|
| Setup time | 30s | 5min | 2min |
| Cost | Free | Free | Free |
| Account needed | No (paid for custom subdomain) | Yes | Yes |
| Updates | Re-upload | `git push` | `git push` or CLI |
| Custom domain | Paid tier | Free | Free |
| Best for | Try it / one-off | Long-term hobby | Polished launches |

---

## Rules

- **Always remind them about Firebase authorized domains** when deploying with `storageMode: "firebase"`. This is the #1 post-deploy gotcha.
- **Don't push to a public GitHub repo** if the user has `storageMode: "firebase"` AND hasn't put `config.js` in `.gitignore`. The Firebase keys aren't *secret* (they're embedded in the HTML at runtime anyway) but it's polite to keep them out of public source control. If they push to a public repo, suggest they `.gitignore` `config.js` and commit `config.example.js` only.
- **Test on mobile before declaring done.** This is a phone app for the league — desktop testing isn't enough.
