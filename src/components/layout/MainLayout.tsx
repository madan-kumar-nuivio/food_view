import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-primary-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
