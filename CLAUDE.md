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

## Key Constraints for AI Assistants

- **Do not modify `README.md` directly** for course content changes — edit the appropriate `.github/steps/*.md` file instead.
- **Do not change `-step.txt`** manually unless intentionally resetting the course state.
- **Branch name `my-first-branch` is hardcoded** across all workflows — renaming it requires updating all four affected workflow files.
- **No build system, no tests, no package manager** — there is nothing to install or run locally.
- **All automation runs in GitHub Actions** — local execution of the course logic is not applicable.
- The `images/` directory contains binary PNG files; avoid modifying them unless replacing a specific screenshot.
