// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightBasePath } from 'starlight-base-path';

// https://astro.build/config
export default defineConfig({
	site: 'https://joseph-fajen.github.io',
	base: '/agentic-coding-v2-companion',
	integrations: [
		starlight({
			plugins: [starlightBasePath()],
			title: 'Agentic Coding V2',
			description: 'Companion site for Cole Medin\'s Agentic Coding Course V2',
			social: [
				{ icon: 'external', label: 'Dynamous', href: 'https://dynamous.ai/' },
				{ icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ColeMedin' },
			],
			sidebar: [
				{ label: 'Start here (not a developer?)', slug: 'start-here' },
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
								{ label: 'Overview', slug: 'primitives/steering-overview' },
								{ label: 'direction.md', slug: 'primitives/steering-direction' },
								{ label: 'engineering.md', slug: 'primitives/steering-engineering' },
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
					],
				},
				{
					label: 'Coming from V1?',
					items: [
						{ label: 'Overview', slug: 'v1-delta/overview' },
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
