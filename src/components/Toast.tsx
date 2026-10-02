import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { state, dispatch } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {state.toasts.map(toast => (
        <div
          key={toast.id}
          className="toast-enter flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
          }}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />}
          <p className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{toast.message}</p>
          <button
            onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            className="p-1 rounded hover:bg-[var(--bg-hover)] transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
