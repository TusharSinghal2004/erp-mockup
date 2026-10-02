export function StatusBadge({ status }: { status: string }) {
  const classMap: Record<string, string> = {
    'Draft': 'badge-draft',
    'Confirmed': 'badge-confirmed',
    'In Production': 'badge-production',
    'Pending': 'badge-pending',
    'Shipped': 'badge-shipped',
    'Delivered': 'badge-completed',
    'Cancelled': 'badge-rejected',
    'Rejected': 'badge-rejected',
    'Approved': 'badge-approved',
    'Completed': 'badge-completed',
    'In Stock': 'badge-confirmed',
    'Low Stock': 'badge-pending',
    'Out of Stock': 'badge-low',
    'Reserved': 'badge-production',
    'Paid': 'badge-confirmed',
    'Partial': 'badge-pending',
  };
  return (
    <span className={`badge ${classMap[status] || 'badge-draft'}`}>
      {status}
    </span>
  );
}

export function ChannelBadge({ channel }: { channel: string }) {
  const colors: Record<string, string> = {
    'Etsy': 'bg-orange-100 text-orange-800',
    'Wholesale': 'bg-blue-100 text-blue-800',
    'Export': 'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`badge ${colors[channel] || ''}`}>
      {channel}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="empty-state">
      <div className="mb-4 opacity-40">{icon}</div>
      <h3 className="text-lg font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{title}</h3>
      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{description}</p>
    </div>
  );
}

export function CheckThisField({ value, label }: { value: string; label?: string }) {
  return (
    <div className="relative inline-block">
      <span className="check-this">{value}</span>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

export function StaffOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="staff-only text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}:</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}
