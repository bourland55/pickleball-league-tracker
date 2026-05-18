# Useful Prompts

Copy-paste these into Claude Code when this folder is open. They cover the most common tweaks and customizations.

---

## Setup & branding

```
Let's get started.
```
Triggers the [getting-started](../.claude/skills/getting-started.md) wizard — full setup from scratch.

```
Change the brand color to <color name or hex>.
```
Updates `config.js` and shows you the new look on reload.

```
Generate a logo for my league. It should be <describe vibe — e.g. "minimalist, modern, single-color sage green, transparent background">.
```
Uses Claude's image generation to create a logo and saves it to `assets/logo.png`.

```
Rename my league from "Old Name" to "New Name".
```

```
Add an external link in the header — label "Rules", URL "https://docs.google.com/document/d/your-doc-id".
```

```
Switch to multi-user mode (Firebase).
```
Walks through Firebase setup if you haven't done it yet.

```
Switch back to solo mode.
```

---

## Players & weeks

```
Add a new player named "<name>" to the roster.
```

```
Remove player "<name>" from the roster.
```
(Will warn if they have historical scores attached.)

```
Reset the current week back to setup mode (I want to redo the roster).
```

```
Show me how to set up week 1 — walk me through every click in the app.
```

```
Reset the entire season. Keep all the historical week results, just zero out the current standings.
```

---

## Scoring

```
Change the winning score from 11 to <number>.
```

```
Let me record a score that was already played retroactively — explain the steps in the Admin tab.
```

```
Export this week's results as a CSV file I can paste into Excel.
```

---

## Deployment

```
Deploy this to tiiny.host.
```

```
Help me put this on GitHub Pages — I have a GitHub account.
```

```
Set up a custom subdomain on my deployed site.
```

```
I deployed it but my friends are getting "permission denied" errors — fix it.
```

---

## Customization (bigger changes)

```
Add a new tab called "<name>" that shows <what>. Put it between <tab> and <tab>.
```

```
Add a "Tournament Bracket" page that takes the top 4 from the leaderboard and shows a single-elimination bracket.
```

```
Add a player photo upload feature — let me put a face next to each name in the roster.
```

```
Add an SMS reminder feature that texts players the night before each session.
```
(Bigger feature — Claude will scope it and warn about external service costs.)

```
Make the app a PWA so we can add it to our phone home screens like a real app.
```

---

## Maintenance & debugging

```
Something's broken — help me figure out what.
```
Triggers the [troubleshoot](../.claude/skills/troubleshoot.md) skill.

```
Scores aren't saving for my friends — debug it.
```

```
The Admin password isn't working — I forgot what I set.
```

```
Check the audit log — show me all the score edits from this season.
```

```
Update the app to the latest version of the template (preserve my config.js and logo).
```

---

## Migrating data

```
I have a spreadsheet of past results — import them into the season history.
```

```
Export everything (players, weeks, results, audit log) as a JSON file I can back up.
```

```
I'm moving from solo mode to multi-user mode — migrate my local data into Firebase.
```

---

## Tips for great prompts

- **Be specific.** "Add a tab" → vague. "Add a tab called 'Playoffs' between Season and Admin that shows the top 4 players in a single-elimination bracket" → great.
- **Reference files with @.** Example: `@config.js` so Claude reads the file directly.
- **Say "plan first."** For bigger changes: *"Plan how you'd add a playoff bracket before writing any code."* That triggers `/plan` mode — Claude researches and proposes before touching anything.
- **Mention what NOT to do.** Example: *"Don't change the existing scoring rules — only add the bracket."*
- **Show what success looks like.** *"After this, I should see a Playoffs tab with the top 4 names from the current standings."*
