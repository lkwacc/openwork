# Crow5 Upstream Workflow

This fork tracks the upstream OpenWork `dev` branch while keeping Crow5 customizations isolated and mergeable.

## Current branch layout

- `dev`: local mirror of `origin/dev`
- `crow5/dev`: long-lived Crow5 product branch
- `feature/crow5-current-customizations`: current in-progress Crow5 customization branch

## Current remote layout

- `origin`: `https://github.com/lkwacc/openwork.git`
- `upstream`: `https://github.com/different-ai/openwork.git`

## Working rules

1. Do not develop directly on `dev`.
2. Keep `crow5/dev` as the branch that represents the Crow5 product line.
3. Create every new change from `crow5/dev` using a dedicated `feature/*` branch.
4. Merge upstream changes into an `integration/*` branch first, resolve conflicts there, then merge back into `crow5/dev`.
5. Keep branding, invite code logic, Chinese localization, and product-specific UI in separate commits when possible.

## Team archive rules

This file is the branch management archive for Crow5. When multiple people develop in parallel, keep the branch intent stable and documented here.

- `dev`: untouched fork baseline, used only as a reference mirror of `origin/dev`
- `crow5/dev`: Crow5 release branch, only accepts reviewed feature merges and reviewed upstream integrations
- `feature/*`: one branch per feature or bugfix, owned by a single developer at a time
- `integration/upstream-dev-*`: temporary upstream merge rehearsal branches, deleted after merge is complete
- `release/*`: optional stabilization branches for packaged deliveries when needed

For every active branch, keep a short archive entry in the table below.

| Branch | Purpose | Owner | Source branch | Status |
| --- | --- | --- | --- | --- |
| `crow5/dev` | Crow5 main product line | shared | `dev` | active |
| `feature/crow5-current-customizations` | Current Crow5 customization batch | shared | `crow5/dev` | active |
| `integration/upstream-dev-20260316` | First upstream integration rehearsal | shared | `crow5/dev` | active |

Update this table whenever a new feature branch is created, handed over, merged, or abandoned.

## Collaboration rules

1. One developer owns one `feature/*` branch at a time.
2. Never force-push `crow5/dev`.
3. Force-push on `feature/*` is allowed only before review and only by the branch owner.
4. Every merge to `crow5/dev` must come from either:
   - a reviewed `feature/*` branch, or
   - a reviewed `integration/*` branch
5. If two developers edit the same area, create a short note in this file before work starts.
6. If packaging is in progress, branch off `release/*` from `crow5/dev` so feature work can continue in parallel.

## Day-to-day feature flow

```bash
git switch crow5/dev
git pull origin crow5/dev
git switch -c feature/<feature-name>
```

If you want a clean worktree for a feature:

```bash
git worktree add ../openwork-<feature-name> crow5/dev
cd ../openwork-<feature-name>
git switch -c feature/<feature-name>
```

## Sync upstream into Crow5

1. Refresh upstream refs:

```bash
git fetch upstream dev
git fetch origin
```

2. Create an integration branch from Crow5:

```bash
git switch crow5/dev
git switch -c integration/upstream-dev-YYYYMMDD
```

3. Merge upstream:

```bash
git merge upstream/dev
```

4. Resolve conflicts, then verify at minimum:

```bash
pnpm --filter openwork-server typecheck
pnpm --filter openwork-server build:bin
pnpm --filter @different-ai/openwork-ui build
```

5. After verification:

```bash
git switch crow5/dev
git merge integration/upstream-dev-YYYYMMDD
git push origin crow5/dev
```

## Recommended commit split for Crow5

- `feat(crow5): quick actions near Cmd+K`
- `feat(crow5): invite code activation`
- `feat(crow5): standalone invite admin`
- `i18n(crow5): zh/en localization updates`
- `brand(crow5): product naming and assets`

## Current baseline

- Local baseline commit: `a181f58`
- Upstream `dev` remote head when this workflow was set up: `c85fffaae4a0fa285e2205357924e314e6305088`

Before the first upstream merge, commit or stash the in-progress work on `feature/crow5-current-customizations`.
