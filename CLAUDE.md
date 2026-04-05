# CLAUDE.md — AI Assistant Guide

## Repository Overview

This is a **GitHub Skills** course repository: [Introduction to GitHub](https://github.com/skills/introduction-to-github). It is a template-based interactive learning course that teaches GitHub fundamentals (branches, commits, pull requests, merging) through a guided, step-by-step workflow driven entirely by GitHub Actions.

There is no application code. The repository's purpose is educational scaffolding.

---

## Repository Structure

```
.
├── README.md                        # Dynamic course README — content changes per step
├── LICENSE                          # MIT license
├── .gitignore                       # Standard ignore rules (compiled files, OS artifacts, archives, logs)
├── images/                          # Screenshot assets referenced in step instructions
│   ├── code-tab.png
│   ├── create-branch-button.png
│   ├── create-new-file.png
│   ├── commit-full-screen.png
│   ├── compare-and-pull-request.png
│   ├── pull-request-branches.png
│   ├── Green-merge-pull-request.png
│   ├── delete-branch.png
│   ├── main-branch-dropdown.png
│   ├── my-profile-file.png
│   └── profile-readme-example.png
└── .github/
    ├── dependabot.yml               # Keeps GitHub Actions dependencies updated monthly
    ├── steps/                       # Markdown content injected into README per step
    │   ├── -step.txt                # Current step tracker (contains: 0, 1, 2, 3, 4, or X)
    │   ├── 0-welcome.md
    │   ├── 1-create-a-branch.md
    │   ├── 2-commit-a-file.md
    │   ├── 3-open-a-pull-request.md
    │   ├── 4-merge-your-pull-request.md
    │   └── X-finish.md
    └── workflows/                   # GitHub Actions — one per course step
        ├── 0-welcome.yml
        ├── 1-create-a-branch.yml
        ├── 2-commit-a-file.yml
        ├── 3-open-a-pull-request.yml
        └── 4-merge-your-pull-request.yml
```

---

## How the Course Works

### Step Tracking

The current step is stored as a single value in `.github/steps/-step.txt`. Valid values:

| Value | Meaning |
|-------|---------|
| `0`   | Welcome — waiting for learner to set up |
| `1`   | Learner must create branch `my-first-branch` |
| `2`   | Learner must commit a file to `my-first-branch` |
| `3`   | Learner must open a pull request from `my-first-branch` |
| `4`   | Learner must merge the pull request |
| `X`   | Course complete |

### Step Progression

Each workflow checks `.github/steps/-step.txt` to confirm the learner is on the expected step, then uses the `skills/action-update-step@v2` action to:
1. Update `-step.txt` to the next step value
2. Replace the current step content in `README.md` with the next step's markdown

### Workflow Triggers

| Workflow | Trigger | Step condition |
|----------|---------|----------------|
| `0-welcome.yml` | Push to `main` | step == 0 |
| `1-create-a-branch.yml` | Branch/tag created | step == 1 AND branch name == `my-first-branch` |
| `2-commit-a-file.yml` | Push to `my-first-branch` | step == 2 |
| `3-open-a-pull-request.yml` | PR opened/reopened | step == 3 AND head ref == `my-first-branch` |
| `4-merge-your-pull-request.yml` | Push to `main` | step == 4 |

All workflows are also triggerable via `workflow_dispatch` for manual testing.

### Key Branch

The learner branch that drives the entire exercise is **`my-first-branch`**. The name is hardcoded in the workflows — it must match exactly.

---

## Development Conventions

### README.md

`README.md` is **auto-managed** by GitHub Actions. Do not manually edit it to change course content. The step content is injected from `.github/steps/` files by `skills/action-update-step@v2`.

### Step Content Files (`.github/steps/*.md`)

These are the source of truth for course instructions. Edits here will take effect when the step action next injects them into README. Format is plain GitHub-flavored Markdown with HTML comments for author notes.

### Workflow Permissions

All workflows require:
```yaml
permissions:
  contents: write  # to update README.md and -step.txt
```

### Dependabot

GitHub Actions dependencies are updated on a **monthly** schedule via `.github/dependabot.yml`. Currently pinned actions: `actions/checkout@v4`, `skills/action-update-step@v2`.

---

## Current State

As of last analysis, `.github/steps/-step.txt` contains `X` — the course is **complete**. The git log shows the full learner journey was executed:

```
42324eb  Update to X in STEP and README.md   ← course finished
7f98057  My first branch (#1)                ← PR merged
a06a748  Update to 4 in STEP and README.md
a507b99  Update to 3 in STEP and README.md
4c580f4  Update to 2 in STEP and README.md
7926890  Update to 1 in STEP and README.md
ff55ece  Initial commit
```

---

## Software Development Principles (Living Guide)

These principles govern how all software in this repository is built. They exist to make code understandable, maintainable, and safe to change — whether written by a human or AI. Claude Code must follow these in every task.

---

### 1. Git Workflow — How Work Flows Safely

**The rule:** `main` is always stable. All work happens on branches.

```
main          ← always deployable, protected
  └── feature/add-login     ← one branch per feature or fix
  └── fix/broken-header     ← merged via pull request, then deleted
```

**Conventions:**
- Branch names: `feature/`, `fix/`, `docs/`, `refactor/` prefixes
- Commit messages: imperative mood, short, describe *what and why* — e.g. `Add user login form` not `stuff`
- One logical change per commit — don't bundle unrelated things
- Pull requests are for review, not just merging — always write a clear description

**Why this matters for leaders:** A messy git history means you can't trace when or why something broke. A clean history is your audit trail.

---

### 2. Code Quality — What Good Code Looks Like

**The rule:** Code is read far more than it is written. Optimize for the next reader.

**Conventions:**
- Names should reveal intent — `getUserById()` not `getData()`
- Functions do one thing — if you need "and" to describe it, split it
- No magic numbers — `const MAX_RETRIES = 3` not just `3`
- Delete dead code — don't comment it out, that's what git is for
- Keep files short and focused — if a file is doing too much, it probably is

**The smell test:** If you have to explain what a piece of code does, it should be rewritten to be self-explanatory.

**Why this matters for leaders:** Unreadable code slows every future hire. Readable code is a gift to your team's future selves.

---

### 3. Testing — Your Safety Net

**The rule:** Untested code is not done. Tests are what let you change code without fear.

**Types you need to know:**
- **Unit tests** — test one function in isolation, fast, no network/DB
- **Integration tests** — test that two components work together
- **End-to-end (E2E) tests** — simulate a real user journey

**Conventions:**
- Write tests alongside code, not after
- Test behaviour, not implementation — test what it does, not how
- A test that always passes is worthless; make sure it can fail
- Aim for tests that run in seconds, not minutes

**Why this matters for leaders:** Teams without tests move fast and break things. Teams with good tests move fast and stay confident.

---

### 4. CI/CD — Automating Quality Gates

**The rule:** Computers should enforce standards, not humans. Automate everything repeatable.

**What a basic pipeline does:**
```
push code → run tests → check code style → deploy (if all pass)
```

**Conventions:**
- No code merges to `main` unless CI passes
- Failing CI is a team emergency — fix it before adding new features
- Keep pipelines fast (under 10 minutes) or developers ignore them
- Use Dependabot or similar to keep dependencies updated automatically

**Why this matters for leaders:** Manual QA gates become bottlenecks. Automated gates scale with your team.

---

### 5. Working With AI (Claude Code) — Leverage Without Dependency

**The rule:** AI amplifies your intent. Garbage in, garbage out. You are the architect; Claude is the builder.

**How to get the best results:**
- Be specific about *what* and *why*, not just *what* — context produces better code
- Always review what Claude produces — read it, question it, own it
- Use Claude to explain code you don't understand — "explain this line by line"
- Ask Claude to suggest alternatives — "what are the tradeoffs here?"
- If something feels wrong, it probably is — ask Claude to defend its choices

**Red flags to watch for in AI-generated code:**
- Functions that do too many things
- Missing error handling at system boundaries (user input, API calls)
- No tests generated alongside features
- Overly clever solutions that are hard to follow

**CLAUDE.md is your contract with AI:** What's in this file shapes every session. Keep it current.

**Why this matters for leaders:** Teams that review AI output thoughtfully ship better software than those who accept it blindly — and far better than those who avoid it entirely.

---

### 6. Documentation — The Right Amount

**The rule:** Document decisions, not mechanics. Code shows *what*; docs explain *why*.

**Conventions:**
- `README.md` — how to set up and run the project (audience: new team member)
- `CLAUDE.md` — AI assistant context and team conventions (audience: Claude + devs)
- Inline comments — only for non-obvious logic ("why" not "what")
- Architecture decisions — note significant choices and the tradeoffs considered

**Why this matters for leaders:** Every undocumented decision will be re-litigated by the next person. Good docs prevent that.

---

## Learning Path (for this repo's owner)

Progress through these phases as you build things here:

| Phase | Focus | You'll be able to... |
|-------|-------|----------------------|
| **1. Foundation** | Git, branches, PRs, commits | Track and review all changes safely |
| **2. Code Reading** | Quality principles, naming, structure | Spot red flags in code review |
| **3. Automation** | GitHub Actions, CI/CD | Set up pipelines that enforce standards |
| **4. Testing** | Unit/integration basics | Ask the right questions about test coverage |
| **5. AI Leadership** | Prompting, reviewing, governing AI use | Guide your team's AI workflow wisely |

---

## Key Constraints for AI Assistants

- **Do not modify `README.md` directly** for course content changes — edit the appropriate `.github/steps/*.md` file instead.
- **Do not change `-step.txt`** manually unless intentionally resetting the course state.
- **Branch name `my-first-branch` is hardcoded** across all workflows — renaming it requires updating all four affected workflow files.
- **No build system, no tests, no package manager** — there is nothing to install or run locally.
- **All automation runs in GitHub Actions** — local execution of the course logic is not applicable.
- The `images/` directory contains binary PNG files; avoid modifying them unless replacing a specific screenshot.
