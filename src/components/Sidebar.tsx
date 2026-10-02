import { NavLink, useLocation } from 'react-router-dom';
import { useApp, usePendingDraftCount } from '../context/AppContext';
import {
  LayoutDashboard, Package, Factory, FileText, ShoppingCart,
  MessageSquare, FileCheck, Star, BarChart3, ClipboardCheck,
  Settings, Receipt, Send, X, Menu, Gem
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/production', icon: Factory, label: 'Production' },
  { to: '/bills', icon: Receipt, label: 'Bill Capture' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/custom-orders', icon: FileText, label: 'Custom Orders' },
  { to: '/export-docs', icon: FileCheck, label: 'Export Docs' },
  { to: '/enquiries', icon: MessageSquare, label: 'Enquiries' },
  { to: '/reviews', icon: Star, label: 'Reviews' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/review-queue', icon: ClipboardCheck, label: 'Review Queue' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const draftCount = usePendingDraftCount();

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: false })}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-50 h-full flex flex-col flex-shrink-0
          transition-all duration-300 ease-in-out border-r
          ${state.sidebarOpen ? 'w-64' : 'w-0 md:w-16'}
          ${state.sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-color)' }}
      >
        {/* Logo area */}
        <div className={`flex items-center h-16 px-4 border-b ${!state.sidebarOpen && 'md:justify-center md:px-0'}`} style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <Gem className="w-4 h-4 text-white" />
            </div>
            {state.sidebarOpen && (
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-[var(--text-primary)] truncate">
                  N.K. Impex
                </h1>
                <p className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider truncate">ERP System</p>
              </div>
            )}
          </div>
          {state.sidebarOpen && (
            <button
              onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: false })}
              className="ml-auto md:hidden p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to));
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    dispatch({ type: 'SET_SIDEBAR', payload: false });
                  }
                }}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md
                  text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-[var(--accent-light)] text-[var(--accent-dark)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                  }
                  ${!state.sidebarOpen && 'md:justify-center md:px-0'}
                `}
                title={item.label}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'}`} />
                {state.sidebarOpen && (
                  <span className="truncate">{item.label}</span>
                )}
                {state.sidebarOpen && item.to === '/review-queue' && draftCount > 0 && (
                  <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {draftCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse button (desktop) */}
        <div className="hidden md:flex items-center justify-center py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-1.5 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
