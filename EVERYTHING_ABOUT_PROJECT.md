# App info
[﻿System Design](https://app.eraser.io/workspace/a0EyiMuiFYz5o35X6pbV?origin=share) 

---

# UI Design
Home page: [﻿claude.site/artifacts/0da83218-1440-4347-8c0f-24f061318631](https://claude.site/artifacts/0da83218-1440-4347-8c0f-24f061318631) 

---

# Development
---

# Deployment & CICD
### Vercel: Deployment 
### Edge network
- Edge networks are distributed networks of servers located closer to end users, designed to reduce latency and improve performance for web applications.
- In Next.js, when you deploy to platforms like Vercel, your API routes can be automatically distributed to edge locations, bringing your code closer to your users.
### Github Action: CICD
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
## Stage
[﻿replit.com/@JoeJOEJOE2/citysafe](https://replit.com/@JoeJOEJOE2/citysafe) 

## Production