# Way Forward: Two-Week Stage Plan

**Owner:** Joseph Fajen
**Created:** 2026-11-03 · **Revised:** 2026-11-03 to a 1–2 week timeline
**Window:** 10 working days. Day 1 = Wed Nov 4. The Rakesh meeting is Day 3 (Nov 6). Day 10 lands around Nov 13–17, depending on weekends.
**Standard:** react.dev/learn, for **form only**: structure, page template and teaching moves. The subject matter comes from Cole's course. See [GAP-ANALYSIS-REACT-DEV.md](GAP-ANALYSIS-REACT-DEV.md).
**Supersedes:** the ~3-month sequence in [PROJECT-BRIEF.md](PROJECT-BRIEF.md) and Days 6–7 of [PLAN.md](PLAN.md).

---

## What changes with two weeks

The brief planned ~3 months of mostly hand-written lessons. Two weeks only works if **agents draft lessons in parallel and gates check them**. Joe sets the direction and reviews every lesson, but writes only one: the exemplar.

- **Direction is locked by people, before any agent drafts anything.** That means decisions, the IA, the template and one hand-written exemplar lesson (Days 3–5). Loops polish; they don't set direction.
- **Every agent draft passes gates before Joe sees it.** In order: build, link check and template lint; running the examples; a fidelity check against the course source; and a form critic judging against react.dev.
- **The pilot asks a different question.** Old pilot: "can a gauntlet polish a lesson?" New pilot: "can a gated agent draft a lesson Joe accepts with light edits?" If it can't, the plan falls back to a smaller scope (see **Fallback**).
- **No separate polish passes.** The form critic in the drafting gate does that job.
- **Joe's review time is the bottleneck.** 35–45 lessons at ~15–20 minutes each is 10–13 hours over the two weeks. Plan for it.
- **Usage limits are the other constraint.** Plan on about one fan-out run per 5-hour usage window, and keep `/usage` in view.

---

## How to use this plan

1. Start a fresh session in this repo and say: **"Do the next unchecked stage in WAY-FORWARD.md."**
2. The session reads the **Session rules**, then only that stage's **Read** list.
3. Stop when the stage's **Done when** checks pass. Don't start the next stage in the same session.
4. Before ending: tick the box, add a line to the **Progress log**, and commit with Joe's OK.

A day usually holds 2–3 stages. If a stage runs long, split it: log what's finished, and add a "Stage N (continued)" line.

---

## Session rules (every session)

- **Never edit snapshot A.** That means the `agentic-coding-v2-companion-classic` repo, the `snapshot-a-human-only` tag, and its live URL. The same goes for any `snapshot-*` tag once it exists.
- **Never open the reader test** outside Stages 1, 2, 4 and 21. It lives outside this repo so writing sessions and drafting agents can't see it. Don't search for it.
- **Sourcing.** Every fact comes from `~/git/agentic-coding-course`: the v2 branch for scripts, the main branch for the KB and diagrams. Claude Code facts may cite the official docs. Don't invent numbers, timings or maturity claims. Every lesson has a **claims ledger** (format in Stage 6).
- **react.dev is a form reference, not a content source.** Copy its structure and teaching moves. Never copy its wording or its examples.
- **Parallel drafting:** one agent per lesson file. Only the orchestrator edits `astro.config.mjs`, and it does so after the drafts are integrated.
- **No sends, no posts.** Messages to Cole, Rakesh or the community are drafts for Joe.
- `npm run build` must pass before any commit that touches `src/` or `astro.config.mjs`.

---

## Decisions

| # | Decision | Status |
|---|---|---|
| D1 | The site is a stated companion to Cole's course, with a raised bar | Final |
| D2 | **Snapshot C = restructured by any means, including agent drafting.** Now required by the timeline. The case study reports how much was agent-drafted and how much Joe edited. | Confirm in Stage 5 |
| D3 | Agent drafting runs through **gauntlet-mini**, bounded at 2 cycles per lesson, only after the Stage 10 pilot passes | Final |
| D4 | The reader test and the held-out questions live **outside this repo** | Final |
| D5 | Branches: `main` is live. B ships to `main`. C is built on a `restructure` branch and goes live in one cutover (Stage 20). | Confirm in Stage 5 |
| D6 | **Build B one change at a time, with a Lensy run after each.** B also gets freshness dates (`lastUpdated`, sitemap `lastmod`), which weren't in the original Stage 3. See [LENSY-EXPERIMENT.md](LENSY-EXPERIMENT.md). | Final (2026-11-21) |

---

## Schedule at a glance

