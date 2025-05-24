# Formula One Explorer

A modern, interactive web application for exploring Formula One racing data, including historical seasons, races, drivers, and teams. Built with React, TypeScript, and Vite.

**Live Demo**: <a href="https://formula-one-explorer-zeta.vercel.app/" target="_blank" rel="noopener noreferrer">https://formula-one-explorer-zeta.vercel.app/</a>

## Features

- Browse all Formula One seasons from 1950 to present
- View detailed race information for each season
- Explore race results and circuit details
- Pin favorite races for quick access
- Visualize driver performance with interactive charts
- Responsive design for all devices

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **UI Components**: shadcn/ui components with Lucide React icons
- **Testing**: Vitest, React Testing Library, Playwright

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/muhammedheshamm/Formula-One-Explorer.git
   cd Formula-One-Explorer
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   VITE_API_BASE_URL=https://ergast.com/api/f1
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Running Tests

#### Unit Tests

```bash
npm test
```

#### End-to-End Tests

```bash
npm run test:e2e
```

To run E2E tests with UI for debugging:

```bash
npm run test:e2e:ui
```

## Architecture and Design Decisions

### Application Structure

The application follows a feature-based organization with the following structure:

```
src/
├── assets/         # Static assets like images and CSS files
├── components/     # Reusable UI components
│   ├── ui/         # Basic UI components
│   ├── layout/     # Layout components
│   └── loading/    # Loading state components
├── hooks/          # Custom React hooks
├── pages/          # Page components for routing
├── services/       # Includes API service layer
├── types/          # TypeScript type definitions
├── e2e/            # End-to-end tests
└── __tests__/      # Unit tests
```

### Key Design Decisions

1. **React Router for Navigation**: Implemented client-side routing with React Router v7 for a smooth, SPA-like experience.

2. **TanStack Query for Data Fetching**: Used React Query for efficient data fetching, caching, and state management of API requests.

3. **Responsive Design with Tailwind**: Utilized Tailwind CSS for a utility-first approach to styling, ensuring responsive design across all devices.

4. **shadcn/ui Component Library**: Leveraged shadcn/ui for consistent, accessible, and customizable UI components that integrate seamlessly with Tailwind CSS.

5. **Layout Structure**: Implemented a consistent layout structure with reusable components for the header, and page layouts to maintain a cohesive user experience.

6. **Component Composition**: Built the UI using composable, reusable components to maintain consistency and reduce duplication.

7. **TypeScript for Type Safety**: Leveraged TypeScript throughout the application for improved developer experience and code quality.

8. **Testing Strategy**: Implemented a comprehensive testing strategy with:

   - Unit tests for individual components using Vitest and React Testing Library
   - End-to-end tests for user flows using Playwright

9. **Performance Optimization**:
   - Implemented code splitting with React Router
   - Used React's memo and useMemo for component optimization
   - Leveraged React Query's caching capabilities to minimize API calls

## API Integration

The application integrates with the Ergast Formula One API to fetch historical F1 data. The API service layer is implemented in `src/services/formulaOneApi.ts` using Axios for HTTP requests.

## Feedback

If you have any feedback, please reach out to me at muhammedheshamm1@gmail.com
