import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/shared';
import { inventoryItems, orders, customers, productionJobs } from '../data/mockData';
import { BarChart3, TrendingUp, Download, Search, Clock } from 'lucide-react';

// Mock report data
const salesByChannel = [
  { channel: 'Etsy', orders: 15, revenue: 1245.60, currency: 'USD' },
  { channel: 'Wholesale', orders: 8, revenue: 137000, currency: 'INR' },
  { channel: 'Export', orders: 6, revenue: 2619.60, currency: 'USD' },
];

const topStones = [
  { stone: 'Emerald', sold: 42, revenue: 6300 },
  { stone: 'Pink Tourmaline', sold: 38, revenue: 4474 },
  { stone: 'Peridot', sold: 35, revenue: 2100 },
  { stone: 'Ethiopian Opal', sold: 28, revenue: 6216 },
  { stone: 'Labradorite', sold: 22, revenue: 1637 },
];

const wasteReport = [
  { job: 'JOB-2024-101', stone: 'Emerald', weightIn: 45.0, weightOut: 38.2, wastage: 15.1 },
  { job: 'JOB-2024-103', stone: 'Morganite', weightIn: 92.0, weightOut: 78.5, wastage: 14.7 },
  { job: 'JOB-2024-105', stone: 'Pink Tourmaline', weightIn: 55.0, weightOut: 48.0, wastage: 12.7 },
];

