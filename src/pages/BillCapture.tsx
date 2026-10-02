import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge, CheckThisField } from '../components/shared';
import { FileImage, Check, Pencil, X, CheckCircle } from 'lucide-react';

export function BillCapture() {
  const { state, dispatch } = useApp();

  const handleConfirm = (id: string) => {
    dispatch({ type: 'UPDATE_BILL_STATUS', payload: { id, status: 'Confirmed' } });
    dispatch({ type: 'ADD_TOAST', payload: { message: 'Bill confirmed — stock added to inventory', type: 'success' } });
  };

  const handleReject = (id: string) => {
    dispatch({ type: 'UPDATE_BILL_STATUS', payload: { id, status: 'Rejected' } });
    dispatch({ type: 'ADD_TOAST', payload: { message: 'Bill rejected', type: 'info' } });
  };

  return (
    <div>
      <PageHeader
        title="Supplier Bill Capture"
        subtitle="Automation prepares the draft — you verify and confirm"
      />

      {state.billCaptures.map(bill => (
        <div key={bill.id} className="card mb-6 overflow-hidden">
          {bill.status === 'Confirmed' && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Bill Confirmed & Stock Added</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Lot added to inventory. Items are now available for sale.</p>
              </div>
            </div>
          )}

          {bill.status === 'Rejected' && (
            <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-4 flex items-center gap-3">
              <X className="w-5 h-5 text-red-600" />
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">Bill Rejected</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Bill image placeholder */}
            <div className="p-6 border-r" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-tertiary)' }}>
              <div className="aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3"
                style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
                <FileImage className="w-12 h-12" style={{ color: 'var(--text-tertiary)' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Supplier Bill Image</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{bill.billNumber}</p>
              </div>
            </div>

            {/* Right: Extracted data */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                    Extracted Draft
                  </h3>
                  <StatusBadge status={bill.status} />
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Supplier</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{bill.supplierName}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Bill Date</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {new Date(bill.billDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Flagged fields */}
                {bill.flaggedFields.length > 0 && bill.status === 'Draft' && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">⚠ Fields to verify:</p>
                    {bill.flaggedFields.map((f, i) => (
                      <p key={i} className="text-xs text-amber-600 dark:text-amber-400">• {f}</p>
                    ))}
                  </div>
                )}

                {/* Items table */}
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Weight (ct)</th>
                        <th>Rate/ct</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-sm">{item.description}</td>
                          <td>
                            {item.checkThis ? (
                              <CheckThisField value={`${item.weight}`} />
                            ) : (
                              item.weight > 0 ? item.weight : '—'
                            )}
                          </td>
                          <td>
                            {item.checkThis ? (
                              <CheckThisField value={`₹${item.rate.toLocaleString()}`} />
                            ) : (
                              item.rate > 0 ? `₹${item.rate.toLocaleString()}` : '—'
                            )}
                          </td>
                          <td className="font-medium">₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{bill.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      GST ({bill.gstPercent}%)
                      {bill.flaggedFields.some(f => f.includes('GST')) && bill.status === 'Draft' && (
                        <span className="ml-1 text-[10px] font-bold text-amber-600">⚠ Check</span>
                      )}
                    </span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{bill.gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-1 mt-1" style={{ borderColor: 'var(--border-color)' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span style={{ color: 'var(--text-primary)' }}>₹{bill.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {bill.status === 'Draft' && (
                <div className="flex gap-2">
                  <button className="btn btn-success flex-1" onClick={() => handleConfirm(bill.id)}>
                    <Check className="w-4 h-4" /> Confirm & Create Stock
                  </button>
                  <button className="btn btn-secondary">
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleReject(bill.id)}>
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