| Day | Stages | Milestone |
|---|---|---|
| 1 | 0, 1, 2 | Plan on `main`; reader test locked; A measured |
| 2 | 3, 4 | B live and measured. **A vs B numbers ready for Rakesh** |
| 3 | 5 + Rakesh meeting | Decisions made |
| 4 | 6, 7 | IA and template locked; quick fixes live; skeleton builds |
| 5 | 8, 9, 10 | Exemplar lesson approved; pilot run; **go / fallback decision** |
| 6 | 11, 12 | Chapter 2 and chapter 1 drafted, gated and reviewed |
| 7 | 13, 14 | Get Started (tour, thinking, setup) and the tutorial |
| 8 | 15, 16, 17 | Chapters 3, 4 and 5 drafted, gated and reviewed |
| 9 | 18, 19, 20 | Reference, whole-path review, **cutover**: C is live |
| 10 | 21, 22 | C measured; case study and service page drafted; outreach drafted |

**One-week cut line:** If the window has to close after one week, stop after **Stage 14**. That leaves Get Started and chapters 1–2 restructured. Chapters 3–5 stay as the existing pages, moved into the new sidebar unchanged. Then run Stages 19–22 (skipping 18) on what exists.

---

## Days 1–2: Baseline (measure before changing anything)

### Stage 0. Land the planning docs on `main`
- [x] Done

**Do:**
- Commit this file on `docs/gap-analysis-react-dev`, merge it into `main`, and push. These are root-level docs only.
- In `CLAUDE.md` "Current Status", point to this plan. Mark PLAN.md as historical.
**Done when:** `git diff 4fab178 main -- src astro.config.mjs` is empty.

### Stage 1. Write and lock the reader-question test
- [ ] Done

**Read:** PROJECT-BRIEF.md (three-snapshot section), the course `README.md`, and the course phase folder names. Open individual scripts only to write answer keys.
**Do:**
- Create `~/git/agentic-coding-v2-companion-eval/` as its own private git repo.
- Write ~20 questions a course student would actually ask. Spread them across every chapter, setup/costs and V1 migration. Include 2–3 whose answers **aren't** on A today.
- Write an answer key; each answer cites a course source as `file:line`.
- Write the **protocol**: the agent and exact model id; what it gets (the base URL only, web fetch allowed, no course access); one fresh session per snapshot; the exact prompt wrapper.
- Write the **scoring**: correct / partial / wrong / **invented** / "not found". Count invented answers separately.
- Record the exact AFDocs command and version, and the Lensy steps.
- Commit and log the SHA here.
**Don't:** Look at the restructure sketch while writing questions.
**Done when:** The test is committed in the eval repo and the SHA is logged.

### Stage 2. Measure snapshot A
- [ ] Done

**Do:** Run AFDocs, Lensy and the reader test against `https://joseph-fajen.github.io/agentic-coding-v2-companion-classic/`.
**Output:** `results/snapshot-a.md` in the eval repo, with the raw outputs.
**Done when:** All three measurements are recorded with dates, tool versions and the model id.

### Stage 3. Build snapshot B (A + agent tooling) on `main`
- [ ] Done

> **In progress through [LENSY-EXPERIMENT.md](LENSY-EXPERIMENT.md)** (D6): `llms.txt`, the `llms.txt` pointer and freshness dates first, one change at a time. robots.txt and the `.md` endpoints come after.

**Read:** `git diff main...ai-agent-friendly` and `astro.config.mjs`.
**Do:**
- Start from `main`, whose content equals A. Don't merge the old branch, which was cut from an older base. Reapply `starlight-llms-txt` and `public/robots.txt`.
- **Add per-page `.md` endpoints.** starlight-llms-txt doesn't provide them. Research the current options and pick the simplest that works with the base path. Add content negotiation only if it's cheap.
- No content changes.
- Build, deploy, and verify live: `/llms.txt`, a sample page's `.md` URL, and `robots.txt`.
- Tag `snapshot-b-agent-tooling` and push the tag.
**Done when:** `git diff snapshot-a-human-only snapshot-b-agent-tooling -- src/content` is empty, and all three endpoints return content live.

### Stage 4. Measure B and prep for Rakesh
- [ ] Done

**Do:**
- Run the same three measurements on the live `main` URL.
- Write `results/a-vs-b.md`: the scores side by side and what moved.
- Draft 3–5 talking points for Rakesh. Include the two-week C plan as "what comes next".
**Done when:** The A vs B table and the talking points exist.

---

## Days 3–5: Lock direction, then pilot

### Stage 5. Decide the open questions (Day 3, around the Rakesh meeting)
- [ ] Done

