import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, usePendingDraftCount } from '../context/AppContext';
import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';

export function TopBar() {
  const { state, dispatch } = useApp();
  const draftCount = usePendingDraftCount();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would search; for now just close
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center h-16 px-4 md:px-6 border-b gap-3"
      style={{
        background: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Mobile menu button */}
      <button
        className="md:hidden btn-ghost p-2 rounded-lg"
        onClick={() => dispatch({ type: 'SET_SIDEBAR', payload: true })}
        style={{ color: 'var(--text-secondary)' }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search SKU, stone, customer…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            className="input pl-10 h-10"
            style={{ background: 'var(--bg-secondary)' }}
          />
        </form>

        {/* Search dropdown */}
        {searchOpen && searchQuery.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-lg border overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
                Quick results for "{searchQuery}"
              </p>
              {state.inventory
                .filter(i =>
                  i.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  i.stone.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5)
                .map(item => (
                  <button
                    key={item.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-hover)] flex items-center gap-3 transition-colors"
                    onClick={() => {
                      navigate(`/inventory/${item.id}`);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <span className="text-lg">{item.photoPlaceholder}</span>
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.sku}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.stone} {item.shape}</p>
                    </div>
                  </button>
                ))
              }
              {state.inventory.filter(i =>
                i.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                i.stone.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <p className="text-center py-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>No results found</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Review queue bell */}
        <button
          className="relative p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
          style={{ color: 'var(--text-secondary)' }}
          onClick={() => navigate('/review-queue')}
          title="Review Queue"
        >
          <Bell className="w-5 h-5" />
          {draftCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {draftCount}
            </span>
          )}
        </button>

        {/* Dark mode toggle */}
        <button
          className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)]"
          style={{ color: 'var(--text-secondary)' }}
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          title={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {state.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User avatar */}
        <div className="hidden sm:flex items-center gap-2 pl-3 ml-2 border-l" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] text-xs font-semibold border" style={{ borderColor: 'var(--border-color)' }}>
            NK
          </div>
          <span className="text-sm font-medium hidden lg:block" style={{ color: 'var(--text-primary)' }}>
            Nitin Kumar
          </span>
        </div>
      </div>
    </header>
  );
}
