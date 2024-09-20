<p><a target="_blank" href="https://app.eraser.io/workspace/ny9S5RERG9mnNZFeXtsU" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

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
## Components and Routes

### Main Application
- `src/components/layout/CrimeTrackerApp.tsx`: The core component that orchestrates the entire application. It manages the global state, handles user interactions, and composes other components.

### Input Components
- `src/components/inputs/AddressInput.tsx`: Handles address input and geolocation. Users can enter an address manually or use their current location.
- `src/components/inputs/TimeRangeSelector.tsx`: Allows users to select a time range for crime data analysis.

### Crime Data Components
- `src/components/crime/CrimeMap.tsx`: Displays an interactive map with crime data points.
- `src/components/crime/CrimeStatistics.tsx`: Shows various crime statistics based on the selected location and time range.
- `src/components/crime/CrimeHistory.tsx`: Presents historical crime data in a tabular or graphical format.
- `src/components/crime/TotalCrime.tsx`: Displays the total number of crimes for the selected criteria.

### Safety Components
- `src/components/safety/SafetyScore.tsx`: Calculates and displays a safety score based on crime data.

### Panel Components
- `src/components/panels/TotalCrimesPanel.tsx`: A panel showing the total number of crimes.
- `src/components/panels/MostCommonCrimePanel.tsx`: Displays information about the most frequent type of crime.
- `src/components/panels/SafetyScorePanel.tsx`: Shows the safety score in a dedicated panel.

### UI Components
- `src/components/ui/`: Contains reusable UI components like buttons, cards, inputs, and progress bars.

## Routes

### Main Pages
- `src/app/page.tsx`: The home page of the application, displaying the main crime tracker interface.
- `src/app/safety-score/page.tsx`: A dedicated page for detailed safety score information.
- `src/app/total-crimes/page.tsx`: Shows comprehensive statistics about total crimes.
- `src/app/crime-history/page.tsx`: Displays historical crime data and trends.

### API Routes
- `src/app/api/crime/route.ts`: Handles requests for crime data, interfacing with the crime data service.
- `src/app/api/home/route.ts`: Manages requests related to the home page functionality.
- `src/app/api/map/coordinates/route.ts`: Processes requests for map coordinates.
- `src/app/api/map/route/route.ts`: Handles routing-related requests for the map component.

## Services and Utilities

### Services
- `src/services/crimeService.ts`: Contains business logic for processing crime data, including data fetching, filtering, and analysis.
- `src/services/mapService.ts`: Handles map-related operations, such as geocoding and reverse geocoding.

### Utilities
- `src/lib/api.ts`: Provides utility functions for API calls.
- `src/lib/util.ts` and `src/lib/utils.ts`: Contain general utility functions used throughout the application.

## Types
- `src/types/crimeData.ts`: Defines TypeScript interfaces and types for crime data structures.
- `src/types/addressSelection.ts`: Contains types related to address selection and geolocation.

## Styles
- `src/styles/`: Contains global styles and CSS modules for specific components.

## Configuration
- `tailwind.config.js`: Configuration file for Tailwind CSS, defining custom themes and styles.

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