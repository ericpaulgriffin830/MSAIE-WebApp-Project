# Git Workflow — three repos, one codebase

Quantic requires **each** group member to submit their **own** GitHub repo containing the full
source, with `quantic-grader` added as a collaborator. But we do **not** maintain three separate
codebases. The model:

> **Rob's repo = the shared source of truth** where all three of us build together.
> **Each member's own repo = a mirror** we push the final code to for grading.

You develop against Rob's repo (`origin`) and mirror to your own repo (`mine`).

```
        build together                      mirror for grading
  ┌──────────────────────────┐        ┌───────────────────────────┐
  │  origin = Rob's repo      │  ───▶  │  mine = your own repo      │
  │  Rob-Ottogalli/…          │        │  <you>/MSAIE-WebApp-Project │
  └──────────────────────────┘        └───────────────────────────┘
```

---

## One-time setup (each member)

1. **Create your own repo** (private) and add the grader:
   ```bash
   gh repo create MSAIE-WebApp-Project --private
   gh api -X PUT repos/<your-username>/MSAIE-WebApp-Project/collaborators/quantic-grader
   ```
   (Or on github.com: New repo → Private; then Settings → Collaborators → add `quantic-grader`.)

2. **Get a working clone** and point it at both remotes:
   ```bash
   git clone https://github.com/Rob-Ottogalli/MSAIE-WebApp-Project.git
   cd MSAIE-WebApp-Project
   git remote add mine https://github.com/<your-username>/MSAIE-WebApp-Project.git
   git push mine main        # seed your repo with the current main
   ```

`git remote -v` should now show `origin` (Rob's) and `mine` (yours).

---

## Daily workflow

```bash
git pull origin main                 # get everyone's latest
git checkout -b feature/<short-name>  # optional: work on a branch for bigger changes
# ...do your work...
git add -A
git commit -m "clear message"
git push origin <branch or main>     # share with the team
git push mine main                   # mirror to YOUR repo for grading
```

For anything that touches shared files or interfaces, push a **branch** and open a PR so the
team can review before it hits `main`:
```bash
git push origin feature/<short-name>
gh pr create --repo Rob-Ottogalli/MSAIE-WebApp-Project --base main --head feature/<short-name>
```

---

## Before submission (each member)

```bash
git checkout main
git pull origin main       # make sure you have the final merged code
git push mine main         # final mirror to your repo
```

Then confirm on your repo:
- [ ] Full source present (frontend + backend)
- [ ] `README.md`, `ai-tooling.md` present
- [ ] `quantic-grader` is a collaborator (Settings → Collaborators)

The submission PDF lists **all three** repo links:
- Chris — https://github.com/cmccoy2008/MSAIE-WebApp-Project
- Rob — https://github.com/Rob-Ottogalli/MSAIE-WebApp-Project
- Eric — _repo TBD_ (`ericpaulgriffin830`)

---

## Attribution tip
Make sure your commit email is one that's registered to your GitHub account
(GitHub → Settings → Emails), so your commits link to your profile and graders can see each
member's contributions. Check with `git config user.email`.
