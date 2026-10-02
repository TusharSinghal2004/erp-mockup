import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge } from '../components/shared';
import { orders, customers, inventoryItems, hsCodeTable } from '../data/mockData';
import { FileText, Check, Download, Pencil, CheckCircle } from 'lucide-react';

export function ExportDocs() {
  const { state, dispatch } = useApp();

  return (
    <div>
      <PageHeader
        title="Export Documents"
        subtitle="Commercial invoices and packing lists — auto-drafted, manually approved"
      />

      {/* HS Code reference table */}
      <div className="card p-5 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
          HS Code & Duty Table (Editable)
        </h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>HS Code</th>
              <th>Description</th>
              <th>Duty %</th>
            </tr>
          </thead>
          <tbody>
            {hsCodeTable.map(hs => (
              <tr key={hs.code}>
                <td className="font-mono text-xs font-medium">{hs.code}</td>
                <td className="text-sm">{hs.description}</td>
                <td className="text-sm font-medium">{hs.dutyPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Documents */}
      <div className="space-y-4">
        {state.exportDocuments.map(doc => {
          const order = orders.find(o => o.id === doc.orderId);
          const customer = order ? customers.find(c => c.id === order.customerId) : null;

          return (
            <div key={doc.id} className="card overflow-hidden">
              {doc.status === 'Approved' && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Document Approved</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {doc.type}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Order: {order?.orderNumber} · {customer?.name}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 rounded-lg mb-4" style={{ background: 'var(--bg-secondary)' }}>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>HS Code</p>
                    <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{doc.hsCode}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Currency</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{doc.currency}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Landed Cost</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {doc.currency === 'EUR' ? '€' : '$'}{doc.landedCost.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Duty Rate</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{doc.dutyPercent}%</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Duty Amount</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {doc.currency === 'EUR' ? '€' : '$'}{doc.dutyAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Line items preview */}
                {order && (
                  <table className="data-table mb-4">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((oi, idx) => {
                        const item = inventoryItems.find(i => i.id === oi.itemId);
                        return (
                          <tr key={idx}>
                            <td className="text-sm">{item?.stone} {item?.cut} {item?.shape} ({item?.sku})</td>
                            <td>{oi.quantity}</td>
                            <td>{doc.currency === 'EUR' ? '€' : '$'}{oi.price.toFixed(2)}</td>
                            <td className="font-medium">{doc.currency === 'EUR' ? '€' : '$'}{(oi.quantity * oi.price).toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {doc.status === 'Draft' && (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        dispatch({ type: 'UPDATE_EXPORT_DOC_STATUS', payload: { id: doc.id, status: 'Approved' } });
                        dispatch({ type: 'ADD_TOAST', payload: { message: `${doc.type} approved — PDF ready for download`, type: 'success' } });
                      }}
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button className="btn btn-secondary">
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
