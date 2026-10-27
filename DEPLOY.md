# Deploy to GitHub Pages

## One-Time Setup

Enable GitHub Pages in the repo settings:

1. Go to https://github.com/joseph-fajen/agentic-coding-v2-companion/settings/pages
2. Under **Build and deployment** → **Source**: select **GitHub Actions**
3. Save

That's it. The workflow will handle builds automatically on every push to `main`.

## Requirements

### Node Version

The workflow uses **Node 23**. Astro requires Node >= 22.23.4, and GitHub Actions' Node 22 image (22.23.3) is too old.

### package-lock.json

Must be committed to the repo. The CI workflow uses `npm ci` which requires the lock file.

If your global `.gitignore` excludes `package-lock.json`, override it locally:
```
# .gitignore
!package-lock.json
```

### OAuth Workflow Scope

Pushing workflow files (`.github/workflows/*.yml`) requires the `workflow` scope on your GitHub OAuth token.

If push fails with "refusing to allow an OAuth App to create or update workflow":
```bash
gh auth refresh -s workflow
git push
```

## Deploy

Push your changes:

```bash
cd ~/git/agentic-coding-v2-companion
git add -A
git commit -m "feat: add home page polish, cross-links, and GitHub Pages deployment"
git push
```

The GitHub Actions workflow will:
1. Install dependencies
2. Build the Astro site
3. Deploy to GitHub Pages

## Site URL

**https://joseph-fajen.github.io/agentic-coding-v2-companion/**

## Verify Deployment

After pushing, check the Actions tab:
https://github.com/joseph-fajen/agentic-coding-v2-companion/actions

The "Deploy to GitHub Pages" workflow should show a green checkmark when complete.
