import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Races from './pages/Races';
import RaceDetails from './pages/RaceDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'season/:season',
        element: <Races />,
      },
      {
        path: 'race/:season/:round',
        element: <RaceDetails />,
      },
    ],
  },
]);
