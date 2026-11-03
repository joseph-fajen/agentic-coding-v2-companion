# Gap Analysis: Companion Site vs react.dev/learn

**Date:** 2026-11-03
**Status:** Research and analysis only. No site changes made. Updated 2026-11-03 after the framing discussion: section 2 is resolved, section 6 is corrected, and section 6a and 6b are new. See [PROJECT-BRIEF.md](PROJECT-BRIEF.md) for goals, plan and "done" criteria.
**Standard:** [react.dev/learn](https://react.dev/learn), the tutorial and learning-path standard for developer docs.
**Subject:** Agentic Coding V2 Companion (36 source files, 33 live pages, ~37k words) at commit `4fab178`.

---

## 1. Bottom line

The site has strong raw material: a confident, specific voice, solid concept coverage, and five review passes behind it. What it lacks compared to react.dev is a **learning product**. Today it's a well-written *reference companion to a video course*, organized three ways at once:

- by course phase
- by primitive
- by workflow

react.dev/learn is a **self-paced course in its own right**. It has one dependency-ordered path, a fixed page template, and practice on every page.

The largest gaps, in order of impact:

1. **No learning path that works without the videos.** Every "do" step hands off to a paid video ("In video V3 you install…", "Next step: Watch V1"). react.dev's Learn section teaches React from scratch on its own.
2. **Parallel organizing schemes, no dependency order.**
   - Phases, primitives and workflow overlap. For example, the primitives table appears 3 times, the Two Loops idea is retold in two places, and the workflow pages are tagged "(Phase 1)" inside a Phase 3 section.
   - react.dev has one chapter sequence where "pages only rely on concepts introduced by earlier pages."
3. **No practice.**
   - Zero pages have exercises or self-checks, compared with 28 of 31 react.dev lessons (91 challenges, every one with a solution).
   - Only one page, the migration checklist, has a "check it works" step.
4. **No fixed page template.**
   - Conventions exist (TL;DR, "Is this for you?", Key takeaways, See also) but they're applied unevenly.
   - Only phase pages state learning outcomes, and only 5 pages end with a forward link.
5. **Multi-concept pages.** Skills (~17 H2s), hooks (15), subagents (13) and headless-sdk-ci (2,545 words, 5 methods) each bundle several ideas. react.dev's rule is one concept per page.
6. **Too many audiences, served by routing.**
   - The site has 4–5 personas plus "Is this for you? / Skip for now if" gates on 12 pages.
   - react.dev serves one audience (people learning React) and handles different levels *inside* the path: inline "if you're new to X" notes, plus collapsible deep dives.
7. **Almost no visuals.** The site has 2 images, while 33 course diagrams are available. react.dev uses diagrams and illustrations wherever words alone fall short.
8. **Not agent-readable on `main`.** There's no llms.txt and no `.md` endpoints. A fix is already planned (Day 6, `ai-agent-friendly` branch).

**Recommendation:** a reorganization *and* a rewrite, which you've said is acceptable.

- The content mostly survives. The structure, the page template, and the practice layer are what's new.
- **Don't start before the Nov 6 Rakesh meeting.** This is a multi-week effort, and this analysis is a good talking point for the meeting in its own right.

---

## 2. Framing decision (resolved)

react.dev/learn is the full course. This site is *a companion to* someone else's course. The question was whether that role caps how far the standard can apply.

**Decision:** the site stays a stated companion to Cole's video course and doesn't compete for its audience. Cole welcomed the V1 companion site, which is the precedent. The quality bar goes up anyway, because being a companion is a *role*, not a *ceiling*.

How the role maps onto react.dev's structure:

| react.dev | This site |
|---|---|
| **Learn**: a self-paced course | **Learn**: the *written* learning layer that pairs with the videos. Every lesson links to its matching video. A reader who prefers reading can follow the path from start to finish, and a video watcher can drop in at any lesson. |
| **Reference**: API lookup | **Reference**: course map (video → lesson), course skill catalog, glossary, costs |

**Still open (see section 8):**
- primary audience: one developer path with inline non-developer notes, or keep a separate track
- the practice medium: a shared practice project, or "your own repo"

---

## 3. Scorecard against the react.dev rubric

Each criterion is rated **Meets**, **Partial** or **Missing**. "Adaptation" covers criteria that can't transfer literally, because agentic coding can't run in a browser sandbox.

| # | Criterion | react.dev standard | Companion site today | Rating |
|---|---|---|---|---|
| 1 | Separate learning path | Learn (course) is separate from Reference, with cross-links at first mention | Learning, reference and course syllabus are mixed in one sidebar. The glossary and costs pages are the only clearly separated reference. | **Missing** |
| 2 | Multiple sized entry points | Quick Start (80% tour), hands-on Tutorial, and "Thinking in React", each naming its audience | Four *persona* entry points, not *learning-style* entry points. No quick tour, no hands-on tutorial. Core concepts (the natural "Thinking in…" page) aren't linked from index or start-here. | **Partial** |
| 3 | Chapters in dependency order | 4 chapters, fundamentals first, with a strict "earlier pages only" rule | Three parallel schemes (phases / primitives / workflow). Workflow mixes Phase 1 and Phase 3 material. The order of the five primitives isn't justified as a learning order. | **Missing** |
| 4 | Chapter overview pages | Each chapter intro previews every lesson with a mini-explanation and a link, and ends with "start / skip ahead" | `primitives/overview`, `workflow/overview` and `phases/overview` are close, but they are tables and essays rather than lesson previews, and they don't end with start/skip options | **Partial** |
| 5 | Fixed page template | Intro → You will learn → body → Recap → Challenges on 28 of 31 pages | A loose template, unevenly applied: Key takeaways on 18 pages, See also on 18, TL;DR on 9. The steering pages have no closing sections at all. | **Partial** |
| 6 | Motivation-first intro | 1–4 sentences on why it matters, with the core term defined in italics | **Strength.** Openings hook well ("Here's a confession about that little 'approve?' prompt…"). They rarely define the core term in the first lines, though. | **Meets / Partial** |
| 7 | Stated learning outcomes | 3–6 "How to…" bullets on every lesson | Only on the four phase pages ("What you'll walk away with") | **Missing** (on lessons) |
| 8 | Runnable examples | ~12 live sandboxes per lesson, including deliberately broken ones | Code blocks exist (0–10 per page), but they're illustrative. Readers have nothing to *run* and check. **Adaptation:** "try this in your repo" blocks with an exact command or prompt and an *expected result* ("you should see…"), plus a "broken first" example (a bloated CLAUDE.md, an unchecked agent action). | **Missing** |
| 9 | Practice with graduated help | ~3 challenges per page, each with a hint and a worked solution | No page has exercises. **Adaptation:** challenges against the practice project, e.g. "write a hook that blocks reading `.env`", with a hint, the solution file, and how to verify it. | **Missing** |
| 10 | Callouts with fixed meanings | Pitfall / Note / DeepDive, one job each | Starlight asides are used, but their roles mix: "Is this for you?" routing, TL;DR as a tip, and warnings. There's no collapsible deep dive. | **Partial** |
| 11 | One concept per page, sized to difficulty | Single idea; 900–2,500 words (median 2,014); max H4 | Concept pages are focused but short (~600 words). Primitive and workflow pages bundle concepts (13–17 H2s). headless-sdk-ci covers 5 methods. Length isn't the problem; scope is. | **Partial** |
| 12 | Conversational, specific voice | 2nd person, ~17–20 words per sentence, task-phrased headings, encouraging | **Strength.** Second person, punchy and specific. More opinionated and confrontational than react.dev ("That's not safety. That's theater."). That works for practitioners, but may put off beginners. Headings are mostly nouns ("Key concepts"), not tasks. | **Meets / Partial** |
| 13 | Jargon discipline | Defined at first use, never used before it's introduced, restated in Recap | Relies on a 1,993-word glossary instead of defining in context. Terms like R-PIV, Layer 1/2 and harness appear before their defining page. react.dev has **no glossary**, because the path defines terms in order. | **Partial** |
| 14 | Analogies and purposeful visuals | Analogies for hard models; diagrams where words fail; full alt text | 2 images out of 33 available course diagrams. Few explicit analogies. | **Missing** |
| 15 | Inline prerequisite and level handling | "If you're new to X…" notes inline; advanced material in collapsible sections; no hard gates | Handled by *routing and gating* ("Skip for now if", the non-developer track, persona paths) rather than inline. That works, but it splits the reader base. | **Partial** |
| 16 | Navigation scaffolding | Sidebar mirrors chapters; prev/next follows the path; dense cross-links; stable anchors | Default Starlight prev/next follows a sidebar that isn't a path, so readers get odd jumps (start-here → System Gap; engineering → phases overview). Content pages have 1–3 internal links, and the steering pages have 0. | **Partial** |
| 17 | Agent-readable source | llms.txt mirrors the IA; `.md` endpoint per page; back-link to the index | None on `main`. A prototype exists on the `ai-agent-friendly` branch. | **Missing** (planned) |
| 18 | One current paradigm | Hooks only; legacy isolated | **Strength.** V1 material is isolated in "Coming from V1?". Some workflow pages still present Archon as the default rather than "a workflow engine (the course uses Archon)". | **Meets** |

**Tally:** 1 Meets, 2 Meets/Partial, 8 Partial, 7 Missing.

---

## 4. What already meets or nearly meets the standard

Keep these through any rewrite.

- **Voice.** Second person, concrete, opinionated. It's the hardest thing to retrofit, and you already have it. Tune it for beginners rather than replacing it.
- **Key takeaways** on 18 pages already do the job of react.dev's Recap. Standardize them; don't invent something new.
- **Phase pages' "What you'll walk away with"** already does the job of react.dev's *You Will Learn*. Move this pattern onto every lesson.
- **Concept pages** (System Gap, Two Loops, Vibe Coding) are the natural "Thinking in…" layer.
- **The migration checklist** is the site's best how-to. It has numbered steps and a "Check it works" section, so it's the model for practice blocks.
- **Paradigm isolation** of V1 material.
- **Sourcing discipline.** "Don't invent numbers." react.dev's equivalent is its "found mistakes in our own explanations" quality bar.

---

## 5. Structural problems (independent of the rubric)

These came up during the inventory. Most are quick fixes that don't depend on the restructure.

| Issue | Evidence | Note |
|---|---|---|
| **Broken redirect stubs** | `primitives/steering-{overview,direction,engineering}.md` are `.md` files using MDX `import`/`<Aside>`. The import line renders as visible text. They're orphaned (no inbound links). | Rename to `.mdx`, convert to Astro `redirects`, or delete |
| **Statistic survived the Day 5 cleanup** | "84%… 46%" on `concepts/system-gap.md:6`, `:50` and `concepts/vibe-coding.md:16` | Conflicts with the Day 5 decision to remove specific stats |
| **Dead-end pages** | `steering/direction.md` and `steering/engineering.md` have 0 internal links and no See also | |
| **Inconsistent Two Loops** | `workflow/overview` retells Two Loops without linking `concepts/two-loops`, and the two disagree on PIV vs R-PIV for the inner loop | Accuracy issue, not just style |
| **Content repeated 3 times** | The primitives table appears in primitives/overview, phase-2 and the index CardGrid | |
| **Section mismatch** | `workflow/teams.md` is Phase 4 material in the Workflow section. Workflow pages are tagged "(Phase 1)" inside a Phase 3 section. | |
| **Stale README** | It says "All 22 docs written… Complete" | 33 live pages now |
| **Oversized image** | `two-loops` PNG is 2.1 MB | Compress before adding more diagrams |
| **Hardcoded base path in image URLs** | `/agentic-coding-v2-companion/images/...` | Works today, but breaks if the base path changes |

---

## 6. Target structure (a sketch, for discussion)

This is one way the site could look under the react.dev model, keeping the companion role. It's a starting point, not a decision. Existing pages map onto it, and little content is lost. *Corrected 2026-11-03:* chapter 5 now covers all of Phase 4, not just teams, and AI-in-CI sits in chapter 5, following the course's July 2026 move.

```
GET STARTED
├── Quick tour                      ← NEW: the whole system in one page (~80% of daily concepts)
│                                      sources: index "core ideas", primitives/overview, phases/overview
├── Tutorial: Your first AI layer   ← NEW: hands-on, one practice project grows across 4 sections:
│     setup → first CLAUDE.md → first PIV ticket → first "fix the system" change
│                                      sources: start-here steps, phase-1, rules, greenfield-planning
├── Thinking in systems             ← MERGE: system-gap + two-loops + vibe-coding
└── Setup                           ← SPLIT from start-here: install, plan, costs; non-dev notes inline

LEARN
├── 1. The loop (fundamentals)          chapter overview + lessons
│     Planning a feature · Epic to tickets · Executing a ticket (PIV) · Validating the result
├── 2. The primitives (fundamentals)    chapter overview + one lesson each, in a justified order
│     Rules · Skills · Subagents · MCP / tools · Hooks · Steering documents
│     (split oversized pages: e.g. Skills → "Your first skill" + "Composing skills")
├── 3. Evolving the system (advanced)   Phase 3 Act 1
│     System evolution (the outer loop) · Making your ship step yours · The issue-fixer ·
│     Automating your whole loop
├── 4. Running without you (advanced)   Phase 3 Act 2
│     Parallel worktrees · Headless · SDK · Workflow engines (Archon) · Cost discipline
│     (split headless-sdk-ci into separate lessons)
└── 5. Going further (advanced)         Phase 4 acts, open-ended
      Teams · Orchestration deep dive · AI-native codebases · AI in CI · (future acts)

REFERENCE
├── Course map           ← phase pages become a video → lesson index (keeps the companion role)
├── Course skill catalog ← from the glossary's skills table
├── Glossary             ← slimmed down, since lessons now define terms in context
└── What it costs

GUIDES
└── Coming from V1       ← unchanged, isolated (already meets criterion 18)
```

**Lesson template** (adapted from react.dev to Starlight):

1. **Intro**: 1–4 sentences of motivation, with the core term defined in italics
2. **You will learn**: 3–6 "How to…" bullets
3. **Body**: task-phrased H2s; "broken first" examples where useful; *Try it* blocks with an expected result; a `:::caution` aside used only for pitfalls; a `<details>` deep dive for optional internals
4. **Recap**: rename and standardize Key takeaways
5. **Challenges**: 2–3 tasks on the practice project, each with a hint and a solution (Starlight `<details>` works for both)
6. Prev/next set explicitly to follow the path

The "Is this for you?" callout would mostly go away. The path sets the order, and inline level notes cover readers at different levels. Each lesson also gets a **video link** to its matching course video, which keeps the companion role visible.

---

## 6a. Course coverage by chapter

The goal is the **full scope of the V2 course**. Mapping the chapters to the course shows that the fundamentals mostly exist, while much of the advanced material appears only as rows in syllabus tables. Covering everything means new writing as well as restructuring.

| Chapter | Course source | Existing pages | Missing: syllabus rows only, or roadmap items |
|---|---|---|---|
| **1. The loop** | Phase 1 (V1–V11) | phase-1, greenfield-planning, epic-to-tickets, parallel-worktrees (V10) | Research beat, one-pass-ready plan, self-correction and gates, strategic doc, architecture decisions (roadmap Tiers 1–2) |
| **2. The primitives** | Phase 2 (V12–V23) | rules, subagents, mcp-tools, skills, hooks, steering ×3 | Guidance vs guarantee, context hygiene and isolation, skill chaining, on-demand context (roadmap Tier 2) |
| **3. Evolving the system** | Phase 3 Act 1 | **None.** The topics appear only as table rows in `phase-3.md` | All 4 lessons: system evolution (`/insights`), ship-step conventions (doc + regex + judge rubric), issue-fixer, automating the whole loop |
| **4. Running without you** | Phase 3 Act 2 | parallel-worktrees, headless-sdk-ci, archon, costs | Mostly covered. Needs splitting, not new content |
| **5. Going further** | Phase 4 acts | teams | Orchestration (run files and resume, merge queues, agent teams, spikes) and AI-native codebases appear only as table rows in `phase-4.md` |

**Rough size:** 35–45 lessons plus 5 chapter overviews, up from 33 pages today. About a third is new writing, mostly chapters 3 and 5. This is an estimate, not a measurement.

**Coverage vs depth:**
- *Coverage* means every course topic has a lesson in the template: Intro, You will learn, body, Recap, video link.
- *Depth* adds the practice half: Try it blocks with expected results, and challenges with hints and solutions.

This mirrors the two halves of react.dev's lesson template. Coverage comes first across all chapters. Depth goes to chapters 1–2 first, then 3–5.

**Growth:** Phase 4 is "act-based, non-ending." The chapter-overview-plus-template structure lets a new lesson go in whenever Cole ships an act, the way react.dev added its React Compiler section without breaking its structure.

---

## 6b. Where this site deliberately diverges from react.dev

Naming these makes the difference between meeting the standard and imitating it.

| react.dev | This site | Why |
|---|---|---|
| Written by React's owners | Documents someone else's course | Sourcing rules ("don't invent what the course doesn't say") take the place of authorial authority |
| ~400 sandboxes and 91 challenges, built by a funded team | 2–3 challenges per lesson, Try it blocks in the reader's repo | The principles stay at full standard, but the volume is sized for one author. Agentic coding can't run in a browser sandbox. |
| No glossary | A slimmed glossary is kept | Course students jump in from videos at random points rather than reading in order |
| Warm, encouraging voice | A sharper, opinionated voice, softened in Get Started | The voice is a signature asset |
| Self-contained course | Every lesson links to its video | The companion role is stated, not hidden |

---

## 7. Gaps by size of effort

**Small (hours), worth doing regardless:**

- Fix or remove the 3 broken stubs
- Resolve the 84%/46% stat
- Reconcile PIV vs R-PIV
- Add See also to the steering pages
- Update the README
- Ship llms.txt (already planned for Day 6)

**Medium (days):**

- Define and apply the lesson template to existing pages
- Add diagrams from the 33 available
- Set explicit prev/next order
- Add a few *Try it* blocks with expected results

**Large (weeks), the core of the standard:**

- New sidebar with chapters in dependency order
- Chapter overview pages
- Quick tour and hands-on tutorial
- Split multi-concept pages
- Challenges with solutions on every lesson
- A canonical practice project

---

## 8. Open questions for Joe

1. ~~**Standalone or companion?**~~ **Resolved:** a stated companion with a raised bar (section 2).
2. ~~**Is a standalone path acceptable to Cole/Dynamous?**~~ **Resolved:** not pursuing a standalone path. Cole welcomed the V1 companion site.
3. **Practice project:** use the course's demo app (the AI Tutor), a new minimal project, or "your own repo"? react.dev's Tutorial works because everyone builds the same thing.
4. **Non-developer audience:** keep a separate track, or fold its needs into inline notes on one developer path?
5. **Voice:** keep the confrontational edge for practitioner pages and soften it for Get Started, or use one register throughout?
6. **Timing:** start after the Nov 6 meeting? Should this analysis be part of that conversation, since Lensy audits docs quality? (A proposed sequence is in PROJECT-BRIEF.md.)

---

## Sources

- react.dev evidence: all 51 Learn pages (from [llms.txt](https://react.dev/llms.txt), as `.md`), [`src/sidebarLearn.json`](https://github.com/reactjs/react.dev), and the launch post [Introducing react.dev](https://react.dev/blog/2023/03/16/introducing-react-dev)
- Companion evidence: page-by-page inventory of `src/content/docs/` (word counts, asides, links, images by script; judgments by reading), plus `CLAUDE.md`, `PLAN.md`, `REVIEW-PLAN.md`, `CONTENT-ROADMAP.md`
- Selection rationale for react.dev: practitioner rankings ([Draft.dev](https://draft.dev/learn/12-documentation-examples-every-developer-tool-can-learn-from), [DEV](https://dev.to/ben/what-are-some-examples-of-great-documentation)) plus agent-readability checks, done 2026-11-03
