# Tech Lead Command Center — Build Spec

Paste this file into Claude Code to scaffold your full workspace.
Run it once from the directory where you want your workspace to live.

---

## Prompt to paste into Claude Code

```
I want you to build a "Tech Lead Command Center" workspace for me. 
This is a personal AI workspace powered by Claude Code that I'll use as a daily driver.

Create the following file structure and file contents exactly as specified below.
After creating all files, confirm what was created and give me the initialization checklist.

---

## Step 1: Copy CLAUDE.md

Copy the CLAUDE.md from this repository into the workspace root.
This is the master config — it defines all roles and slash commands.

---

## Step 2: Create the full file structure with starter content

Create each file listed below with the exact starter content provided.

### inbox.md
---
# Inbox — Quick Capture

Add anything here. One item per line. Run /triage to process.

---

### parking-lot.md
---
# Parking Lot

Items parked here were not deleted — they may matter later.
Format: [Date] | [Item] | [Why parked]

---

### context/stakeholders.md
---
# Stakeholders

Key relationships in priority order. Update after every significant interaction.
Run /debrief after meetings to keep this current.
Run /relationship-check weekly to surface anyone you've neglected.

## Template (copy per person)

### [Full Name]
- **Role:** 
- **What they care about most:** 
- **Their relationship to your work:** 
- **Communication style:** 
- **What you owe them / they owe you:** 
- **Last contact:** [Date]
- **Relationship temperature:** Warm / Neutral / Cool / Unknown
- **Notes:** 

---

### context/team-roster.md
---
# Team Roster

Your direct reports and close collaborators.
Update after 1:1s, significant conversations, or when you spot a pattern.

## Template (copy per person)

### [Full Name]
- **Role:** 
- **Tenure:** 
- **Strengths:** 
- **Development areas:** 
- **What motivates them:** 
- **What they need from you right now:** 
- **Current project/focus:** 
- **Coaching notes:** 
- **Last 1:1:** [Date]

---

### context/voice-guide.md
---
# Voice Guide

This file trains the Communication Editor role.
The more specific you are, the better your drafts will be.

## Step 1: Paste examples (5–10 pieces of writing you're proud of)

These can be: emails, Slack messages, posts, docs, presentations.
Paste them below. Label each one.

### Example 1 — [type/context]
[paste here]

### Example 2 — [type/context]
[paste here]

[continue...]

---

## Step 2: Add explicit style notes (fill these in)

**Tone:** [e.g. warm but direct, never effusive]
**Default register:** [e.g. conversational in Slack, slightly more formal in email]
**Phrases I use often:** [e.g. "the honest answer is...", "worth naming..."]
**Phrases I avoid:** [e.g. "circle back", "synergize", "move the needle"]
**In conflict or difficult situations, I tend to:** [describe]
**In celebration or recognition, I tend to:** [describe]
**My exec communication style:** [e.g. lead with recommendation, 3 bullets max, clear ask]
**One piece of writing that perfectly captures my voice:** [link or paste]

---

### context/org-context.md
---
# Org Context

Living document of how this organization works.
Update as you learn. Don't wait until it's "complete."

## Org Structure
[Sketch the reporting structure relevant to you — even rough is useful]

## Key Teams and What They Own
- **[Team name]:** 
- **[Team name]:** 

## How Decisions Get Made
[Formal process vs. how it actually works]

## Cultural Dynamics
- What gets celebrated here: 
- What gets avoided or punished: 
- What's unspoken but important: 

## Political Landscape
[Who has informal power. Where the alliances are. Where the friction is.]

## What I've Learned (running notes)
[Add entries as you learn — date each one]

---

### 90day/goals.md
---
# 90-Day Plan

## By Day 30 — Listen, Map, Build Trust
**Goals:**
- 
- 
- 

**Success looks like:**
- 

**Relationships to establish:**
- 

---

## By Day 60 — Understand, Structure, Early Direction
**Goals:**
- 
- 
- 

**Success looks like:**
- 

**Platform/technical direction to clarify:**
- 

---

## By Day 90 — Lead, Deliver, Be Credible
**Goals:**
- 
- 
- 

**Success looks like:**
- 

**First deliverables:**
- 

---

## What "good" looks like at 90 days
[Write this in your own words — what would make you feel the first chapter was a success?]

---

### 90day/progress.md
---
# 90-Day Progress Log

Weekly entries + context dumps.
Most recent at the top.

## [Date] — Week [N] / Day [N]
### Wins this week
- 

### Blockers or friction
- 

### What I'm learning
- 

### Momentum check
Am I building the right foundations, or just staying busy? [honest answer]

### Next week's focus
- 

---

### energy/commitments.md
---
# Energy Tracker — Current Week

Week of: [Date]

Run /energy to get a scored load analysis.

| Commitment | Type | Points | Notes |
|------------|------|--------|-------|
| | | | |
| **Total** | | | |

## Scoring reference
| Type | Points |
|------|--------|
| Major presentation / exec meeting | 3 |
| Conflict / difficult conversation | 2 |
| New initiative ownership | 2 |
| Late meeting / travel | 2 |
| Standard meeting (≥1hr) | 1 |
| Deep work block protected (≥2hr) | −1 |

## Load zones
- 🟢 0–4 pts: Sustainable
- 🟡 5–7 pts: Manage carefully
- 🔴 8–10 pts: Overloaded — something must move
- 🚨 11+ pts: Critical — escalate trade-off conversation

---

## Step 3: Create empty directories with .gitkeep files

Create the following directories (empty, ready to receive files):
- decisions/
- bragdoc/
- reports/weekly/
- reports/platform/

---

## Step 4: Confirm and orient

After creating all files, output:

1. A confirmation list of every file created
2. The initialization checklist from CLAUDE.md
3. This message:

"Your workspace is scaffolded. Here's where to start:

**Right now (takes 15 minutes):**
Fill in context/voice-guide.md — paste 5+ pieces of writing and add the style notes. 
Everything else depends on your voice being captured correctly.

**Today:**
Fill in context/stakeholders.md with your top 5 relationships.
Add this week's commitments to energy/commitments.md.

**This week:**
Fill in 90day/goals.md and context/org-context.md as you learn.

**When ready:**
Configure your Calendar MCP first — it unlocks /morning and /energy immediately.
Add other integrations only when you feel the friction.

Run /morning to start."
```

---

## Notes on this spec

**Why file-based and not a database:**
Markdown files are portable, versionable, readable without Claude, and survive tool changes.
You own your data completely.

**Why no UI:**
Terminal + Claude Code is faster than any UI for this use case.
The "interface" is your slash commands — they're instant and composable.

**MCP setup (do this separately, not during scaffold):**
1. Calendar MCP — install first, highest immediate value
2. Email MCP — install second for /triage
3. Jira or Linear MCP — install when /platform feels slow without it
4. Slack MCP — optional, only if /team-pulse becomes important

Resources: https://github.com/modelcontextprotocol/servers

**Versioning:**
Put your workspace in a private git repository.
Commit daily with `git add -A && git commit -m "daily sync [date]"`.
This gives you a full history of your thinking and decisions over time.

**The one rule:**
The system earns complexity. Run /morning and /eod for one week before adding anything.
Add integrations and new commands only where you feel the friction.
