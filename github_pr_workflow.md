# GitHub Pull Request Workflow

This document outlines the process for creating and merging pull requests (PRs) in our GitHub repository.

## Step 1: Create a Feature Branch

1. In your local repository, create a new branch for your feature:
   ```
   git checkout -b dev/<feature-name>
   ```

2. Make your changes and commit them:
   ```
   git add .
   git commit -m "Implement <feature-name>"
   ```

3. Push the branch to your GitHub repository:
   ```
   git push origin dev/<feature-name>
   ```

## Step 2: Create a Pull Request

1. Go to the GitHub repository page.
2. Click on "Pull requests" tab.
3. Click the "New pull request" button.
4. Set the base repository to `upstream/development`.
5. Set the compare branch to your `dev/<feature-name>` branch.
6. Click "Create pull request".
7. Add a title and description for your PR.
8. Click "Create pull request" to submit.

## Step 3: Review and Merge to Development

1. Wait for code reviews and address any feedback.
2. Once approved, merge the PR into the `development` branch:
   - Click "Merge pull request" on the PR page.
   - Choose the appropriate merge option (usually "Merge pull request").
   - Click "Confirm merge".

3. The `dev/<feature-name>` branch will be automatically deleted after merging (if configured).

## Step 4: Merge Development to Main

1. Create a new pull request:
   - Base: `upstream/main`
   - Compare: `upstream/development`

2. Title the PR "Merge development into main".

3. Review the changes and ensure all tests pass.

4. Merge the PR into the `main` branch:
   - Click "Merge pull request" on the PR page.
   - Choose the appropriate merge option (usually "Merge pull request").
   - Click "Confirm merge".

## Best Practices

- Always create feature branches from the latest `development` branch.
- Keep PRs focused on a single feature or bug fix.
- Write clear PR descriptions and link to relevant issues.
- Ensure all tests pass before merging.
- Regularly sync your `development` branch with `upstream/development`.

Remember to follow your team's specific guidelines and use any additional tools or integrations set up in your repository.