import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Races from './pages/Races';
import RaceDetails from './pages/RaceDetails';
import ErrorBoundary from './components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'seasons/:season',
        element: <Races />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'races/:season/:round',
        element: <RaceDetails />,
        errorElement: <ErrorBoundary />,
      },
      {
        // Catch-all route for 404s
        path: '*',
        element: <ErrorBoundary />,
      },
    ],
  },
]);
