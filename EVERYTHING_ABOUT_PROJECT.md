<p><a target="_blank" href="https://app.eraser.io/workspace/W9WRJGTcKWk9Hyxz7HJS" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# App info
[﻿System Design](https://app.eraser.io/workspace/a0EyiMuiFYz5o35X6pbV?origin=share) 

---

# UI Design
Home page: [﻿claude.site/artifacts/0da83218-1440-4347-8c0f-24f061318631](https://claude.site/artifacts/0da83218-1440-4347-8c0f-24f061318631) 

---

# Development
---

# Deployment & CICD
## Vercel: Deployment
### Edge network
- Edge networks are distributed networks of servers located closer to end users, designed to reduce latency and improve performance for web applications.
- In Next.js, when you deploy to platforms like Vercel, your API routes can be automatically distributed to edge locations, bringing your code closer to your users.
## Github Action: CICD
```
name: Next.js CI/CD
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Build
      run: npm run build
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID}}
        vercel-project-id: ${{ secrets.PROJECT_ID}}
        working-directory: ./
```
### Github Action: PR Merge 
- clean the dev/<feature> branch after merge to development in the upstream
```
name: PR Cleanup
on:
  pull_request:
    types: [closed]
    branches:
      - development
jobs:
  delete-branch:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Delete branch
        uses: SvanBoxel/delete-merged-branch@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
## Stage
[﻿replit.com/@JoeJOEJOE2/citysafe](https://replit.com/@JoeJOEJOE2/citysafe) 

## Production




<!--- Eraser file: https://app.eraser.io/workspace/W9WRJGTcKWk9Hyxz7HJS --->