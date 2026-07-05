#!/usr/bin/env python3
"""Extract a single version's section from CHANGELOG.md for release notes."""
import re
import sys
from pathlib import Path


def extract(changelog_text: str, version: str) -> str:
    pattern = re.compile(
        rf'^## \[{re.escape(version)}\].*?\n(.*?)(?=^## \[|\Z)',
        re.MULTILINE | re.DOTALL,
    )
    match = pattern.search(changelog_text)
    if not match:
        raise SystemExit(f"No CHANGELOG entry found for version {version}")

    body = match.group(1)
    # Drop the trailing reference-link line and "---" separator.
    lines = [
        line for line in body.split('\n')
        if not line.startswith(f'[{version}]:') and line.strip() != '---'
    ]
    return '\n'.join(lines).strip() + '\n'


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: extract_changelog.py <version>", file=sys.stderr)
        return 1

    version = sys.argv[1].lstrip('v')
    repo_root = Path(__file__).parent.parent
    changelog_text = (repo_root / "CHANGELOG.md").read_text(encoding="utf-8")
    print(extract(changelog_text, version), end='')
    return 0


if __name__ == "__main__":
    sys.exit(main())
