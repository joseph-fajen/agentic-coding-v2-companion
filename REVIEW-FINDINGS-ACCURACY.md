# Source-of-Truth Review Findings

**Reviewer Role:** Cole Medin proxy / Subject Matter Expert
**Review Date:** 2026-10-26
**Source Material:** v2 branch of agentic-coding-course repository

## Summary

- Docs reviewed: 22/22
- GREEN: 17 | YELLOW: 4 | RED: 1

Overall, the companion site is **highly accurate** to the v2 course source material. Most claims are well-grounded in the scripts, and the structural organization correctly represents the course's teaching arc. There is one material inaccuracy that should be corrected, and several minor issues where wording could be tightened for precision.

---

## Critical Findings (RED)

### primitives/rules.md

**Claim:** "AGENTS.md...stewarded by the Linux Foundation, read by dozens of agents across tens of thousands of repos"

**Issue:** The source material does NOT claim Linux Foundation stewardship. This is an invention or conflation. The v2 course scripts describe AGENTS.md as an "open, cross-tool standard" but do not attribute stewardship to the Linux Foundation.

**Source says:** V13 script (rules primitive) states: "AGENTS.md is the **open standard** — the format multiple agents recognize, a shared convention. CLAUDE.md is Claude's native version." The V17 MCP script notes the "official MCP registry" and that MCP is "an open standard" but makes no Linux Foundation attribution. The V19 skills script discusses "the open SKILL.md standard" published by Anthropic and adopted by OpenAI.

**Location:** `phase_2/V13_the-rules-primitive/script.md`, lines discussing AGENTS.md

**Suggested fix:** Change to "AGENTS.md | The open, cross-tool standard — recognized by multiple coding agents" or simply "The open, cross-tool standard for agent instructions". Remove the Linux Foundation claim entirely unless a source can be verified.

---

## Minor Findings (YELLOW)

### primitives/overview.md

**Claim:** "Five primitives compose into your AI Layer"

**Issue:** While accurate, the source material consistently uses "harness" as the primary term with "AI Layer" / "Layer 1" as synonyms. The overview could be tighter by leading with "harness" to match the V12 emphasis.

**Source says:** V12 script states: "There's a clean way to say this that the field landed on this year — **Agent equals Model plus Harness.**" and "The AI Layer — Layer 1 — you set up in Phase 1? That's your harness."

**Suggested fix:** Consider adding "Your harness — also called your AI Layer — is built from five primitives" to match the course's framing hierarchy.

---

### primitives/hooks.md

**Claim:** The doc does not mention the specific hook events available.

**Issue:** The source material (V21) explicitly lists the "stable core" of hook events: PreToolUse, PostToolUse, UserPromptSubmit, SessionStart, Stop, SubagentStop, PreCompact, Notification, SessionEnd. While the doc correctly describes the can-block-vs-observe distinction, it omits the specific event menu.

**Source says:** V21 script states: "hooks fire on a handful of lifecycle events — **PreToolUse** (before a tool), **PostToolUse** (after), **UserPromptSubmit** (your prompt, before the model sees it — scan it, add context), **SessionStart** (load context every session), **Stop** (the agent tries to finish), **Notification** (it needs you)."

**Location:** `phase_2/V21_the-hooks-primitive/script.md`, beat 4

**Suggested fix:** Add a brief event menu to the hooks doc to match the source's explicit naming.

---

### workflow/archon.md

**Claim:** The doc accurately describes Archon but could emphasize the "mapping card" insight more prominently.

**Issue:** The V32 script's marquee moment is the mapping card: showing how everything the student built in Phase 3 (scripts, skills, context decisions, gates, caps) maps directly to Archon concepts. This is described as "the act's inventory becomes Archon's vocabulary." The companion site covers this but doesn't frame it with the same "you already built the parts" emphasis.

**Source says:** V32 script states: "Look at that list again. You didn't just learn five ways to automate — you hand-built the parts of a workflow engine. Archon is those parts, load-bearing."

**Location:** `phase_3/V32_what-archon-is/script.md`, beat 2

**Suggested fix:** Strengthen the "you already built these" framing to match the course's key thesis.

---

### v1-delta/what-changed.md

**Claim:** "35 numbered videos (V01-V35) + Phase 4 async"

