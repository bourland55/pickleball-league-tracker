# Deployment Options

Three ways to put this on the internet so your league can use it on their phones. Listed easiest to fanciest.

> **Easier:** Open this folder in Claude Code and say *"deploy"*. The [deploy](../.claude/skills/deploy.md) skill walks you through it.

---

## 🚀 Option A — tiiny.host (recommended for most)

**Why:** Free, no account needed for testing, takes 30 seconds.

1. Go to **[tiiny.host](https://tiiny.host)**.
2. Drag the entire `pickleball-league-tracker` folder onto the upload zone. (tiiny zips it for you.)
3. Pick a subdomain name like `my-league.tiiny.site`.
4. Click **Launch**.
5. **Copy the URL** — that's what you share with your league.

**Trade-offs:**
- ❌ Updates require re-uploading the folder.
- ❌ Custom subdomain (`yourname.tiiny.site`) is paid; default is a random URL.
- ❌ Free tier may show ads.

**Firebase mode users:** After deploying, add your `.tiiny.site` URL to Firebase Console → Authentication → Settings → Authorized domains. Otherwise the app will show "permission denied" errors.

---

## 📦 Option B — GitHub Pages

**Why:** Free, version-controlled (every change is tracked), professional. Best if you'll keep tweaking.

**Prereqs:** A GitHub account, `git` installed (`git --version` to check).

### Fast path (with `gh` CLI)

```bash
cd /path/to/pickleball-league-tracker
git init
git add .
git commit -m "Initial setup"
gh repo create my-league --public --source=. --push
gh repo edit --enable-pages --pages-branch main
```

Your URL: `https://<username>.github.io/my-league/`

### Manual path

1. Create a new repo at **[github.com/new](https://github.com/new)** — pick **Public**, don't initialize with anything.
2. In your terminal, from the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial setup"
   git remote add origin https://github.com/<USERNAME>/<REPO>.git
   git branch -M main
   git push -u origin main
   ```
3. On the repo page on GitHub: **Settings** → **Pages** → **Source**: **Deploy from a branch** → **main** → **/ (root)** → **Save**.
4. Wait ~1 minute. Your URL: `https://<username>.github.io/<repo>/`.

To update later:
```bash
git add .
git commit -m "Update branding"
git push
```
Changes go live in ~30 seconds.

**Trade-offs:**
- ✅ Free forever
- ✅ Custom domain support
- ❌ Requires Git knowledge
- ❌ Updates take ~30s to propagate
- ⚠️ Public repo means your `config.js` is visible. If you have `firebaseConfig` in there, it's exposed — but Firebase API keys are *not secrets*; they only authorize requests, and your security rules are what actually gate access. Still, you might want to keep `config.js` out of the repo (add it to `.gitignore`) and document the values separately for collaborators.

**Firebase mode users:** Add `<username>.github.io` to Firebase Authentication → Settings → Authorized domains.

---

## ▲ Option C — Vercel

**Why:** Polished hosting with deploy previews. Free tier is generous.

**Prereqs:** A Vercel account (sign up free at [vercel.com](https://vercel.com) — GitHub login works).

### With CLI

```bash
npm install -g vercel
cd /path/to/pickleball-league-tracker
vercel
```
Answer the prompts (project name, accept defaults). Get a URL in ~30s.

### Without CLI (web upload)

1. Sign in at [vercel.com](https://vercel.com).
2. Click **Add New** → **Project**.
3. Either import from GitHub (need to push first — see Option B steps 1-2) or drag-and-drop the folder.
4. Click **Deploy**.

**Trade-offs:**
- ✅ Free
- ✅ Custom domains free
- ✅ Auto-deploy when you push to GitHub
- ❌ Requires Vercel account
- ❌ Slightly more complex first-time setup

**Firebase mode users:** Add your `*.vercel.app` URL to Firebase Authentication → Settings → Authorized domains.

---

## 🏠 Option D — Local only

You don't have to deploy. Just open `index.html` in your browser and use it locally.

- ✅ Zero setup
- ❌ Only works on this one computer (or shared via local network with some plumbing)
- ❌ If you picked `storageMode: "local"`, friends can't see your scores even if they connect to your computer — localStorage is per-browser-per-device

This is fine for testing or for a single score-keeper who'll be the only one entering data.

---

## Side-by-side comparison

| | tiiny.host | GitHub Pages | Vercel | Local |
|---|---|---|---|---|
| **Setup time** | 30s | 5min | 2min | 0s |
| **Cost** | Free | Free | Free | Free |
| **Account needed** | No (paid for custom subdomain) | Yes | Yes | No |
| **Custom domain** | Paid | Free | Free | N/A |
| **Updates** | Re-upload | `git push` | `git push` | Edit + refresh |
| **Best for** | Try it, one-off | Long-term hobby | Polished launches | Testing |

---

## Tips for sharing with your league

Once deployed, get the URL into people's hands:

1. **Pin it in your group chat** (WhatsApp, iMessage, Discord, Slack).
2. **Add to phone home screen** — on iOS: Safari → Share → Add to Home Screen. On Android: Chrome → menu → Add to Home screen. This makes the URL launch like a native app.
3. **Bookmark on your computer** for quick access.
4. **Print a QR code** of the URL for a clubhouse bulletin board — [qr-code-generator.com](https://www.qr-code-generator.com) is free and easy.

---

## Updating after deploying

| Host | How to update |
|---|---|
| tiiny.host | Re-upload the folder. (Pro tip: keep a "live" subdomain and a "staging" subdomain to test changes safely.) |
| GitHub Pages | `git add . && git commit -m "your message" && git push` |
| Vercel | Same as GitHub Pages if linked, OR `vercel --prod` from CLI |
