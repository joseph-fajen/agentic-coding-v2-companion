// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightBasePath } from 'starlight-base-path';
import starlightLlmsTxt from 'starlight-llms-txt';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const site = 'https://joseph-fajen.github.io';
const base = '/agentic-coding-v2-companion';

// Per-page <lastmod> from each page's last git commit (the same date Starlight's
// "Last updated" shows). Needs full history in CI: deploy.yml checks out with fetch-depth: 0.
function gitLastmod(url) {
	const slug = new URL(url).pathname.slice(base.length).replace(/^\/|\/$/g, '') || 'index';
	const file = ['.md', '.mdx'].map((ext) => `src/content/docs/${slug}${ext}`).find((f) => existsSync(f));
	if (!file) return undefined;
	const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
	return date || undefined;
}

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [
		// Replaces Starlight's built-in sitemap (it skips its own when this is present).
		sitemap({ serialize: (item) => ({ ...item, lastmod: gitLastmod(item.url) }) }),
		starlight({
			plugins: [starlightBasePath(), starlightLlmsTxt()],
			lastUpdated: true,
			components: { SkipLink: './src/components/SkipLink.astro' },
			title: 'Agentic Coding V2',
			description: 'Companion site for Cole Medin\'s Agentic Coding Course V2',
			social: [
				{ icon: 'external', label: 'Dynamous', href: 'https://dynamous.ai/' },
				{ icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ColeMedin' },
			],
			sidebar: [
				{ label: 'Start here (not a developer?)', slug: 'start-here' },
				{
					label: 'Core concepts',
					items: [
						{ label: 'The System Gap', slug: 'concepts/system-gap' },
						{ label: 'The Two Loops', slug: 'concepts/two-loops' },
						{ label: 'Vibe Coding', slug: 'concepts/vibe-coding' },
					],
				},
				{
					label: 'The five primitives',
					items: [
						{ label: 'Overview', slug: 'primitives/overview' },
						{ label: 'Rules', slug: 'primitives/rules' },
						{ label: 'Subagents', slug: 'primitives/subagents' },
						{ label: 'MCP / tools', slug: 'primitives/mcp-tools' },
						{ label: 'Skills', slug: 'primitives/skills' },
						{ label: 'Hooks', slug: 'primitives/hooks' },
						{
							label: 'Steering (advanced rules)',
							items: [
								{ label: 'Overview', slug: 'steering/overview' },
								{ label: 'direction.md', slug: 'steering/direction' },
								{ label: 'engineering.md', slug: 'steering/engineering' },
							],
						},
					],
				},
				{
					label: 'The four phases',
					items: [
						{ label: 'Overview', slug: 'phases/overview' },
						{ label: 'Phase 1: Create your first system', slug: 'phases/phase-1' },
						{ label: 'Phase 2: The primitives', slug: 'phases/phase-2' },
						{ label: 'Phase 3: Improve & scale', slug: 'phases/phase-3' },
						{ label: 'Phase 4: Going further (optional)', slug: 'phases/phase-4' },
					],
				},
				{
					label: 'Workflow primitives',
					items: [
						{ label: 'Overview', slug: 'workflow/overview' },
						{ label: 'Greenfield planning', slug: 'workflow/greenfield-planning' },
						{ label: 'Epic to tickets', slug: 'workflow/epic-to-tickets' },
						{ label: 'Parallel worktrees', slug: 'workflow/parallel-worktrees' },
						{ label: 'Headless / SDK / CI', slug: 'workflow/headless-sdk-ci' },
						{ label: 'Archon', slug: 'workflow/archon' },
						{ label: 'Running this as a team', slug: 'workflow/teams' },
					],
				},
				{
					label: 'Coming from V1?',
					items: [
						{ label: 'Overview', slug: 'v1-delta/overview' },
						{ label: 'Why V2', slug: 'v1-delta/why-v2' },
						{ label: 'What changed', slug: 'v1-delta/what-changed' },
						{ label: 'What still applies', slug: 'v1-delta/what-still-applies' },
						{ label: 'Migration checklist', slug: 'v1-delta/migration-checklist' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Glossary', slug: 'glossary' },
						{ label: 'What it costs', slug: 'costs' },
					],
				},
			],
		}),
	],
});