**Issue:** This is accurate, but the Phase 1 folder actually contains V01-V11 (11 videos), Phase 2 contains V12-V23 (12 videos), and Phase 3 contains V24-V35 (12 videos), totaling 35. However, the course folder structure shows V02.5 exists (`V02.5_coding-agent-basics`), which the doc doesn't mention.

**Source says:** The `phase_1/` directory contains: V01, V02, V02.5, V03-V11 (12 entries but V02.5 is a partial/supplemental video)

**Suggested fix:** Minor clarification: acknowledge V02.5 exists as a supplemental basics video, or verify the exact intended numbering with Cole.

---

## Clean Docs (GREEN)

The following docs are accurate to source material with no material errors:

- **index.mdx** (Home) - Accurate framing of the course purpose and structure
- **primitives/subagents.md** - Accurately represents the four-hop flow, four levers, and "author the output" thesis from V15
- **primitives/mcp-tools.md** - Correctly describes MCP as "USB-C for AI", the skill+CLI alternative, and security considerations from V17
- **primitives/skills.md** - Accurately represents progressive disclosure, the skill+CLI marquee, and take-vs-build heuristic from V19
- **phases/overview.md** - Correct four-phase arc (Use -> Understand -> Evolve -> Scale)
- **phases/phase-1.md** - Accurately describes the "Create Your First System" phase and PIV loop
- **phases/phase-2.md** - Correctly represents "The Primitives of Agentic Engineering" content
- **phases/phase-3.md** - Accurately describes "Improve & Scale Your System" and workflow automation
- **phases/phase-4.md** - Correctly frames the async/advanced content
- **workflow/overview.md** - Accurate representation of the workflow automation progression
- **workflow/headless-sdk-ci.md** - Correctly describes the "claim vs evidence" distinction and context control from V27
- **steering/overview.md** - Accurately introduces steering documents concept
- **steering/direction.md** - Correctly describes direction.md as "what the project IS and IS NOT"
- **steering/engineering.md** - Accurately describes engineering.md as "what code is judged against"
- **v1-delta/overview.md** - Correct framing of the v1->v2 relationship
- **v1-delta/what-still-applies.md** - Accurately identifies unchanged concepts (PIV loop, validation pyramid, rules principles)
- **v1-delta/migration-checklist.md** - Practical and aligned with MIGRATION.md source

---

## Notes on Source Verification

### Strongly Verified Claims

1. **"Agent = Model + Harness"** - Directly quoted in V12 script, attributed to Mitchell Hashimoto (2026)
2. **Five primitives in composition order** - Explicitly taught in V12 and reinforced throughout Phase 2
3. **"A rule asks; a hook guarantees"** - Verbatim thesis from V21
4. **Progressive disclosure three tiers** - Explicitly taught in V19 with token estimates
5. **"Skills orchestrate CLIs"** - Verbatim from V19 marquee beat
6. **Tool Search / defer loading** - Verified in V17 with ~85% reduction claim (Anthropic source)
7. **Fresh vs persistent context** - Core teaching in V27 with `--resume` flag explanation

### Claims That Required Careful Verification

1. **SKILL.md as "open standard"** - V19 script confirms: "published by Anthropic (Dec 2025), adopted by OpenAI; cross-tool"
2. **Hook exit code semantics** - V21 confirms exit 2 = block, with specific events that honor blocking
3. **MCP security warnings** - V17 cites specific sources: Invariant Labs, NSA CSI, six-agency advisory
4. **"Build the thing that builds the thing"** - V12 and V19 both teach this as the universal arc

### Cross-Tool Claims Verified

The companion site correctly maintains tool-agnostic framing while using Claude Code as the example, matching the course's approach. Claims about other tools (Codex, Cursor, Gemini CLI) are appropriately soft-pedaled as "comparable" rather than making specific feature claims.

---

## Recommendations

1. **Fix the Linux Foundation claim immediately** - This is the only material inaccuracy that could mislead readers
2. **Consider adding the hook event menu** - Would make the hooks doc more complete
3. **Strengthen the Archon "you built the parts" framing** - This is the course's key insight for that section
4. **Minor: Verify V02.5 handling** - Clarify whether this counts toward the video total

---

*Review conducted by: Claude (Opus 4.5) acting as Cole Medin proxy*
*Method: Systematic cross-reference of all 22 companion docs against v2 branch course scripts*
