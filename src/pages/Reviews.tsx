import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge } from '../components/shared';
import { Star, Send, Pencil, CheckCircle, AlertTriangle } from 'lucide-react';

export function Reviews() {
  const { state, dispatch } = useApp();

  // Sort: low ratings first
  const sortedReviews = [...state.reviews].sort((a, b) => a.rating - b.rating);

  // Issue summary
  const issueCounts = state.reviews.reduce((acc, r) => {
    if (r.issueTag && r.issueTag !== 'None') {
      acc[r.issueTag] = (acc[r.issueTag] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const avgRating = (state.reviews.reduce((sum, r) => sum + r.rating, 0) / state.reviews.length).toFixed(1);

  return (
    <div>
      <PageHeader
        title="Review Monitoring"
        subtitle={`${state.reviews.length} reviews · ${avgRating}★ average`}
      />

      {/* Issue summary */}
      <div className="card p-5 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
          Complaint Summary by Issue
        </h3>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(issueCounts).map(([issue, count]) => (
            <div key={issue} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{issue}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">{count}</span>
            </div>
          ))}
          {Object.keys(issueCounts).length === 0 && (
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No issues reported</p>
          )}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {sortedReviews.map(review => (
          <div key={review.id} className="card overflow-hidden">
            {review.status === 'Confirmed' && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800 p-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Reply Posted</p>
              </div>
            )}

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {/* Star rating */}
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : ''}`}
                          style={s > review.rating ? { color: 'var(--text-tertiary)' } : {}}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {review.customerName}
                    </span>
                    {review.rating <= 2 && (
                      <span className="badge badge-low">Low Rating</span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {review.listingName} · {review.listingSku} · {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {review.issueTag && review.issueTag !== 'None' && (
                    <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{review.issueTag}</span>
                  )}
                  <StatusBadge status={review.status} />
                </div>
              </div>

              <div className="p-3 rounded-lg mb-3" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-sm italic" style={{ color: 'var(--text-primary)' }}>"{review.reviewText}"</p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>
                  Draft Reply
                </p>
                <div className="p-3 rounded-lg border text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  {review.draftReply}
                </div>
              </div>

              {review.status === 'Draft' && (
                <div className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      dispatch({ type: 'UPDATE_REVIEW_STATUS', payload: { id: review.id, status: 'Confirmed' } });
                      dispatch({ type: 'ADD_TOAST', payload: { message: 'Review reply posted', type: 'success' } });
                    }}
                  >
                    <Send className="w-3.5 h-3.5" /> Post Reply
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
