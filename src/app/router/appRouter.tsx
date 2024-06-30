import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/pages/main';
import { ErrorPage } from '@/pages/error/ui/ErrorPage';
import { HomePage } from '@/pages/home';
import { MoviePage } from '@/pages/movie';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/movies/:id',
        element: <MoviePage />,
      },
    ],
  },
]);
