import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Chats from './pages/Chats';
import Customers from './pages/Customers';
import PlaceholderPage from './pages/PlaceholderPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
      { path: 'chats', element: <Chats /> },
      { path: 'analytics', element: <PlaceholderPage /> },
      { path: 'customer', element: <Customers /> },
      { path: 'reviews', element: <PlaceholderPage /> },
      { path: 'wallet', element: <PlaceholderPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