**Read:** PROJECT-BRIEF.md (Open decisions), GAP-ANALYSIS §6b and §8, and the Decisions table above.
**Do:** Hold a short `/grill-me` session (timebox it to about 45 minutes) on:
1. **Audience:** one developer path with inline non-developer notes, or a separate track. At this speed, one path is far cheaper.
2. **Voice:** sharp throughout, or softened in Get Started.
3. **Practice project:** the AI Tutor, a new minimal project, or "your own repo". Check what the course exercises (`V11`, `V14`, `V16`, `V18`, `V20`, `V22`) assume. At this speed, prefer whatever the course exercises already use.
4. Confirm **D2** and **D5**. Fold in anything useful from the Rakesh meeting.

**Output:** `DECISIONS.md`. Update the brief's Open decisions.
**Done when:** All four are decided and written down.

### Stage 6. IA and lesson template (Day 4)
- [ ] Done

**Read:** GAP-ANALYSIS §3 (criteria 5–15), §6 and §6a; DECISIONS.md; CONTENT-ROADMAP.md (Tiers 1–2); the course phase folder names; and `https://react.dev/learn/responding-to-events.md`.
**Do:**
1. Write `IA.md`:
   - chapters and lessons in dependency order, each with a one-line reason
   - a **term ledger** (term → the lesson that introduces it)
   - an **old URL → new URL** map
   - a **course video → lesson** map
   - a file path, course sources and react.dev exemplar page for every lesson
   - which drafting batch (Stages 11–17) each lesson belongs to
2. Write `LESSON-TEMPLATE.md`:
   - sections in order (Intro, You will learn, body, Recap, Challenges, video link)
   - frontmatter, including explicit prev/next
   - one fixed job per callout
   - the Try it format (with an expected result and "broken first")
   - the challenge format (task, hint, solution, verify)
   - heading style, word range and voice rules
   - the **claims ledger** format (`ledgers/<slug>.md`: claim, type, source `file:line`)

**Done when:** Every course video maps to a lesson, every old URL maps to a new one, and the term ledger has no forward references.

### Stage 7. Foundation: quick fixes, checks, skeleton (Day 4)
- [ ] Done

**Read:** GAP-ANALYSIS §5, IA.md, LESSON-TEMPLATE.md and `astro.config.mjs`.
**Do:**
1. **On `main`:** make the gap-analysis §5 quick fixes (steering stubs, the 84%/46% stat, PIV vs R-PIV checked against the course, steering See also, README, compressing the two-loops PNG). Deploy.
2. **Cut the `restructure` branch from `main`.** Add a link checker (e.g. `starlight-links-validator`, current version). Write `npm run lint:lessons`; it fails on a missing template section, more than one H1, or missing prev/next or video link. Drafts are exempt.
3. **Skeleton:** the new sidebar from the IA, chapter folders, Astro `redirects` for every old URL, and draft stubs for lessons that don't exist yet. Move existing pages to their new paths unchanged.

**Done when:** The quick fixes are live on `main`. On `restructure`, the build and link check pass, every old URL resolves in a local preview, and the linter runs.

### Stage 8. Hand-write the exemplar: "Your first hook" (Day 5)
- [ ] Done

**Read:** LESSON-TEMPLATE.md, DECISIONS.md, the existing hooks page, and the course sources `phase_2/V21_the-hooks-primitive/script.md` and `phase_2/V22_hooks-exercise/` (v2 branch).
**Do:**
- Write the lesson to the template, with its claims ledger.
- Run every Try it command and the challenge solution in a scratch repo. The `.env` hook must actually block `.env`.
- Joe approves the lesson. **This is the voice and form every agent draft copies.** Tag `exemplar-v0`.
**Done when:** Joe has approved it, the build and lint pass, every ledger row is sourced, and the examples run.

### Stage 9. Pilot: one gated agent draft (Day 5)
- [ ] Done

**Read:** Appendix A and the gauntlet-mini skill.
**Do:**
- Pick one chapter 2 lesson that isn't Hooks; Rules is the default.
- Write 5–8 held-out comprehension questions for it in the eval repo, sourced from the course.
- Convert Appendix A with `/gauntlet-mini` (Convert mode), with the batch set to just that one lesson. Review the result with Joe, then run it at a 50% budget.
- The run writes `experiments/drafting-pilot/RUN.md`.
- Joe reviews the draft and times the review.
**Done when:** RUN.md exists with every verdict, the cost and the model per role, and Joe has finished reviewing.

### Stage 10. Go / fallback decision (Day 5)
- [ ] Done

