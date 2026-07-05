# Agent Rules

This repo uses [whiting](https://github.com/luxsolari/whiting) for release
discipline. The following rules apply to human contributors and AI agents
alike.

## Conventional Commits

Every commit subject line must follow:

```
type(scope)!: description
```

Allowed types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build`
`ci` `chore` `revert`. `scope` is optional. A `!` before the colon, or a
`BREAKING CHANGE:` footer in the body, marks a breaking change.

This is enforced locally by a `commit-msg` hook, and direct pushes to
`main` are blocked by a `pre-push` hook (see below). After
cloning, activate both once with:

```
git config core.hooksPath scripts/hooks
git config whiting.defaultbranch main
```

Both settings are local, unversioned git config — every clone needs to run
this once; it isn't inherited from the remote.

## Semver-bump discipline

Version numbers are never hand-edited. The next version is derived from
commits since the last tag via `scripts/suggest_version_bump.py` (`feat` →
minor, `fix` → patch, breaking → major). Git tags are the source of truth
for "what version is this."

## Changelog-first workflow

Every user-facing change adds an entry under `## [Unreleased]` in
`CHANGELOG.md`, in the same commit or PR that makes the change. No
undocumented changes.

## No direct pushes to main

Land changes via a branch and a pull request. Direct pushes to
`main` are blocked locally by a `pre-push` hook.
