import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge } from '../components/shared';
import { Check, ExternalLink, Receipt, FileText, Send, Star, MessageSquare, FileCheck } from 'lucide-react';

interface QueueItem {
  id: string;
  type: 'Bill' | 'Quote' | 'Export Doc' | 'Enquiry Reply' | 'Review Reply';
  title: string;
  age: string;
  status: string;
  path: string;
  icon: any;
  confirmAction: () => void;
}

export function ReviewQueue() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const queueItems: QueueItem[] = [
    ...state.billCaptures
      .filter(b => b.status === 'Draft')
      .map(b => ({
        id: b.id,
        type: 'Bill' as const,
        title: `${b.supplierName} — ${b.billNumber}`,
        age: `${Math.floor((Date.now() - new Date(b.billDate).getTime()) / 86400000)}d ago`,
        status: b.status,
        path: '/bills',
        icon: Receipt,
        confirmAction: () => {
          dispatch({ type: 'UPDATE_BILL_STATUS', payload: { id: b.id, status: 'Confirmed' } });
          dispatch({ type: 'ADD_TOAST', payload: { message: 'Bill confirmed', type: 'success' } });
        },
      })),
    ...state.customOrderRequests
      .filter(c => c.status === 'Draft')
      .map(c => ({
        id: c.id,
        type: 'Quote' as const,
        title: `${c.customerName} — ${c.structured.stone} ${c.structured.shape}`,
        age: `${Math.floor((Date.now() - new Date(c.receivedAt).getTime()) / 86400000)}d ago`,
        status: c.status,
        path: '/custom-orders',
        icon: FileText,
        confirmAction: () => {
          dispatch({ type: 'UPDATE_CUSTOM_ORDER_STATUS', payload: { id: c.id, status: 'Approved' } });
          dispatch({ type: 'ADD_TOAST', payload: { message: 'Quote approved', type: 'success' } });
        },
      })),
    ...state.exportDocuments
      .filter(d => d.status === 'Draft')
      .map(d => ({
        id: d.id,
        type: 'Export Doc' as const,
        title: `${d.type} — HS ${d.hsCode}`,
        age: `${Math.floor((Date.now() - new Date(d.createdDate).getTime()) / 86400000)}d ago`,
        status: d.status,
        path: '/export-docs',
        icon: FileCheck,
        confirmAction: () => {
          dispatch({ type: 'UPDATE_EXPORT_DOC_STATUS', payload: { id: d.id, status: 'Approved' } });
          dispatch({ type: 'ADD_TOAST', payload: { message: 'Document approved', type: 'success' } });
        },
      })),
    ...state.enquiries
      .filter(e => e.status === 'Draft')
      .map(e => ({
        id: e.id,
        type: 'Enquiry Reply' as const,
        title: `${e.customerName} — ${e.source}`,
        age: `${Math.floor((Date.now() - new Date(e.receivedAt).getTime()) / 86400000)}d ago`,
        status: e.status,
        path: '/enquiries',
        icon: MessageSquare,
        confirmAction: () => {
          dispatch({ type: 'UPDATE_ENQUIRY_STATUS', payload: { id: e.id, status: 'Confirmed' } });
          dispatch({ type: 'ADD_TOAST', payload: { message: 'Reply sent', type: 'success' } });
        },
      })),
    ...state.reviews
      .filter(r => r.status === 'Draft')
      .map(r => ({
        id: r.id,
        type: 'Review Reply' as const,
        title: `${r.customerName} — ${r.rating}★ on ${r.listingSku}`,
        age: `${Math.floor((Date.now() - new Date(r.date).getTime()) / 86400000)}d ago`,
        status: r.status,
        path: '/reviews',
        icon: Star,
        confirmAction: () => {
          dispatch({ type: 'UPDATE_REVIEW_STATUS', payload: { id: r.id, status: 'Confirmed' } });
          dispatch({ type: 'ADD_TOAST', payload: { message: 'Reply posted', type: 'success' } });
        },
      })),
  ];

  const typeColors: Record<string, string> = {
    'Bill': 'from-green-500 to-emerald-600',
    'Quote': 'from-blue-500 to-indigo-600',
    'Export Doc': 'from-purple-500 to-violet-600',
    'Enquiry Reply': 'from-teal-500 to-cyan-600',
    'Review Reply': 'from-amber-500 to-orange-600',
  };

  return (
    <div>
      <PageHeader
        title="Review Queue"
        subtitle={`${queueItems.length} pending drafts need your review`}
      />

      {queueItems.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>All caught up!</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No pending drafts to review.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {queueItems.map(item => {
            const Icon = item.icon;
            return (
              <div key={`${item.type}-${item.id}`} className="card p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[item.type]} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="badge badge-draft">{item.type}</span>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.age}</span>
                    </div>
                    <p className="text-sm font-medium mt-1 truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={item.confirmAction}
                    >
                      <Check className="w-3.5 h-3.5" /> Confirm
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigate(item.path)}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
