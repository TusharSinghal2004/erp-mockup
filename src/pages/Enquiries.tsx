import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge } from '../components/shared';
import { inventoryItems } from '../data/mockData';
import { MessageCircle, Mail, Send, Pencil, X, CheckCircle } from 'lucide-react';

export function Enquiries() {
  const { state, dispatch } = useApp();

  return (
    <div>
      <PageHeader
        title="Enquiries Inbox"
        subtitle="WhatsApp & email enquiries — parsed, matched, and drafted for your review"
      />

      <div className="space-y-4">
        {state.enquiries.map(enq => {
          const matched = enq.matchedStock.map(id => inventoryItems.find(i => i.id === id)).filter(Boolean);

          return (
            <div key={enq.id} className="card overflow-hidden">
              {enq.status === 'Confirmed' && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Reply Sent</p>
                </div>
              )}
              {enq.status === 'Rejected' && (
                <div className="bg-gray-50 dark:bg-gray-900/20 border-b p-4" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Dismissed</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Original message */}
                <div className="p-5 border-r" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    {enq.source === 'WhatsApp' ? (
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Mail className="w-4 h-4 text-blue-600" />
                    )}
                    <span className={`badge ${enq.source === 'WhatsApp' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {enq.source}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      {new Date(enq.receivedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--bg-secondary)' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{enq.customerName}</p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{enq.message}</p>
                  </div>

                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    Extracted Request
                  </h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Stones</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{enq.extractedRequest.stones}</p>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Sizes</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{enq.extractedRequest.sizes}</p>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Quantity</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{enq.extractedRequest.quantity}</p>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    Matched Stock
                  </h4>
                  {matched.map(item => item && (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg mb-1" style={{ background: 'var(--bg-secondary)' }}>
                      <span className="text-lg">{item.photoPlaceholder}</span>
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.sku} — {item.stone} {item.shape}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{item.pieces} pcs · ${item.priceUSD}/strand</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Draft reply */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
                      Draft Reply & Quote
                    </h4>
                    <StatusBadge status={enq.status} />
                  </div>

                  <div className="p-4 rounded-xl border font-mono text-xs leading-relaxed whitespace-pre-wrap mb-4"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    {enq.draftReply}
                  </div>

                  <div className="p-3 rounded-lg mb-4" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Quote Total</span>
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>${enq.draftQuote.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-4 flex items-center gap-2">
                    <Send className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Nothing is sent automatically. Review and click Send.
                    </p>
                  </div>

                  {enq.status === 'Draft' && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-success flex-1"
                        onClick={() => {
                          dispatch({ type: 'UPDATE_ENQUIRY_STATUS', payload: { id: enq.id, status: 'Confirmed' } });
                          dispatch({ type: 'ADD_TOAST', payload: { message: `Reply sent to ${enq.customerName}`, type: 'success' } });
                        }}
                      >
                        <Send className="w-4 h-4" /> Send
                      </button>
                      <button className="btn btn-secondary">
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => {
                          dispatch({ type: 'UPDATE_ENQUIRY_STATUS', payload: { id: enq.id, status: 'Rejected' } });
                          dispatch({ type: 'ADD_TOAST', payload: { message: 'Enquiry dismissed', type: 'info' } });
                        }}
                      >
                        <X className="w-4 h-4" /> Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
