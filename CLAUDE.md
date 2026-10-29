# Agentic Coding V2 Companion Site

Astro Starlight documentation site deployed to GitHub Pages.

## Current Status (updated 2026-10-28)

Five review passes are done and live. The latest, Pass 5, tested the site against two audience personas: an ISV practitioner who took V1, and a small business owner with no developer background. It added `start-here.md`, `costs.md`, `v1-delta/why-v2.md` and `workflow/teams.md`, and rebuilt the home page, migration checklist and glossary.

**To pick up where things left off, read the "Current State" and "Next Steps to Consider" sections in [REVIEW-PLAN.md](REVIEW-PLAN.md).**

## Audiences

The site serves readers through separate paths rather than making every page work for everyone:
- **Course students:** use it alongside the videos
- **Practitioners / ISVs** (often V1 alumni): want rationale, tradeoffs, costs, migration and team guidance
- **Non-developers** (e.g. small business owners): need a clear on-ramp (`start-here.md`), honest prerequisites and what to skip

The home page's "Where to start" section routes each reader. Keep it the single source of starting advice.

## Content Roadmap

See [CONTENT-ROADMAP.md](./CONTENT-ROADMAP.md) for prioritized additions based on gap analysis against the course knowledge base. Pick items from the highest unchecked tier and use the KB as source material.

## Sourcing

Facts on the site come from the course repo at `~/git/agentic-coding-course`:
- **Knowledge base (main branch):** `knowledge-base/concepts/`, `knowledge-base/entities/` — synthesized, cross-linked wiki with video citations
- **Diagrams (main branch):** `diagrams/` — 33 Excalidraw PNGs covering all major concepts (see CONTENT-ROADMAP.md for inventory)
- **Video scripts (v2 branch):** `phase_*/V*/script.md`
- **Guides (v2 branch):** `docs/cost-and-models-guide.md`, `docs/prereqs-install-guide.md`, `docs/team-standards-deep-dive.md`
- **The course skill pack (v2 branch):** `.claude/skills/`

Fetch both branches: `git fetch origin main v2`

Don't invent numbers (time estimates, prices) or maturity claims the course doesn't make. Named skills on the site are from the course pack, not built into Claude Code; the glossary's "Skills referenced on this site" table lists them.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:4321/agentic-coding-v2-companion/
npm run build    # production build to ./dist/
```

## Base Path Configuration

The site deploys to a subpath (`/agentic-coding-v2-companion/`), which creates linking challenges.

### The Problem

Absolute markdown links like `[Phase 2](/phases/phase-2/)` don't get the base path prepended. They render as `href="/phases/phase-2/"` instead of `href="/agentic-coding-v2-companion/phases/phase-2/"`, causing 404s.

Starlight handles sidebar links automatically, but NOT links in markdown content.

### The Solution

We use the `starlight-base-path` plugin which rewrites root-relative links at build time.

**Dependencies required:**
```bash
npm install starlight-base-path @astrojs/markdown-remark
```

**Config (`astro.config.mjs`):**
```js
import { starlightBasePath } from 'starlight-base-path';  // named import, not default

starlight({
  plugins: [starlightBasePath()],
  // ...
})
```

### Writing Links

With the plugin installed, write natural absolute links:
```markdown
See [Phase 2](/phases/phase-2/) for details.
```

The plugin rewrites them to include the base path at build time.

## Content Structure

### Primitives Overview Table

The overview table at `/primitives/overview/` uses this format:

| Column | Purpose |
|--------|---------|
| Primitive | Name of the primitive |
| What It Is | Concrete description (not abstract) |
| Key Insight | The "aha" for a newbie — what they need to understand |

**Guideline:** "Key Insight" should answer "what is this and why would I care?" — not usage tactics. Save tactics for the deep-dive pages.

### "Is this for you?" Callout

Landing, overview and workflow pages open with one routing callout (after the TL;DR, if the page has one), so each reader knows whether to read now or skip:

```markdown
:::note[Is this for you?]
- **Read this when** {the situation where this page pays off}.
- **Skip for now if** {who can safely skip it, and where they should go instead}.
- **How settled:** {only if the course itself says something about maturity}
:::
```

Keep it to these lines. Don't invent maturity claims the course doesn't make.

### Cross-Linking

Each page should have a "See Also" section linking to related content. Use absolute paths — the plugin handles the base path.

## Dev vs Prod

| Aspect | Dev | Prod |
|--------|-----|------|
| URL | `http://localhost:4321/agentic-coding-v2-companion/` | `https://joseph-fajen.github.io/agentic-coding-v2-companion/` |
| Base path | Applied | Applied |
| Hot reload | Yes | N/A |

**Note:** Dev server shows `http://localhost:4321/` in terminal output, but you must navigate to the full base path URL.

**Sidebar changes** in `astro.config.mjs` need a dev server restart to show up (`npx astro dev stop`, then `npm run dev`). To check the real production layout, run `npm run build` then `npx astro preview --port 4322`.

**Home page template:** `index.mdx` deliberately uses the default doc template, not `splash`. Splash hides the sidebar, so first-time visitors couldn't see the navigation.

## Deployment

See [DEPLOY.md](DEPLOY.md) for GitHub Pages deployment instructions.

Every push to `main` deploys. Make changes on a branch and open a PR; merging publishes.

Key requirements:
- Node 23 (Astro requires >= 22.23.4)
- `package-lock.json` committed (CI uses `npm ci`)
- GitHub OAuth needs `workflow` scope to push workflow files

## Review Process

The site uses adversarial AI review with parallel agents. See [REVIEW-PLAN.md](REVIEW-PLAN.md) for methodology.

- `REVIEW-PLAN.md` is tracked in git. It holds the methodology, every pass's results, current state and next steps.
- `REVIEW-FINDINGS-*.md` files are gitignored, local-only reviewer reports. The latest are `REVIEW-FINDINGS-ISV.md` and `REVIEW-FINDINGS-SMB.md`.
- Alternative F in REVIEW-PLAN.md has a ready-to-paste kickoff prompt for re-running the persona review.
