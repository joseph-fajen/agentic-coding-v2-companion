# 7-Day Sprint Plan: Rakesh Meeting Prep

**Created:** 2026-10-30
**Deadline:** 2026-11-06 (Rakesh Pasupuleti meeting)
**Purpose:** Content development + AI-readiness comparison testing

---

## Context

Meeting with Rakesh Pasupuleti (creator of Lensy, an AI documentation auditor) to discuss being a design partner. Goal: have a real docs site to discuss, with before/after AI-readiness testing.

**Current state:**
- 34 pages live at https://joseph-fajen.github.io/agentic-coding-v2-companion/
- 5 adversarial review passes complete (accuracy, learnability, audience personas)
- AFDocs baseline: 11 passed, 6 failed, 11 skipped
- Git setup: `baseline-no-ai-features` tag, `ai-agent-friendly` branch (prototype)

**Full research context:** `~/git/obsidian-second-brain/memory/daily/2026-10-30-rakesh-lensy-research.md`

---

## The Plan

| Day | Focus | Work | Status |
|-----|-------|------|--------|
| **Day 1-2** | Tier 1: Two Loops + System Gap | Add foundational concepts from KB. Most referenced, currently missing. | Done |
| **Day 3** | Tier 1: Vibe Coding | The anti-pattern that frames everything. Quick win. | |
| **Day 4** | Polish: YELLOW fixes | Parallel worktrees "what breaks" list, headless-sdk-ci SDK names, sidebar redirect stubs | |
| **Day 5** | Fact verification | Browser: verify 44%/15% citation, cost figures, course pricing | |
| **Day 6** | AI-friendly rebuild | Fresh baseline tag, reapply AI features, run AFDocs comparison | |
| **Day 7** | Buffer / prep | Final polish, Rakesh talking points, run Lensy manually | |

---

## Day 1-2: Two Loops + System Gap

**Source:** `~/git/agentic-coding-course/knowledge-base/concepts/`
- `the-two-loops.md` — Inner loop (ships work) vs outer loop (improves system)
- `the-system-gap.md` — Why most developers plateau at "faster coding"

**Deliverables:**
- [x] New page: `src/content/docs/concepts/two-loops.md`
- [x] New page: `src/content/docs/concepts/system-gap.md`
- [x] Glossary entries for both concepts
- [x] Update CONTENT-ROADMAP.md checkboxes
- [x] Include `Excal-20-The-Two-Loops.png` and `Excal-2-System-Gap.png`

---

## Day 3: Vibe Coding

**Source:** `~/git/agentic-coding-course/knowledge-base/concepts/vibe-coding.md`

**Deliverables:**
- [ ] New page: `src/content/docs/concepts/vibe-coding.md` (or fold into system-gap)
- [ ] Glossary entry
- [ ] Update CONTENT-ROADMAP.md

---

## Day 4: YELLOW Fixes (from REVIEW-PLAN.md)

Priority items from Pass 5 findings:

- [ ] `parallel-worktrees.md`: Add "what breaks in real projects" list (shared databases, gitignoring worktrees folder, disk usage, failed integration merges)
- [ ] `headless-sdk-ci.md`: Name the SDK packages, link official docs, label Python sample as pseudocode
- [ ] Fix sidebar: "Steering (advanced rules)" links to redirect stubs instead of real `steering/*` pages
- [ ] Reconcile `steering/engineering.md` vs `steering/overview.md` on where commands live

---

## Day 5: Fact Verification

Requires browser access (not automatable):

- [ ] Verify 44%/15% figures against *Curse of Instructions* paper on OpenReview
- [ ] Verify plan prices in `costs.md` (course cost guide says $100/mo, install guide says ~$200/mo)
- [ ] Verify course pricing/membership on Dynamous page (currently no price stated in `start-here.md`)

---

## Day 6: AI-Friendly Rebuild

**Steps:**
1. Create fresh baseline tag (e.g., `baseline-v2-2026-11-05`)
2. Create new branch from that tag
3. Reapply AI features:
   - Install `starlight-llms-txt` plugin
   - Add `robots.txt` with AI bot allowances
4. Build and deploy to a preview URL (or temporary branch deploy)
5. Run AFDocs on both versions, capture comparison

---

## Day 7: Buffer / Prep

- [ ] Final polish on any rough edges
- [ ] Draft talking points for Rakesh meeting
- [ ] Run Lensy manually on the live site (browser)
- [ ] Prepare comparison data (AFDocs before/after)

---

## What This Skips (Intentionally)

- **Tier 2-4 roadmap items** — They deepen existing pages, not foundational gaps
- **Re-running Pass 5 (audience persona review)** — Useful but not essential before Rakesh
- **All remaining YELLOW items** — Day 4 covers highest-impact ones only
- **Driver's Seat, One-Pass-Ready, Self-Correction** — Tier 1 but lower priority than Two Loops/System Gap/Vibe Coding

---

## Success Criteria for Rakesh Meeting

From the research doc:
1. A real 33+ page docs site to discuss
2. AFDocs results showing before/after
3. Understanding of Lensy's capabilities
4. Willingness to be a design partner with feedback
5. Technical writing expertise to evaluate the methodology

The comparison testing can continue as part of the partnership — doesn't need to be complete before the meeting.