**Do:** Score the pilot. **Go** if all of these hold:
1. Zero unsupported claims at the end, and the fidelity gate caught at least one claim it should have caught.
2. Build, link check and lint pass, and the examples run.
3. The form critic passes against react.dev in both orderings, losing no more than 2 criteria.
4. A blind critic can't reliably tell the agent draft from the exemplar on form and voice. The topics differ, but the site, template and voice are shared, so this is a fair blind test.
5. Joe's review took about 20 minutes or less, and he kept at least ~80% of the draft.
6. A newcomer agent (Haiku) solves the challenge using only the lesson, and answers the held-out questions.
7. The run's cost × the remaining lesson count fits inside the usage left in the window.

**Output:** `experiments/drafting-pilot/DECISION.md`, with a verdict of **go**, **adjust and re-run once**, or **fallback**. Update this plan to match.

---

## Days 6–9: Build snapshot C (on `restructure`)

**Each drafting stage (go path):**
1. Fill Appendix A with that batch's lessons from IA.md and run it. One worker per lesson file.
2. Integrate the drafts. Only the orchestrator edits `astro.config.mjs`.
3. Joe reviews every lesson and edits as needed.
4. The build, link check and lint pass, then commit.

Log Joe's edit rate per lesson; the case study needs it.

**Depth rule:** chapters 1–2 and the tutorial get Try it blocks and 2–3 challenges per lesson, with solutions that are actually run. Chapters 3–5 get coverage only (no challenges), per the brief.

- [ ] **Stage 11 (Day 6).** Chapter 2: the overview and the remaining lessons, at full depth
- [ ] **Stage 12 (Day 6).** Chapter 1: the overview and lessons, plus the Tier 1–2 topics, at full depth
- [ ] **Stage 13 (Day 7).** Get Started: Quick tour, Thinking in systems (merges three concept pages), Setup (with non-developer notes inline)
- [ ] **Stage 14 (Day 7).** Tutorial (setup → first CLAUDE.md → first PIV ticket → first "fix the system" change). It's tightly coupled, so use **one worker, not a fan-out**, and Joe reviews it closely. *— One-week cut line —*
- [ ] **Stage 15 (Day 8).** Chapter 3: four lessons of new writing from the Phase 3 Act 1 scripts, coverage only
- [ ] **Stage 16 (Day 8).** Chapter 4: split headless-sdk-ci, plus worktrees, workflow engines and cost discipline; coverage only
- [ ] **Stage 17 (Day 8).** Chapter 5: teams, orchestration, AI-native codebases, AI in CI; coverage only
- [ ] **Stage 18 (Day 9).** Reference: course map (from the IA video map), course skill catalog, slimmed glossary, costs

### Stage 19. Whole-path review (Day 9)
- [ ] Done

**Do:**
- Check that prev/next follows the path end to end.
- Check the term ledger: no term is used before it's introduced.
- Check that every lesson has a video link.
- Run one fresh-context persona review, like Pass 5, judging only against the rubric.
- Fix what it finds, or log what's deferred.

### Stage 20. Cutover (Day 9)
- [ ] Done

**Do:**
- Merge `restructure` → `main` and deploy.
- Verify live that a sample of old URLs redirects, and that `llms.txt` and the `.md` endpoints reflect the new IA.
- Tag `snapshot-c-restructured`.

---

## Day 10: Measure and publish

### Stage 21. Measure snapshot C
- [ ] Done

**Do:** Run the same three measurements under the same protocol and model, then write `results/a-b-c.md`. If the model has changed since Stage 2, rerun A and B on the new model too.

### Stage 22. Case study, service page, outreach drafts
- [ ] Done

**Do:**
- Draft the case study from the results, DECISIONS.md, `experiments/`, the per-lesson edit rates and the Progress log. Cover the steps in order with their numbers, the fidelity-gate catches, and how many lessons were agent-drafted and how much Joe edited.
- Draft the one-page service description. Choose the buyer profile now (brief, open decision 5).
- Draft the messages to Cole and the Dynamous community. Joe sends them.

---

## What two weeks drops (deliberately)

- **Reader feedback round.** It has to wait for readers. Do it after Cole and the community respond.
- **A buyer conversation or design partnership.** Rakesh on Day 3 is the start; follow-up is outside the window.
- **Challenges on chapters 3–5.** These were already out of scope in the brief.
- **Separate polish runs** after drafting. The form critic in the drafting gate covers polish.
- **A human-only C.** A "structure without agents" measurement isn't possible. The case study reports agent drafting openly instead (D2).

## Fallback (if Stage 10 says fallback)

Joe writes with a single agent helping, with no fan-out, and the scope shrinks:
- **Days 6–8:** chapter 2, chapter 1 and the Get Started tour plus Setup, with depth.
- **Chapters 3–5:** the existing pages, moved into the new sidebar with the template's Intro and Recap added. No new writing.
- **Days 9–10:** Stages 19–22 as written.

