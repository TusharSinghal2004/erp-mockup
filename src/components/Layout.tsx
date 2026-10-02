import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ToastContainer } from './Toast';
import { useApp } from '../context/AppContext';

export function Layout() {
  const { state } = useApp();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 h-screen transition-all duration-300">
        <TopBar />
        <main className="flex-1 overflow-auto" style={{ padding: '24px' }}>
          <div className="max-w-[1400px] mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
