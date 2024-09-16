<p><a target="_blank" href="https://app.eraser.io/workspace/Ki6XfG0qdEugiqkrEZyS" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Crime Tracker Application
## Table of Contents
1. [﻿Overview](#overview)  
2. [﻿Features](#features)  
3. [﻿Project Structure](#project-structure)  
4. [﻿Components](#components)  
5. [﻿Technologies Used](#technologies-used)  
6. [﻿Getting Started](#getting-started)  
7. [﻿Usage](#usage)  
8. [﻿Contributing](#contributing)  
9. [﻿License](#license) 
## Overview
The Crime Tracker Application is a React and TypeScript-based project designed to help users track and visualize crime data in a specified area. This interactive web application allows users to input an address or use their current location, select a time range, and view comprehensive crime statistics for the chosen area.

## Features
- Address input with geolocation option
- Time range selection for crime data
- Map display (placeholder for future implementation)
- Crime statistics dashboard
## Project Structure
The project is organized with the following key components:

- `/src`  
    - `/app`  
        - `layout.tsx`  : Root layout component
        - `page.tsx`  : Main page component
        - `not-found.tsx`  : 404 page component
        - `/api`  : API routes for fetching crime data
            - `/total-crimes`  
            - `/most-common-crime`  
            - `/safety-score` 
        - `/total-crimes`  : Page for total crimes statistics
        - `/most-common-crime`  : Page for most common crime statistics
        - `/safety-score`  : Page for safety score statistics
    - `/components`  
        - `/layout`  
            - `CrimeTrackerApp.tsx`  : Main application component
        - `/inputs`  
            - `AddressInput.tsx`  : Component for address input
            - `TimeRangeSelector.tsx`  : Component for time range selection
        - `/crime`  
            - `CrimeMap.tsx`  : Placeholder component for map display
            - `CrimeStatistics.tsx`  : Component for displaying crime statistics
        - `/panels`  
            - `TotalCrimesPanel.tsx`  : Component for displaying total crimes
            - `MostCommonCrimePanel.tsx`  : Component for displaying most common crime
            - `SafetyScorePanel.tsx`  : Component for displaying safety score
        - `/ui`  : Reusable UI components
    - `/lib`  
        - `utils.ts`  : Utility functions
    - `/styles`  
        - `globals.css`  : Global styles
        - `Home.module.css`  : Styles for the home page
- `next.config.js`  : Next.js configuration
- `package.json`  : Project dependencies and scripts
- `tsconfig.json`  : TypeScript configuration
## Components
### CrimeTrackerApp
The main component that orchestrates the entire application. It manages the state for address and time range, and composes the other components.

### AddressInput
Handles the address input functionality, including a text input for manual address entry and a button to use the current location.

### TimeRangeSelector
Manages the time range selection with a dropdown menu and includes a button to view crime data.

### CrimeMap
A placeholder component for the future implementation of a map display.

### CrimeStatistics
Displays crime statistics in a grid of cards, showing total crimes, most common crime, and a safety score.

## Technologies Used
- React
- TypeScript
- Next.js
- Tailwind CSS
- Lucide React (for icons)
- class-variance-authority (for component styling)
- Radix UI (for accessible UI components)
## Getting Started
### Prerequisites
- Node.js (version 14 or later)
- npm or yarn
### Installation
1. Clone the repository
2. Install dependencies: `npm install`  or `yarn install`  
3. Start the development server: `npm run dev`  or `yarn dev`  
4. Open `http://localhost:3000`  in your browser
## Usage
1. Enter an address or use current location
2. Select a time range
3. Click "View Crime Data" to fetch and display statistics
4. Explore the crime data presented in the statistics cards
## Contributing
We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request.

## License
This project is licensed under the MIT License - see the [﻿LICENSE.md](LICENSE.md) file for details.

---

For more information or support, please open an issue in the GitHub repository.



<!--- Eraser file: https://app.eraser.io/workspace/Ki6XfG0qdEugiqkrEZyS --->