Name the gaps in the case study as conscious tradeoffs.

---

## Appendix A: Drafting prompt (Stages 9, 11–17)

Fill in the bracketed placeholders from IA.md for each batch. Convert it with `/gauntlet-mini` (Convert mode) the first time; reuse it for later batches.

```text
Outcome
Draft these lessons for the Agentic Coding V2 Companion: [LESSON LIST with file path,
course sources and react.dev exemplar page for each, from IA.md]. Each must follow
LESSON-TEMPLATE.md, match the voice and form of the approved exemplar
src/content/docs/[EXEMPLAR_PATH] (tag exemplar-v0), and contain only facts traceable to
the course.

Depth: [FULL = Try it blocks with expected results + 2–3 challenges with hint, solution,
verify | COVERAGE = Intro, You will learn, body, Recap, video link].

References
- Form bar: each lesson's react.dev exemplar, fetched as .md. Never work from memory.
- Rubric: GAP-ANALYSIS-REACT-DEV.md §3, criteria 5–15. Terms: IA.md term ledger. A lesson
  may only use terms introduced by earlier lessons.
- Source of truth: ~/git/agentic-coding-course (v2 branch scripts, main-branch KB and
  diagrams). Claude Code facts may cite official docs. Existing site pages may be reused
  only where their claims re-verify against the course.

Constraints
- One worker per lesson file; each worker edits only its lesson and ledgers/[slug].md.
  Only the orchestrator touches astro.config.mjs, after integration.
- No claim without a ledger row. Don't invent numbers, timings or maturity claims.
- Never touch any snapshot tag, the -classic repo, or the eval repo.
- Stay within [BUDGET]% of the remaining session limit. No commits or pushes.

Orchestration
Workers: Sonnet for coverage lessons, Opus for full-depth lessons. Evaluators get fresh
context and only what their check needs:
1. Deterministic: npm run build; link check; npm run lint:lessons; for full-depth lessons,
   execute every Try it command and solution in a scratch repo against stated results.
2. Fidelity checker (Opus; lesson + ledger + course repo only): verify every ledger row and
   flag any claim missing from the ledger. Any unsupported claim → BLOCKED; skip step 3.
3. Form critic (Sonnet; lesson + its react.dev exemplar only, told nothing about accuracy
   or the course), run twice with X/Y order swapped; count only picks that agree:
   "Two lessons from different programming courses, X and Y, teach different subjects.
   Ignore subject matter and correctness; judge only how well each teaches its own topic
   to a reader new to it. For each criterion answer X or Y (no ties), quote the deciding
   passage, and commit before moving on: (5) intro → outcomes → body → recap → practice
   shape; (6) motivation in ≤4 sentences, core term defined; (7) 3–6 concrete 'how to'
   outcomes; (8) runnable examples with a stated expected result, including a broken one;
   (9) practice with graduated hints and worked solutions; (10) callouts with one clear job
   each; (11) one concept, sized to difficulty; (12) task-phrased headings, specific
   second-person voice; (13) every term defined before use; (14) analogies or visuals where
   words fall short; (15) level differences handled inline. Then: which page's structure
   would you copy for a new lesson? Name the single biggest gap in the loser."
   For coverage-depth lessons, skip criteria 8–9.
   Pass: ours wins "which would you copy" in both orders and loses no more than 2 criteria.
Verdicts use PASS / REVISE / BLOCKED + evidence + smallest required fix.
[PILOT ONLY: 4. A blind Opus critic gets the draft and the exemplar, unlabelled, and
guesses which was hand-written, in both orders. 5. A Haiku newcomer agent solves the
challenge using only the lesson, then answers [HELD_OUT_QUESTIONS_PATH].]

Loop
Up to 2 revision cycles per lesson, each fixing the single biggest gap named. A lesson
still failing after 2 cycles goes to Joe flagged, not hidden.

Final response and record
Write experiments/[RUN_NAME]/RUN.md: the prompt, budget used, model per role, every verdict
verbatim, fidelity catches, and per lesson: cycles used and final status. Lead with a table
of lessons × gate results.
```

---

## Progress log

One line per session: `YYYY-MM-DD · Stage N · commit · note for the next session`

- 2026-11-03 · Plan created, then revised to two weeks · 02025ba · Next: Stage 0.
- 2026-11-03 · Stage 0 · see `git log -1` on main · Planning docs fast-forwarded onto `main` (no `src/` changes); CLAUDE.md points here; PLAN.md marked historical. Next: Stage 1 (reader test, in a fresh session).