export function Reports() {
  const { state } = useApp();
  const [activeReport, setActiveReport] = useState('stock-valuation');
  const [askQuery, setAskQuery] = useState('');
  const [askResult, setAskResult] = useState<any>(null);
  const [slowPeriod, setSlowPeriod] = useState(6);

  const totalStockValue = state.inventory.reduce((sum, i) => sum + i.priceINR, 0);
  const totalStockUSD = state.inventory.reduce((sum, i) => sum + i.priceUSD, 0);

  const slowMoving = state.inventory
    .filter(i => {
      const lastMove = new Date(i.lastMovement);
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - slowPeriod);
      return lastMove < cutoff;
    });

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const q = askQuery.toLowerCase();
    if (q.includes('sold') && q.includes('quarter')) {
      setAskResult({
        title: 'Top Selling Stones — Last Quarter',
        filters: 'Period: Jul–Sep 2024 | Metric: Units sold',
        data: topStones,
      });
    } else if (q.includes('revenue') || q.includes('sales')) {
      setAskResult({
        title: 'Revenue by Channel',
        filters: 'Period: Sep 2024 | All channels',
        data: salesByChannel,
      });
    } else if (q.includes('waste') || q.includes('wastage')) {
      setAskResult({
        title: 'Production Wastage Report',
        filters: 'Period: Sep 2024 | Completed jobs',
        data: wasteReport,
      });
    } else {
      setAskResult({
        title: `Results for "${askQuery}"`,
        filters: 'Showing all available data',
        data: topStones,
      });
    }
  };

  const reports = [
    { id: 'stock-valuation', label: 'Stock Valuation' },
    { id: 'sales-channel', label: 'Sales by Channel' },
    { id: 'production-yield', label: 'Production Yield' },
    { id: 'payables', label: 'Payables & Receivables' },
    { id: 'ask', label: 'Ask Your Data' },
    { id: 'slow-moving', label: 'Slow-Moving Stock' },
  ];

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Insights from your mock data"
      />

      {/* Report tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {reports.map(r => (
          <button
            key={r.id}
            className={`btn btn-sm whitespace-nowrap ${activeReport === r.id ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveReport(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stock Valuation */}
      {activeReport === 'stock-valuation' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="card p-5">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>Total Items</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{state.inventory.length}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>Total Value (INR)</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>₹{totalStockValue.toLocaleString()}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>Total Value (USD)</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>${totalStockUSD.toLocaleString()}</p>
            </div>
          </div>

          <div className="card overflow-x-auto">
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Valuation by Stone</h3>
              <button className="btn btn-secondary btn-sm">
                <Download className="w-3.5 h-3.5" /> Export Excel
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Stone</th>
                  <th>Items</th>
                  <th>Total Pcs</th>
                  <th>Total Weight (ct)</th>
                  <th>Value (INR)</th>
                  <th>Value (USD)</th>
                </tr>
              </thead>
              <tbody>
                {[...new Set(state.inventory.map(i => i.stone))].sort().map(stone => {
                  const items = state.inventory.filter(i => i.stone === stone);
                  return (
                    <tr key={stone}>
                      <td className="font-medium">{stone}</td>
                      <td>{items.length}</td>
                      <td>{items.reduce((s, i) => s + i.pieces, 0)}</td>
                      <td>{items.reduce((s, i) => s + i.weightCarats, 0).toFixed(1)}</td>
                      <td className="font-medium">₹{items.reduce((s, i) => s + i.priceINR, 0).toLocaleString()}</td>
                      <td className="font-medium">${items.reduce((s, i) => s + i.priceUSD, 0).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sales by Channel */}
      {activeReport === 'sales-channel' && (
        <div>
          <div className="card overflow-x-auto">
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Sales by Channel</h3>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Excel</button>
                <button className="btn btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> PDF</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Channel</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesByChannel.map(s => (
                  <tr key={s.channel}>
                    <td className="font-medium">{s.channel}</td>
                    <td>{s.orders}</td>
                    <td className="font-medium">
                      {s.currency === 'INR' ? '₹' : '$'}{s.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar chart placeholder */}
          <div className="card p-6 mt-4">
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>Revenue Distribution</h3>
            <div className="space-y-3">
              {salesByChannel.map(s => {
                const maxRevenue = Math.max(...salesByChannel.map(x => x.currency === 'INR' ? x.revenue / 83 : x.revenue));
                const pct = ((s.currency === 'INR' ? s.revenue / 83 : s.revenue) / maxRevenue) * 100;
                return (
                  <div key={s.channel}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{s.channel}</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {s.currency === 'INR' ? '₹' : '$'}{s.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-6 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Production Yield */}
      {activeReport === 'production-yield' && (
        <div className="card overflow-x-auto">
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Production Yield & Wastage</h3>
            <button className="btn btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Job #</th>
                <th>Stone</th>
                <th>Weight In (ct)</th>
                <th>Weight Out (ct)</th>
                <th>Wastage %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {wasteReport.map(w => (
                <tr key={w.job}>
                  <td className="font-mono text-xs font-medium">{w.job}</td>
                  <td className="font-medium">{w.stone}</td>
                  <td>{w.weightIn}</td>
                  <td>{w.weightOut}</td>
                  <td className={`font-bold ${w.wastage > 15 ? 'text-red-500' : 'text-emerald-600'}`}>{w.wastage}%</td>
                  <td><span className="badge badge-completed">Completed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payables & Receivables */}
      {activeReport === 'payables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
              Payables (To Suppliers)
            </h3>
            <div className="space-y-3">
              {state.billCaptures.filter(b => b.status === 'Confirmed').length === 0 ? (
                <p className="text-sm p-4 text-center" style={{ color: 'var(--text-tertiary)' }}>
                  No confirmed bills — confirm a bill to see payables
                </p>
              ) : state.billCaptures.filter(b => b.status === 'Confirmed').map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{b.supplierName}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{b.billNumber}</p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>₹{b.totalAmount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
              Receivables (From Customers)
            </h3>
            <div className="space-y-3">
              {state.orders.filter(o => o.paymentStatus !== 'Paid').map(o => {
                const cust = customers.find(c => c.id === o.customerId);
                return (
                  <div key={o.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{cust?.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{o.orderNumber} · {o.paymentStatus}</p>
                    </div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {o.currency === 'INR' ? '₹' : o.currency === 'EUR' ? '€' : '$'}{o.totalAmount.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Ask your data */}
      {activeReport === 'ask' && (
        <div>
          <div className="card p-6 mb-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
              Ask Your Data
            </h3>
            <form onSubmit={handleAsk} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  value={askQuery}
                  onChange={e => setAskQuery(e.target.value)}
                  placeholder='Try: "which stones sold most last quarter"'
                  className="input pl-10"
                />
              </div>
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>

          {askResult && (
            <div className="card overflow-hidden">
              <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{askResult.title}</h3>
                <p className="text-xs mt-1 px-2 py-1 rounded inline-block" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  Filters: {askResult.filters}
                </p>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    {Object.keys(askResult.data[0]).map((key: string) => (
                      <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {askResult.data.map((row: any, idx: number) => (
                    <tr key={idx}>
                      {Object.values(row).map((val: any, i: number) => (
                        <td key={i} className={typeof val === 'number' ? 'font-medium' : ''}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t flex gap-2" style={{ borderColor: 'var(--border-color)' }}>
                <button className="btn btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export Excel</button>
                <button className="btn btn-secondary btn-sm"><Download className="w-3.5 h-3.5" /> Export PDF</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Slow-moving stock */}
      {activeReport === 'slow-moving' && (
        <div>
          <div className="card p-5 mb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Period Selector</h3>
              <div className="flex gap-1">
                {[3, 6, 12].map(m => (
                  <button
                    key={m}
                    className={`btn btn-sm ${slowPeriod === m ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setSlowPeriod(m)}
                  >
                    {m} months
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card overflow-x-auto">
            <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Items with no movement in {slowPeriod} months ({slowMoving.length} items)
              </h3>
            </div>
            {slowMoving.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  No slow-moving items found for this period. Try a shorter period.
                </p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Stone</th>
                    <th>Shape</th>
                    <th>Last Movement</th>
                    <th>Stock</th>
                    <th>Value (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {slowMoving.map(item => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-medium">{item.sku}</td>
                      <td className="font-medium">{item.stone}</td>
                      <td>{item.shape}</td>
                      <td className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.lastMovement}</td>
                      <td>{item.pieces} pcs</td>
                      <td className="font-medium">₹{item.priceINR.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
