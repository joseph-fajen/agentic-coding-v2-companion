// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://joseph-fajen.github.io',
	base: '/agentic-coding-v2-companion',
	integrations: [
		starlight({
			title: 'Agentic Coding V2',
			description: 'Companion site for Cole Medin\'s Agentic Coding Course V2',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/coleam00/agentic-coding-course' },
				{ icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ColeMedin' },
			],
			sidebar: [
				{
					label: 'The Five Primitives',
					items: [
						{ label: 'Overview', slug: 'primitives/overview' },
						{ label: 'Rules', slug: 'primitives/rules' },
						{ label: 'Subagents', slug: 'primitives/subagents' },
						{ label: 'MCP / Tools', slug: 'primitives/mcp-tools' },
						{ label: 'Skills', slug: 'primitives/skills' },
						{ label: 'Hooks', slug: 'primitives/hooks' },
						{
							label: 'Steering (Advanced Rules)',
							items: [
								{ label: 'Overview', slug: 'primitives/steering-overview' },
								{ label: 'direction.md', slug: 'primitives/steering-direction' },
								{ label: 'engineering.md', slug: 'primitives/steering-engineering' },
							],
						},
					],
				},
				{
					label: 'The Four Phases',
					items: [
						{ label: 'Overview', slug: 'phases/overview' },
						{ label: 'Phase 1: Create Your First System', slug: 'phases/phase-1' },
						{ label: 'Phase 2: The Primitives', slug: 'phases/phase-2' },
						{ label: 'Phase 3: Improve & Scale', slug: 'phases/phase-3' },
						{ label: 'Phase 4: Going Further (Optional)', slug: 'phases/phase-4' },
					],
				},
				{
					label: 'Workflow Primitives',
					items: [
						{ label: 'Overview', slug: 'workflow/overview' },
						{ label: 'Headless / SDK / CI', slug: 'workflow/headless-sdk-ci' },
						{ label: 'Archon', slug: 'workflow/archon' },
					],
				},
				{
					label: 'Coming from V1?',
					items: [
						{ label: 'Overview', slug: 'v1-delta/overview' },
						{ label: 'What Changed', slug: 'v1-delta/what-changed' },
						{ label: 'What Still Applies', slug: 'v1-delta/what-still-applies' },
						{ label: 'Migration Checklist', slug: 'v1-delta/migration-checklist' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Glossary', slug: 'glossary' },
					],
				},
			],
		}),
	],
});
