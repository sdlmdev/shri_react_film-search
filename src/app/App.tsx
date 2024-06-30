import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/app/router';
import { Provider } from 'react-redux';
import { appStore } from './store';

export const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}
