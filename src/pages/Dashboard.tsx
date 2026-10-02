import { useNavigate } from 'react-router-dom';
import { useApp, usePendingDraftCount } from '../context/AppContext';
import { StatusBadge } from '../components/shared';
import { recentActivity, customers } from '../data/mockData';
import {
  Package, ClipboardCheck, AlertTriangle, Factory, DollarSign,
  ShoppingCart, FileText, Send, Star, Receipt, ArrowRight,
  TrendingUp, Gem, Clock
} from 'lucide-react';

export function Dashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const draftCount = usePendingDraftCount();

  const ordersToPack = state.orders.filter(o => o.status === 'Confirmed').length;
  const lowStockItems = state.inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length;
  const pendingJobs = state.productionJobs.filter(j => j.stage !== 'Packing').length;
  const pendingPayments = state.orders.filter(o => o.paymentStatus === 'Pending' || o.paymentStatus === 'Partial').length;
  const totalInventory = state.inventory.length;
  const totalOrders = state.orders.length;

  const stats = [
    { label: 'Orders to Pack', value: ordersToPack, icon: Package, path: '/orders', color: 'text-[var(--accent)]', bg: 'bg-[var(--accent-light)]' },
    { label: 'Drafts to Review', value: draftCount, icon: ClipboardCheck, path: '/review-queue', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Low Stock Items', value: lowStockItems, icon: AlertTriangle, path: '/inventory', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Pending Jobs', value: pendingJobs, icon: Factory, path: '/production', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Payments Due', value: pendingPayments, icon: DollarSign, path: '/orders', color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  const shortcuts = [
    { label: 'New Order', icon: ShoppingCart, path: '/orders' },
    { label: 'Capture Bill', icon: Receipt, path: '/bills' },
    { label: 'Reply Enquiry', icon: Send, path: '/enquiries' },
    { label: 'Check Reviews', icon: Star, path: '/reviews' },
    { label: 'Export Docs', icon: FileText, path: '/export-docs' },
    { label: 'Review Queue', icon: ClipboardCheck, path: '/review-queue' },
  ];

  const activityIcons: Record<string, any> = {
    order: ShoppingCart,
    stock: Package,
    production: Factory,
    enquiry: Send,
    review: Star,
    bill: Receipt,
  };

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            {greeting}, Nitin
          </p>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            Overview
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Inventory</p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{totalInventory} items</p>
            </div>
          </div>
          <div className="w-px h-8" style={{ background: 'var(--border-color)' }}></div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Active Orders</p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{totalOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={() => navigate(stat.path)}
              className="card p-5 text-left flex flex-col justify-between hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Quick Actions & Production */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {shortcuts.map(sc => {
                const Icon = sc.icon;
                return (
                  <button
                    key={sc.label}
                    onClick={() => navigate(sc.path)}
                    className="flex flex-col items-center justify-center p-3 rounded border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition-all text-center"
                  >
                    <Icon className="w-4 h-4 mb-2" style={{ color: 'var(--text-secondary)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{sc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Production Load
              </h2>
              <button className="text-xs font-medium text-[var(--accent)] hover:underline" onClick={() => navigate('/production')}>
                View Board
              </button>
            </div>
            <div className="space-y-4">
              {(['Cutting', 'Shaping', 'Polishing', 'Quality Check', 'Packing'] as const).map(stage => {
                const count = state.productionJobs.filter(j => j.stage === stage).length;
                const maxJobs = Math.max(...(['Cutting', 'Shaping', 'Polishing', 'Quality Check', 'Packing'] as const).map(
                  s => state.productionJobs.filter(j => j.stage === s).length
                ), 1);
                
                return (
                  <div key={stage} className="flex items-center gap-3">
                    <span className="text-sm w-24 truncate" style={{ color: 'var(--text-secondary)' }}>
                      {stage}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max((count / maxJobs) * 100, count > 0 ? 5 : 0)}%`, background: 'var(--accent)' }}
                      />
                    </div>
                    <span className="text-sm w-4 text-right" style={{ color: 'var(--text-primary)' }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle & Right column: Pending Orders & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Pending Orders
              </h2>
              <button className="text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1" onClick={() => navigate('/orders')}>
                All Orders <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Ship By</th>
                  </tr>
                </thead>
                <tbody>
                  {state.orders
                    .filter(o => ['Pending', 'Confirmed', 'In Production'].includes(o.status))
                    .slice(0, 6)
                    .map(order => {
                      const customer = customers.find(c => c.id === order.customerId);
                      const shipDate = new Date(order.expectedShip);
                      const isUrgent = shipDate.getTime() - Date.now() < 3 * 86400000;
                      
                      return (
                        <tr key={order.id} className="cursor-pointer" onClick={() => navigate(`/orders`)}>
                          <td className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                            {order.orderNumber}
                          </td>
                          <td>
                            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                              {customer?.name || '—'}
                            </span>
                          </td>
                          <td>
                            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                              {order.currency === 'INR' ? '₹' : order.currency === 'EUR' ? '€' : '$'}
                              {order.totalAmount.toLocaleString()}
                            </span>
                          </td>
                          <td><StatusBadge status={order.status} /></td>
                          <td>
                            <span className={`text-sm ${isUrgent ? 'font-medium text-red-600' : ''}`} style={!isUrgent ? { color: 'var(--text-secondary)' } : {}}>
                              {shipDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity) => {
                const Icon = activityIcons[activity.type] || Package;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                      <Icon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {activity.message}
                      </p>
                      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                        <Clock className="w-3 h-3" />
                        {new Date(activity.timestamp).toLocaleString('en-IN', { 
                          day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true 
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
