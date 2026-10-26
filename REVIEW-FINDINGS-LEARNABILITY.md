# Learner Advocate Review Findings

## Summary
- Docs reviewed: 22/22
- GREEN: 12 | YELLOW: 8 | RED: 2

## Critical Findings (RED)

### primitives/overview.md
**Problem:** Uses undefined jargon immediately and assumes knowledge of what "AI Layer" means.
**Where I got stuck:** Lines 6 and 22 refer to "AI Layer" without ever defining it. As a new learner, I don't know what this is.
**What I needed:** A one-sentence definition before using the term. "AI Layer" appears before I've read Phase 1 which introduces it.
**Suggested fix:** Add a brief definition in the opening paragraph: "The five primitives are the atoms of agentic coding — the smallest meaningful pieces you compose into your **AI Layer** (the system you build around your coding agent to make it work your way)."

### primitives/mcp-tools.md
**Problem:** Assumes readers already understand what MCP stands for and how client-server architecture works in this context.
**Where I got stuck:** Line 7 expands MCP to "Model Context Protocol" but doesn't explain what that actually means. Line 23-27 talks about "client and server" but I don't understand the relationship.
**What I needed:** A concrete example or analogy before diving into technical architecture. What problem does MCP solve?
**Suggested fix:** Add a "Why This Exists" section before "What a Server Is": "Without MCP, your agent can read files and run commands, but it can't check your Jira tickets, query your database, or browse a live webpage. MCP bridges that gap by letting tools expose their capabilities to your agent in a standard way."

## Minor Findings (YELLOW)

### index.mdx
**Friction point:** Line 22 says "organized for lookup rather than sequential learning" but then line 26 says "Start with [The Five Primitives]" which feels contradictory. Am I supposed to read sequentially or jump around?
**Suggested fix:** Clarify the dual purpose: "Use this alongside the videos for deep dives (lookup), OR start with [The Five Primitives] if you're exploring without the course (learning path)."

### primitives/rules.md
**Friction point:** Line 10 references "one study found roughly 44% adherence at just ten instructions" but doesn't cite it. As a learner trying to understand if this is real or marketing, I want proof.
**Suggested fix:** Add a footnote or inline citation with a link to the research.

**Friction point:** Lines 25-30 introduce AGENTS.md vs CLAUDE.md distinction, but then immediately dive into "nesting behavior" which feels like advanced content too early. I'm still trying to understand which file to use.
**Suggested fix:** Move nesting behavior to the end of the section after the reader understands the basic choice.

### primitives/subagents.md
**Friction point:** Line 58 says "That generality is their ceiling. **Yours has no such constraint.**" This assumes I know I'm going to build custom subagents. But I'm still learning what subagents are.
**Suggested fix:** Signal this more gently: "Once you understand how the built-ins work, you can beat them by being ruthlessly specific to your needs."

### primitives/skills.md
**Friction point:** Lines 88-97 introduce "ast-grep" as an example of teaching the agent a tool, but doesn't explain what ast-grep is or why I'd care about structural code search. Lost the thread.
**Suggested fix:** Either explain ast-grep in one sentence ("a tool for finding code patterns structurally, not by text"), or use a more universally known example like "git" or "pytest."

### phases/phase-1.md
**Friction point:** Line 12 mentions "Layer 1 / Layer 2" and "R-PIV loop" but doesn't define them here. I have to keep reading to find out.
**Suggested fix:** Add parenthetical definitions on first use: "Layer 1 / Layer 2 (stable context vs per-feature planning)" and "R-PIV loop (Research → Plan → Implement → Validate)."

### workflow/overview.md
**Friction point:** Line 40 says "Point it at **one run**" but I don't know what "one run's artifacts" means yet. What artifacts? Where are they?
**Suggested fix:** Add concrete examples: "one run's artifacts (the plan, the code diff, the test output, the review report)."

### workflow/archon.md
**Friction point:** The entire document assumes I already understand what Archon is. The opening line "Your orchestrator holds the loop while doing five other jobs" assumes I've built an orchestrator already.
**Suggested fix:** Add a 2-sentence intro: "Archon is a workflow engine designed specifically for agentic coding workflows. Unlike using a skill or script to orchestrate other skills, Archon provides a graph-based approach where you never learn a new system — your existing skills become nodes."

### steering/overview.md
**Friction point:** Line 8 says "They're reference docs your rules file points to" but doesn't show HOW to point to them until line 42-52.
**Suggested fix:** Show the pattern earlier, right after introducing the concept.

### v1-delta/what-changed.md
**Friction point:** Heavy density of information. The term mapping table at line 157 is helpful but comes very late. I'm drowning in details before seeing the big picture.
**Suggested fix:** Move the "What's Actually New vs. Renamed" section (lines 167-185) to the top, right after "Course Structure." This helps me triage what I need to learn vs what I already know.

## Learning Flow Issues

