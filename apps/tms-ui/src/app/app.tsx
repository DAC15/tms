import { useRoutes } from 'react-router-dom';
import { AppRoutes } from './app.routes';

export function App() {
  return useRoutes(AppRoutes);
}
