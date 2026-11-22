# Lensy Experiment: One Change at a Time

**Owner:** Joseph Fajen
**Created:** 2026-11-21 · **Target:** before the Rakesh meeting, Mon 2026-11-23 (morning)
**Part of:** [WAY-FORWARD.md](WAY-FORWARD.md) Stage 3 (Snapshot B), done in steps so we can tell which change moved which score
**Results live in:** `~/git/agentic-coding-v2-companion-eval/experiments/lensy-incremental/LOG.md`

---

## Goal

Add three agent-friendly changes to the live site, **one at a time**, and measure each with Lensy (and AFDocs) before starting the next. For each change we record what we predicted, what actually happened and what we learned about Lensy.

**Two outcomes:**
1. **Score impact, change by change.** A table showing what each change was worth on the live site.
2. **Learnings.** Where Lensy's guidance was right, wrong or unclear. That's design-partner feedback for Rakesh and material for the case study.

## Baseline (2026-11-21, Lensy 0.3.0)

The live site has the same content as Snapshot A and scores the same: Coding agents **59** (capped, since the checks add up to 66), AI search **80** on 33 normal pages and 49–67 on the 3 "page has moved" stubs. Raw reports: `~/git/agentic-coding-v2-companion-eval/results/lensy-2026-11-21/`.

## Scope

| In | Out (still in Stage 3, done later) |
|---|---|
| `llms.txt` (via `starlight-llms-txt`) | `public/robots.txt` |
| An `llms.txt` pointer on every page | Per-page `.md` endpoints |
| `lastmod` / freshness dates | Content negotiation |
| | Fixing the moved-page stubs (a content/IA change, saved for C) |

**No changes to `src/content/`.** Every change is config, a component override or a CI change. The Stage 3 rule still holds: `git diff snapshot-a-human-only HEAD -- src/content` must be empty.

## Rules

- **Never touch Snapshot A** (the classic repo, its tag or its URL). It's the control group.
- **One change per commit, one deploy per change.** Never change two things between Lensy runs.
- **Write the prediction down before measuring.** Log it before the run, not after.
- **Joe approves every push to `main`.** Pushing to `main` deploys the live site.
- **Use the same Lensy setup every time.** Pin the version (see Protocol). If Lensy updates during the experiment, re-run the baseline with the new version before comparing.
- **Don't tag `snapshot-b-agent-tooling` yet.** That waits until all of Stage 3 is done. Use the commit SHAs for now.
- `npm run build` must pass before every commit.
- **Rollback:** each step is one commit, so `git revert <sha>` and push.

---

## Protocol (every measurement)

Run from the eval repo, **never from inside a site repo** (Lensy offers to create `.lensy/` there).

```bash
cd ~/git/agentic-coding-v2-companion-eval
./scripts/measure.sh <run-label>      # e.g. step1-llms-txt
```

`measure.sh` (written in Step 0) does the same thing every time:
1. Rebuilds the page list from the live `sitemap-0.xml`
2. Runs `npx @perseverance-ai/lensy@0.3.0 check --urls-file urls.txt --concurrency 3 --html --md --json` → `experiments/lensy-incremental/<run-label>/`
3. Runs `npx --package=afdocs@0.23.0 afdocs check <site URL>` → same folder
4. Writes `summary.txt`: how many pages got each score, plus every check that changed status since the last run

> **This session's command hook rewrites `npx` and breaks the arguments.** Inside Claude Code, run the script as `rtk proxy ./scripts/measure.sh …`, or call `rtk proxy npx …` inside the script.

**Before each run, check the deploy is live:** `gh run list -L 1` shows success, and the new file (or the change) is visible with `curl`.

---

## Steps

### Step 0. Set up tracking
- [ ] Done

- [ ] `git init` the eval folder (`~/git/agentic-coding-v2-companion-eval`) and commit the existing `results/` (Stage 1 calls for this repo anyway)
- [x] Check that `@perseverance-ai/lensy@0.3.0` can be installed by its exact version. Confirmed 2026-11-21: 0.3.0 is both `latest` and `next`
- [ ] Write `scripts/measure.sh` as described in Protocol
- [ ] Create `experiments/lensy-incremental/LOG.md` using the template at the bottom of this doc
- [ ] Run `measure.sh step0-baseline` against the live site and confirm it matches the Nov 21 numbers (59 / 80)
- [ ] Commit in the eval repo

**Done when:** the baseline run is logged, it matches the Nov 21 numbers, and the eval repo has its first commit.

### Step 1. `llms.txt`
- [ ] Done

