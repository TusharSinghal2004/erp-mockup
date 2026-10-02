import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge } from '../components/shared';
import { inventoryItems } from '../data/mockData';
import { Check, Pencil, Factory, Mail, CheckCircle } from 'lucide-react';

export function CustomOrders() {
  const { state, dispatch } = useApp();

  return (
    <div>
      <PageHeader
        title="Custom Order Quotes"
        subtitle="Automation structures the request — you review and approve the quote"
      />

      {state.customOrderRequests.map(co => {
        const matchedItems = co.matchedStockIds.map(id => inventoryItems.find(i => i.id === id)).filter(Boolean);

        return (
          <div key={co.id} className="card mb-6 overflow-hidden">
            {co.status === 'Approved' && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Quote Approved & Sent</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Quote email sent to customer. Awaiting confirmation.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Incoming request */}
              <div className="p-6 border-r" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Incoming Request
                </h3>
                <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>From: {co.customerName}</p>
                  <p className="text-sm italic" style={{ color: 'var(--text-primary)' }}>"{co.request}"</p>
                  <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                    {new Date(co.receivedAt).toLocaleString('en-IN')}
                  </p>
                </div>

                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Structured Draft</h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Stone</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{co.structured.stone}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Shape</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{co.structured.shape}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Size</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{co.structured.size}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Quantity</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{co.structured.quantity} pcs</p>
                  </div>
                </div>

                {/* Matched stock */}
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Matched Stock</h4>
                {matchedItems.map(item => item && (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg mb-2" style={{ background: 'var(--bg-secondary)' }}>
                    <span className="text-2xl">{item.photoPlaceholder}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.sku} — {item.stone} {item.shape}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.pieces} pcs in stock · {item.sizeRange}</p>
                    </div>
                  </div>
                ))}

                {/* Cost breakdown */}
                <div className="mt-4 p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>Cost per piece</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>${co.costPerPiece.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>Quantity</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{co.structured.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-1 mt-1" style={{ borderColor: 'var(--border-color)' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span style={{ color: 'var(--text-primary)' }}>${co.totalCost.toFixed(2)}</span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                    Estimated lead time: {co.estimatedLeadDays} working days
                  </p>
                </div>
              </div>

              {/* Right: Draft quote email */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                    Draft Quote Email
                  </h3>
                  <StatusBadge status={co.status} />
                </div>

                <textarea
                  className="w-full p-4 rounded-xl border font-mono text-xs leading-relaxed mb-4 resize-y focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] transition-shadow"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  defaultValue={co.draftQuoteEmail}
                  rows={8}
                />

                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    This email will NOT be sent until you approve it.
                  </p>
                </div>

                {co.status === 'Draft' && (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success flex-1"
                      onClick={() => {
                        dispatch({ type: 'UPDATE_CUSTOM_ORDER_STATUS', payload: { id: co.id, status: 'Approved' } });
                        dispatch({ type: 'ADD_TOAST', payload: { message: 'Quote approved and sent', type: 'success' } });
                      }}
                    >
                      <Check className="w-4 h-4" /> Approve Quote
                    </button>
                    <button className="btn btn-secondary">
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        dispatch({ type: 'ADD_TOAST', payload: { message: 'Production job created from custom order', type: 'success' } });
                      }}
                    >
                      <Factory className="w-4 h-4" /> Create Job
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
