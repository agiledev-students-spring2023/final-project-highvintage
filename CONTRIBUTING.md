# Guide to Contributing

## Team Norms

Form of meeting:
- By default, members meet synchronously on Zoom for daily stand-ups and weekly syncs.
- In-person meetings can be arranged if needed.

Regular check-ups & communication:
- Weekly sync - Saturday 2:30 pm
- 3 weekly daily stand-ups
  - Monday 10:30 am
  - Wednesday 10:30 am
  - Saturday 2:30 pm (complete during weekly sync)
- Scrum Master may rearrange schedules if needed

Team members may solicit help from others by communication in Discord.
- Post a new thread regarding a technical issue. (e.g. "Need help with x,y,z")
- For non-technical questions/help on designs or features, leave a note in the project discord channel. (e.g. "Does anyone have opinion on x,y,z")
- Anyone available may help to solve the issue.

Contribution Rules:
- Must have made progress on tasks unless there were issues that you could not solve alone, in which case you must consult with other developers.
- Attend daily meet-ups and weekly sync on the promised hours and contribute to the discussion and planning.
- Must communicate with other developers if there are issues and be responsible to bring them up in the daily meet ups or weekly syncs.

Team conflict resolution:
- Disagreements regarding direction should be discussed upfront.
- It is always best to consult the entire team rather than individuals. 
- If there is a team member failing to deliver their obligations to the team:
  - The team has agreed to report to management a member who has failed to make progress on a task for two or more standups.
  - Work must be redistributed accordingly so that the project does not suffer. 

Asyncronous team messaging expectations:
- When a message is directed at a specific member:
  - The message should ideally be responded to within 1-3 hours. 
  - At latest, the message should be handled by the end of the day.
  - If an immediate response is not possible, the member should acknowledge that they have seen the message and will work on it. 
- For urgent issues, begin the message with "[Urgent]". 

</br>

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
