# Deploy to GitHub Pages

## One-Time Setup

Enable GitHub Pages in the repo settings:

1. Go to https://github.com/joseph-fajen/agentic-coding-v2-companion/settings/pages
2. Under **Build and deployment** → **Source**: select **GitHub Actions**
3. Save

That's it. The workflow will handle builds automatically on every push to `main`.

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
