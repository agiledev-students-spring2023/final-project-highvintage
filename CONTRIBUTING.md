# Guide to Contributing

## Team Norms

Team members may solicit help from others by communication in Discord.

- Post a new thread regarding a technical issue. (e.g. "Need help with x,y,z")
- For non-technical questions/help on designs or features, leave a note in the project discord channel. (e.g. "Does anyone have opinion on x,y,z")
- Anyone available may help to solve the issue.

## GitHub Workflow & Coding Standards

### GitHub Workflow

- Team members will work in their own branches
  - One branch per feature
  - Deleted merged branches
  - Create pull request once task associated with branch is complete
- Team members will work using branch protection
  - At least one pull request review is required before merging
  - Reviewer must not be the same person as the author of the pull request
  - Bypassing branch protection and force pushes have been disabled (but can be subject to change)
  - No current criteria for passing status checks or successful depolyment (but will be subject to change)

## Coding Standards

### GitHub

- Team members will commit often (per bug fix or per feature added/edited), with meaningful, descriptive, concise summaries of the commit
- If a push results in a merge conflict, the merge conflict will be resolved by the author of the pull request
- Team members must test their code before resolving a merge conflict or creating a pull request – always pushing working code
  - If a team member breaks the pipeline or build, it must be fixed by this team member
- If you create a new pull request, be sure to alert team members on Discord - alert team members if your pull request has not been merged after EOD

### Code

- The team will VSCODE as a code editor, Prettier as a code formatter, and [linter] and a code linter
- All team members should leave meaningful comments in their code so that other members can understand code and its functionality that other team members may not have authored
- Code written should be self documenting
  - Descriptive variable and function names
  - Avoid unnecessary name shortening
- No dead/commented out code should be left behind, and should be deleted instead
- Keep from overengineering. Write minimum code to get things working end to end, only then iterate to improve
- All code added should be peer reviewed by another team member