### Circular Dependencies
- **index.mdx** (line 26) tells me to start with primitives/overview
- **primitives/overview.md** (line 76) tells me to see "Phase 2: The Primitives" to understand when they're taught
- **phases/phase-2.md** (line 34) tells me to see the primitives section for deep dives

**Resolution:** This works as a reference loop, but as a learner it feels circular. Add explicit guidance: "If you're taking the course, let the videos guide you. If you're exploring on your own, start here."

### Forward References Without Context
Many docs reference concepts before defining them:
- "Progressive disclosure" mentioned in skills.md line 74 before being explained
- "Layer 1 / Layer 2" used throughout before formal definition
- "R-PIV loop" mentioned before expansion

**Resolution:** Either define inline on first use, or add a glossary page that defines all key terms with links.

### Missing "Why Now?" Signaling
Several advanced topics (Archon, SDK, CI pipelines) appear without clear signals about when a learner should care:
- workflow/headless-sdk-ci.md dumps five different approaches without helping me understand which to learn first
- workflow/archon.md assumes I've hit the limits of simpler approaches

**Resolution:** Add "When You Need This" boxes at the top of advanced docs: "You need Archon when: your orchestrator skill is doing 5+ jobs and losing track of context."

## Navigation Gaps

### No Clear "Next Steps" in Some Docs
Some docs end without pointing forward:
- primitives/mcp-tools.md ends at line 125 with key takeaways but no "See Also" pointing to skills (the primitive that uses MCP)
- steering/overview.md has "See Also" but doesn't suggest reading order

**Resolution:** Every doc should end with either "See Also" links OR explicit "What's Next" guidance.

### Skimming Headers Doesn't Tell Full Story
When I skim headers looking for "how do I actually do this?":
- primitives/rules.md has great conceptual headers but I don't see "How to Write a Rules File"
- primitives/subagents.md has "The Four Levers" but headers under it aren't numbered or clearly parallel

**Resolution:** Use more action-oriented headers: "How to Write Your First Subagent" instead of just "Why Author Your Own."

## Clean Docs (GREEN)

These docs teach effectively and a motivated learner would succeed with them alone:

- **primitives/hooks.md** — Opens with a relatable confession, defines the key distinction early (line 12), provides concrete examples, and builds complexity gradually.

- **phases/overview.md** — Clear table, explicit arc, tells me exactly where to start based on my context.

- **phases/phase-1.md** — Concrete deliverables listed upfront, video breakdown with "The One Thing It Lands" column is brilliant.

- **phases/phase-2.md** — Clean structure, the keystone insight (line 59) is well-positioned after I understand the parts.

- **phases/phase-3.md** — The two laws (lines 10-16) frame everything clearly before diving into acts.

- **workflow/headless-sdk-ci.md** — Despite density, the consistent table format for each method makes comparison easy. Line 12 "The steps don't change" is a perfect anchor.

- **steering/direction.md** — The IS/IS NOT pattern is immediately clear, case study shows real usage, clause naming convention is well-explained.

- **steering/engineering.md** — Parallel structure to direction.md makes it easy to understand by analogy.

- **v1-delta/overview.md** — Efficient triage for time-constrained learners (line 31-36).

- **v1-delta/what-still-applies.md** — Reassuring for v1 grads, clear tables show what transfers.

- **v1-delta/migration-checklist.md** — Concrete, actionable, checkboxes invite completion.

- **phases/phase-4.md** — Clear about being optional, tells me how to choose what to read.

## Overall Learnability Assessment

**Strengths:**
- Strong use of tables for comparison and structure
- Consistent voice and conceptual frameworks
- Good use of concrete examples (especially in hooks.md and steering docs)
- Clear delineation of v1 vs v2 for existing learners

**Weaknesses:**
- Assumes too much context in opening paragraphs (define terms inline)
- Forward references create friction for non-sequential reading
- Some advanced topics lack "when you need this" framing
- Missing glossary for key repeated terms

**Bottom Line:**
A motivated learner with the videos can succeed. A learner using ONLY these docs will get stuck on primitives/overview.md and primitives/mcp-tools.md. The fix is small: define key terms on first use, add a glossary, and signal "advanced" vs "foundational" more clearly.

## Recommendations

### High Priority (Fix These)
1. Add inline definitions for: AI Layer, MCP, R-PIV, Layer 1/Layer 2 on first use in each doc
2. Fix the circular navigation between index → primitives/overview → phases
3. Add "When You Need This" signals to advanced workflow docs
4. Create a glossary page with all key terms

### Medium Priority
5. Move complex details (nesting behavior, advanced patterns) later in docs
6. Add concrete examples to abstract concepts (MCP, progressive disclosure)
7. Cite research claims or remove them
8. Add "See Also" to all docs that lack forward pointers

### Low Priority
9. Number parallel sections consistently (The Four Levers → 1-4)
10. Use more action-oriented headers where appropriate
11. Add visual diagrams to supplement text-heavy sections
