import { BrowserRouter } from 'react-router-dom';
import { AppStateProvider } from '@/app/AppStateContext';
import { AppRoutes } from '@/app/routes/AppRoutes';

export const App = () => (
  <BrowserRouter>
    <AppStateProvider>
      <AppRoutes />
    </AppStateProvider>
  </BrowserRouter>
);