**Prediction (write in the LOG before measuring):**
- *If Lensy finds the file:* the 59 cap goes away and `llms-txt-exists` (+10) passes. The four `llms.txt` checks that are skipped today (valid, size, links resolve, links are Markdown) start running, so the final Coding agents number may land well above or below 69. AI search shouldn't change.
- *If Lensy doesn't find it:* nothing changes, which confirms that `/agentic-coding-v2-companion/llms.txt` isn't one of the places Lensy looks (feedback item #1). Check whether AFDocs finds it.

**Do:**
- [ ] Reapply `starlight-llms-txt` from the `ai-agent-friendly` branch: the import and the `starlightLlmsTxt()` plugin in `astro.config.mjs`, plus the `package.json` dependency. Use the current version and check its changelog for base-path behavior
- [ ] `npm run build`. Check `dist/llms.txt` exists (and `llms-full.txt` / `llms-small.txt`, if the plugin makes them), and that its links include `/agentic-coding-v2-companion/`
- [ ] Commit: `feat(agents): add llms.txt via starlight-llms-txt`
- [ ] **Joe approves → push → wait for the deploy**
- [ ] Live check: `curl -sI https://joseph-fajen.github.io/agentic-coding-v2-companion/llms.txt` → 200
- [ ] `measure.sh step1-llms-txt`
- [ ] Log the result, the SHA and what we learned

**Done when:** `llms.txt` returns 200 on the live site and the Step 1 entry in the LOG is complete.

### Step 2. `llms.txt` pointer on every page
- [ ] Done

**Prediction:** `llms-txt-directive-html` passes (+7 Coding agents). `llms-txt-directive-md` stays failing because there are no `.md` pages yet. AI search shouldn't change. Note any change to `content-start-position`: the pointer goes at the top of each page, and that check penalizes content that starts low.

**Do:**
- [ ] Look up the current Starlight way to override a component (likely `PageFrame` or `Header`, set in `components` in `astro.config.mjs`)
- [ ] Add a visually hidden element at the top of `<body>` (not `display:none`), for example: "For AI agents: a documentation index is at `<base>/llms.txt`." Build the link from `import.meta.env.BASE_URL` so the base path is right
- [ ] Check that it stays hidden on screen, that screen readers handle it sensibly (consider `aria-hidden`, or reword it so it makes sense read aloud) and that the page looks unchanged
- [ ] `npm run build`; check a built page's HTML contains the link near the top
- [ ] Commit: `feat(agents): add llms.txt pointer to every page`
- [ ] **Joe approves → push → wait for the deploy**
- [ ] `measure.sh step2-llms-pointer`
- [ ] Log the result, the SHA and what we learned

**Done when:** a live page's HTML has the pointer, the page looks the same, and the Step 2 entry in the LOG is complete.

### Step 3. Freshness dates (`lastmod`)
- [ ] Done

Two parts. Measure after 3a, and do 3b only if `S4 Freshness declared` is still failing.

#### 3a. A visible "Last updated" date from git
**Prediction:** if Lensy reads the visible date, S4 passes (+15 AI search, 80 → 95). If it only trusts the sitemap or JSON-LD, nothing changes. Either answer tells us something.

- [ ] Turn on Starlight's `lastUpdated: true` in `astro.config.mjs`
- [ ] In `.github/workflows/deploy.yml`, add `with: fetch-depth: 0` to the `actions/checkout` step. Without it the deploy only has the latest commit, so every page gets the same date
- [ ] `npm run build`; check pages show different, sensible dates
- [ ] Commit: `feat(agents): show last-updated dates from git history`
- [ ] **Joe approves → push → wait for the deploy**
- [ ] Live check: two pages with different histories show different dates
- [ ] `measure.sh step3a-last-updated`
- [ ] Log the result, the SHA and what we learned

#### 3b. Per-page `<lastmod>` in the sitemap (only if S4 still fails)
**Prediction:** S4 passes. Watch the "distinct dates" count in the S4 finding. One date stamped on every URL may score worse than real per-page dates.

- [ ] Look up how to get a per-page `lastmod` with Starlight's built-in sitemap (it may mean adding `@astrojs/sitemap` yourself with a `serialize` function that reads each page's git date)
- [ ] Use **real per-page git dates**, not the build date
- [ ] Build; check `dist/sitemap-0.xml` has a `<lastmod>` on every URL with more than one distinct date
- [ ] Commit, **Joe approves → push → wait for the deploy**, `measure.sh step3b-sitemap-lastmod`, log it

**Done when:** S4 passes (or we've logged why it can't yet), and the Step 3 entries in the LOG are complete.

### Step 4. Wrap up before Monday
- [ ] Done

- [ ] Fill in the **Summary table** in the LOG: baseline → each step → final, for both scores
- [ ] Update the Rakesh briefing (`obsidian-second-brain/memory/knowledge/briefings/rakesh-lensy-meeting-briefing-2026-11-23.md`): replace "Be upfront about" with real numbers, and confirm or drop each feedback item using what we saw
- [ ] Copy the final HTML report somewhere easy to screen-share
- [ ] Add a line to the WAY-FORWARD progress log: Stage 3 partly done, with the SHAs and what's left (robots.txt, `.md` endpoints)
- [ ] Commit the eval repo

**Done when:** the briefing has real before/after numbers and both repos are committed.

---

## LOG template

Copy this into `experiments/lensy-incremental/LOG.md`.

```markdown
# Lensy incremental experiment: log

Site: https://joseph-fajen.github.io/agentic-coding-v2-companion/
Tools: Lensy <version>, AFDocs 0.23.0
Plan: ~/git/agentic-coding-v2-companion/LENSY-EXPERIMENT.md

## Summary

| Run | Commit | Coding agents (normal / stubs) | AI search (normal / stubs) | AFDocs pass/fail/skip |
|---|---|---|---|---|
| step0-baseline | b3c8dbf | 59 / 59 | 80 / 49–67 | 11/6/11 |
| step1-llms-txt | | | | |
| step2-llms-pointer | | | | |
| step3a-last-updated | | | | |
| step3b-sitemap-lastmod | | | | |

## Step N: <name> · YYYY-MM-DD

- **Commit:** `<sha>`
- **Prediction (written before the run):**
- **Result:** scores, and which checks changed status (from summary.txt)
- **Matched the prediction?** yes / partly / no
- **Surprises / learnings:**
- **Feedback for Rakesh:** (if any)
```
