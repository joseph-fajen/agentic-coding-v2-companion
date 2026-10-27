# Agentic Coding V2 Companion Site

Astro Starlight documentation site deployed to GitHub Pages.

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

### Cross-Linking

Each page should have a "See Also" section linking to related content. Use absolute paths — the plugin handles the base path.

## Dev vs Prod

| Aspect | Dev | Prod |
|--------|-----|------|
| URL | `http://localhost:4321/agentic-coding-v2-companion/` | `https://joseph-fajen.github.io/agentic-coding-v2-companion/` |
| Base path | Applied | Applied |
| Hot reload | Yes | N/A |

**Note:** Dev server shows `http://localhost:4321/` in terminal output, but you must navigate to the full base path URL.

## Deployment

See [DEPLOY.md](DEPLOY.md) for GitHub Pages deployment instructions.

Key requirements:
- Node 23 (Astro requires >= 22.23.4)
- `package-lock.json` committed (CI uses `npm ci`)
- GitHub OAuth needs `workflow` scope to push workflow files

## Review Process

The site uses adversarial AI review with parallel agents. See [REVIEW-PLAN.md](REVIEW-PLAN.md) for methodology.

Untracked review artifacts (in `.gitignore`):
- `REVIEW-FINDINGS-*.md`
- `REVIEW-PLAN.md`
