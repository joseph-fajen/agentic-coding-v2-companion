---
title: Migration Checklist
description: Concrete steps to update your V1 system to V2 patterns
---

Use this checklist to update your V1 agentic system to V2 patterns. Work through it in order — earlier items enable later ones.

:::tip[What's Actually Critical?]
**You can skip folder migration** if your current structure works. These are the high-value changes:

1. **Learn [Hooks](/primitives/hooks/)** — entirely new primitive for guarantees
2. **Create [Steering Docs](/steering/overview/)** — direction.md and engineering.md
3. **Review your [Rules](/primitives/rules/)** — apply the cut test ("would it do this anyway?")

Everything else is polish. Start with those three.
:::

---

## Structural Migration

### 1. Folder Layout

- [ ] Rename `.agents/` to `.claude/` (or create if new)
- [ ] Move commands to `.claude/skills/`
- [ ] Create `.claude/agents/` for subagents
- [ ] Create `.claude/hooks/` for hooks
- [ ] Create `.claude/references/` for on-demand context

**Result:** Your folder structure matches the standard Claude Code layout.

```
.claude/
├── agents/       # Subagent definitions
├── hooks/        # Pre/post tool hooks
├── references/   # On-demand context docs
├── skills/       # Triggered procedures
└── settings.json # Hook configuration
```

### 2. Rules File Cleanup

- [ ] Review CLAUDE.md for bloat — apply the cut test ("would it do this anyway?")
- [ ] Extract situational content to `.claude/references/`
- [ ] Keep: codebase map, ground rules, commands, agent steering
- [ ] Cut: slogans, generic best practices, step-by-step processes

**Result:** Lean rules file focused on what the agent needs every session.

## New Primitives

### 3. Add Steering Documents

Create two new files in `.claude/references/`:

**direction.md**

- [ ] Define what your project IS (core purpose, target users)
- [ ] Define what it IS NOT (out-of-scope features, non-goals)
- [ ] Add named clauses for key decisions (e.g., `§no-database`, `§always-async`)

**engineering.md**

- [ ] Document your coding conventions
- [ ] Define what code is judged against
- [ ] Include: naming, error handling, testing expectations, style

**Result:** Planning skills load direction.md; implementation skills load engineering.md.

### 4. Convert Commands to Skills

For each command in your V1 system:

- [ ] Create a SKILL.md file with proper frontmatter:

```yaml
---
name: review
description: Review code changes for quality, security, and adherence to engineering.md
allowed-tools: [Read, Grep, Glob]
---
```

- [ ] Ensure description is third-person and explains WHEN to use
- [ ] Move implementation to the body
- [ ] Link to references rather than inlining large context

**Result:** Skills with progressive disclosure — metadata always loaded, body on trigger.

### 5. Define Subagents

For isolated tasks that benefit from fresh context:

- [ ] Create `.claude/agents/*.md` files
- [ ] Define clear boundaries (what the agent does, what tools it has)
- [ ] Consider: reviewers, testers, researchers, specialized validators

**Result:** Subagents run with fresh context, no bleeding from main conversation.

### 6. Implement Hooks

Add guarantees that can't be forgotten:

- [ ] Create `.claude/settings.json` with hook configuration
- [ ] Implement hooks for your critical guarantees:

| Hook Type | Use Case |
|-----------|----------|
| **PreToolUse** | Block dangerous operations (rm -rf, credential access) |
| **PostToolUse** | Run linter/type-check after code changes |
| **SessionStart** | Inject context at conversation start |
| **Stop** | Ensure tests pass before session ends |

- [ ] Exit code 2 = block the action
- [ ] Test hooks manually before relying on them

**Result:** Guarantees that can't be bypassed, unlike rules which can be ignored.

## Validation

### 7. Audit Skill Coverage

- [ ] Map your workflows to skills
- [ ] Ensure each skill has: name, description, allowed-tools
- [ ] Remove skills that aren't earning their place
- [ ] Add skills for repeated workflows you run manually

### 8. Test Hook Guarantees

For each hook:

- [ ] Trigger the condition it guards against
- [ ] Verify it blocks/runs as expected
- [ ] Check logs for hook execution

### 9. Verify Context Loading

- [ ] Confirm steering docs load when expected
- [ ] Check that references load on demand (not always)
- [ ] Validate progressive disclosure is working

## Advanced (Optional)

### 10. Workflow Automation

If you have repeatable multi-step workflows:

- [ ] Consider headless scripts (`claude -p`) for automation
- [ ] Explore SDK integration for programmatic control
- [ ] Set up CI pipelines for validation
- [ ] Evaluate Archon for complex orchestration

### 11. Meta-Skills

Build skills that build skills:

- [ ] `skill-creator` — generates new skills from descriptions
- [ ] `review-skill` — reviews skill quality
- [ ] `rules-check-drift` — validates rules file accuracy

## Quick Reference

| V1 Pattern | V2 Equivalent |
|------------|---------------|
| `.agents/commands/foo.md` | `.claude/skills/foo/SKILL.md` |
| Inline rules | `.claude/references/` + on-demand loading |
| Manual validation | PostToolUse hooks + CI |
| Global context | Steering documents (direction.md, engineering.md) |
| Commands | Skills with frontmatter |

## Migration Complete

When you've worked through this checklist:

- Your folder structure is V2-standard
- Rules file is lean with on-demand references
- Steering documents define project direction
- Skills have proper frontmatter and progressive disclosure
- Hooks provide deterministic guarantees
- Subagents handle isolated tasks

Your V1 knowledge transfers — you've reorganized it into the V2 framework.
