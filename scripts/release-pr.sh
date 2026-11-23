#!/usr/bin/env bash
# Builds the branch for a stage -> production pull request.
#
# production is squash-merged, so stage's own commits never become part of its history and a PR
# straight from stage lists every commit since the two branches split. This script makes one
# commit on top of origin/production that holds stage's code with production's own protected
# files (see CLAUDE.md), and pushes it as release/<date>. Open the PR from that branch: it shows
# only this release, and squash-merging it gives the same single commit.
#
# Usage: bash scripts/release-pr.sh [branch-name]
# Your working tree and current branch are not touched.
set -euo pipefail

PROTECTED=(
  .dockerignore
  Dockerfile
  docker-compose.production.yml
  docker-compose.stage.yml
  eslint.config.js
  index.html
  nginx.conf
  docs/DEVELOPER_GUIDE.md
  docs/site-docs
  .gitignore
)

branch="${1:-release/$(date +%Y-%m-%d)}"
git fetch -q origin production stage

stage=$(git rev-parse --short origin/stage)
# The previous release records the stage commit it shipped ("Brings stage (abc1234)").
prev=$(git log --format=%B origin/production | sed -n 's/.*stage (\([0-9a-f]\{7,\}\)).*/\1/p' | head -1)

index=$(mktemp)
trap 'rm -f "$index"' EXIT
export GIT_INDEX_FILE="$index"
git read-tree origin/stage
for p in "${PROTECTED[@]}"; do
  git rm -r -q -f --cached --ignore-unmatch -- "$p" >/dev/null # temp index only
  git ls-tree -r origin/production -- "$p" | git update-index --index-info
done
tree=$(git write-tree)
unset GIT_INDEX_FILE

if [ "$tree" = "$(git rev-parse 'origin/production^{tree}')" ]; then
  echo "Nothing to release: production already matches stage ($stage)."
  exit 0
fi

{
  echo "Release stage to production"
  echo
  echo "Brings stage ($stage) into production."
  if [ -n "$prev" ] && git cat-file -e "$prev^{commit}" 2>/dev/null; then
    echo
    echo "Changes since the last release (stage $prev):"
    git log --no-merges --format='- %s' "$prev..origin/stage"
  fi
  echo
  echo "Production keeps its own ${PROTECTED[*]}."
} >"$index.msg"

commit=$(git commit-tree "$tree" -p origin/production -F "$index.msg")
rm -f "$index.msg"
git push -q origin "$commit:refs/heads/$branch"

echo "Pushed $branch: one commit on top of production, stage $stage."
git diff --stat origin/production "$commit" | tail -1
if ! git diff --quiet origin/production origin/stage -- nginx.conf; then
  echo "Note: nginx.conf differs between stage and production. If this release adds a page,"
  echo "add its route to production's nginx.conf in this branch and use the allow-protected-files label."
fi
repo=$(git remote get-url origin | sed -E 's#^(https://)?([^@]*@)?#https://#; s#git@github.com:#https://github.com/#; s#\.git$##')
echo "Open the PR: $repo/compare/production...$branch?expand=1"
