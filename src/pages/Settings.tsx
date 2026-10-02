import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/shared';
import { users } from '../data/mockData';
import { User, Shield, ToggleLeft, ToggleRight } from 'lucide-react';

const roleColors: Record<string, string> = {
  'Owner': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Accounts': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Production': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'Packing': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'Sales': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
};

export function Settings() {
  const { state, dispatch } = useApp();

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Users, roles, and automation controls"
      />

      {/* Users & Roles */}
      <div className="card p-5 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Users & Roles
          </div>
        </h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="font-medium">{u.name}</td>
                <td><span className={`badge ${roleColors[u.role]}`}>{u.role}</span></td>
                <td className="text-sm" style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                <td>
                  <span className={`badge ${u.active ? 'badge-confirmed' : 'badge-rejected'}`}>
                    {u.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Automation Settings */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Automation Controls
          </div>
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
          Each automation prepares a draft. Nothing is finalized without human review.
        </p>
        <div className="space-y-3">
          {state.automationSettings.map(auto => (
            <div key={auto.id} className="flex items-center justify-between p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{auto.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{auto.description}</p>
              </div>
              <button
                onClick={() => {
                  dispatch({ type: 'TOGGLE_AUTOMATION', payload: auto.id });
                  dispatch({
                    type: 'ADD_TOAST',
                    payload: {
                      message: `${auto.name} ${auto.enabled ? 'disabled' : 'enabled'}`,
                      type: 'info',
                    },
                  });
                }}
                className="flex-shrink-0"
              >
                {auto.enabled ? (
                  <ToggleRight className="w-10 h-10 text-teal-500" />
                ) : (
                  <ToggleLeft className="w-10 h-10" style={{ color: 'var(--text-tertiary)' }} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
