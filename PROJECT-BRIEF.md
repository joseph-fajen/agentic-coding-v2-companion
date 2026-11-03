# Project Brief: Agentic Coding V2 Companion

**Owner:** Joseph Fajen
**Created:** 2026-11-03
**Horizon:** ~3 months (target: early February 2027)
**Related:** [GAP-ANALYSIS-REACT-DEV.md](GAP-ANALYSIS-REACT-DEV.md) (the standard and the gaps), [CONTENT-ROADMAP.md](CONTENT-ROADMAP.md) (course topics not yet covered), [PLAN.md](PLAN.md) (current sprint)

---

## Positioning

> **The companion to Cole Medin's Agentic Coding V2 course.** Built to the react.dev standard for learners, and to current agent-readability standards for AI tools.

The site is a stated companion. It doesn't compete for Cole's audience. It gives readers who prefer docs a written learning path that pairs with the videos. Cole welcomed the V1 companion site ([joseph-fajen.github.io/agentic-coding-companion](https://joseph-fajen.github.io/agentic-coding-companion/)), and V2 is the step up.

Being a companion is the site's **role**. The **quality bar** is a separate choice, and it's set high.

## Goals

1. **Community resource.** Give Cole and the Dynamous community a docs site that covers the **full scope** of the V2 course and meets the react.dev/learn standard.
2. **Portfolio and consulting proof.** Show, with measurements, what it takes to move a docs site from human-only to agent-friendly. Use it to offer consulting on agent-ready docs. Many technical writers can't yet explain those steps; this project shows them.

The two goals reinforce each other. The structure that makes a good learning path (one concept per page, a fixed template, semantic callouts, terms defined in order) is also what makes docs readable by agents. react.dev is the public example of both at once.

## Deliverables

| # | Deliverable | Serves |
|---|---|---|
| 1 | **The site**, restructured to the react.dev model and agent-friendly on `main` | Both |
| 2 | **Three measured snapshots** of the same site (below) | Goal 2 |
| 3 | **A published case study / playbook**: the steps taken, in order, with reasons and numbers | Goal 2. This is the sales asset |
| 4 | **A one-page service description**, written from the case study | Goal 2 |

## The three-snapshot experiment

| Snapshot | What it is | Answers | Kept as |
|---|---|---|---|
| **A: Human-only** | Today's site, frozen | The baseline | Permanent live site, in its own repo (e.g. `agentic-coding-v2-companion-classic`) |
| **B: A + agent tooling** | Same content, plus llms.txt, `.md` endpoints and robots.txt | "What do plugins alone buy you?" | Git tag plus recorded results |
| **C: Restructured + agent tooling** | The react.dev-standard rebuild | "What does structure buy you?" | `main` (the live site) |

**Measurement, for each snapshot:**

1. **Scanner scores.** Run AFDocs and Lensy.
2. **A reader-question test.** Write a fixed set of ~20 real questions a course student would ask. Ask an agent each question against the snapshot and score the answers for correctness. Scanners show the site is set up well; answered questions show agents actually understand it.

**Rules:**
- **Freeze A before editing any more content.** Every edit before the freeze changes the baseline.
- Write and lock the question set before measuring anything, so the questions can't drift toward C's strengths.

## Content scope

Full V2 course coverage, in five chapters (details in gap analysis §6–6a):

| Chapter | Course source | State today |
|---|---|---|
| 1. The loop | Phase 1 | Mostly exists. Needs rebuild plus roadmap Tier 1–2 topics |
| 2. The primitives | Phase 2 | Mostly exists. Needs rebuild plus roadmap Tier 2 topics |
| 3. Evolving the system | Phase 3 Act 1 | **New writing.** Syllabus rows only today |
| 4. Running without you | Phase 3 Act 2 | Exists. Needs splitting |
| 5. Going further | Phase 4 acts (open-ended) | Mostly new writing. Only teams exists |

Plus **Get Started** (quick tour, hands-on tutorial, thinking in systems, setup), **Reference** (course map, skill catalog, glossary, costs) and **Coming from V1** (unchanged).

**Coverage vs depth:**
- **Coverage:** every topic has a lesson with Intro, You will learn, body, Recap and video link. All chapters, within the horizon.
- **Depth:** Try it blocks with expected results, plus 2–3 challenges with hints and solutions. Chapters 1–2 within the horizon, chapters 3–5 after.

## What "done" means (early February 2027)

**Goal 1: Community**
- [ ] All five chapters plus Get Started have coverage in the new structure and lesson template
- [ ] Chapters 1–2 also have full depth (practice on every lesson)
- [ ] Every lesson links to its course video, and the companion framing is stated on the home page
- [ ] Cole has seen the site, and it's shared with the Dynamous community
- [ ] At least one round of fixes based on real reader feedback

**Goal 2: Portfolio and consulting**
- [ ] Snapshot A live at its own permanent URL; snapshot C live on `main`; snapshot B tagged
- [ ] Scanner scores and question-test results recorded for A, B and C
- [ ] Case study published
- [ ] One-page service description written
- [ ] At least one buyer conversation or design partnership (Lensy is the natural first)

## Proposed sequence

| When | Work |
|---|---|
| **This week (by Nov 6)** | Rakesh meeting. Use the gap analysis and the three-snapshot plan as talking points. Write the ~20-question set. **Freeze snapshot A** and record its scores. |
| **November** | Build snapshot B (the existing `ai-agent-friendly` branch work) and measure it. Make the quick fixes from gap analysis §5. Decide the open questions below. |
| **December** | New sidebar and lesson template. Get Started section. Chapters 1–2 rebuilt with full depth. |
| **January** | Chapters 3–5 at coverage (most of the new writing). Measure snapshot C. Draft the case study. |
| **Late January / early February** | Publish the case study and service page. Share with Cole and the community. Collect feedback. |

Assumption: this sequence assumes steady part-time effort. If time runs short, protect depth on chapters 1–2 and the measurements, and let coverage of chapters 3–5 slip. Never ship thin practice to hit a date.

## Explicitly out of scope (for this horizon)

- Full practice depth on chapters 3–5
- A custom MCP server for the docs
- Using the V1 site as an experimental data point. It has different content, so it's portfolio history, not a snapshot.
- A standalone course that competes with the videos

## Open decisions

1. **Primary audience:** one developer path with inline non-developer notes, or keep the separate non-developer track?
2. **Practice project:** the course's demo app (the AI Tutor), a new minimal project, or "your own repo"?
3. **Voice:** keep the sharp edge throughout, or soften it in Get Started only?
4. **Hosting for snapshot A:** a separate repo (recommended), or a subpath?
5. **First consulting buyer profile:** docs team at a dev-tools company, or solo founders? This changes what the case study emphasizes. It can wait until the data exists.
