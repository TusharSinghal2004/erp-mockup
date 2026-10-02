import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge } from '../components/shared';
import type { JobStage } from '../data/mockData';
import { ArrowRight, User, ExternalLink, X } from 'lucide-react';

const stages: JobStage[] = ['Cutting', 'Shaping', 'Polishing', 'Quality Check', 'Packing'];
const stageColors: Record<JobStage, string> = {
  'Cutting': 'border-l-red-400',
  'Shaping': 'border-l-orange-400',
  'Polishing': 'border-l-blue-400',
  'Quality Check': 'border-l-purple-400',
  'Packing': 'border-l-emerald-400',
};

export function Production() {
  const { state, dispatch } = useApp();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const outsideKarigars = state.productionJobs.filter(j => j.isOutsideKarigar);
  const job = selectedJob ? state.productionJobs.find(j => j.id === selectedJob) : null;

  const moveToNextStage = (jobId: string) => {
    const j = state.productionJobs.find(j => j.id === jobId);
    if (!j) return;
    const idx = stages.indexOf(j.stage);
    if (idx < stages.length - 1) {
      dispatch({ type: 'UPDATE_JOB_STAGE', payload: { id: jobId, stage: stages[idx + 1] } });
      dispatch({ type: 'ADD_TOAST', payload: { message: `${j.jobNumber} moved to ${stages[idx + 1]}`, type: 'success' } });
    }
  };

  return (
    <div>
      <PageHeader
        title="Production & Job Work"
        subtitle={`${state.productionJobs.length} active jobs · ${outsideKarigars.length} with outside karigars`}
      />

      {/* Kanban board */}
      <div className="overflow-x-auto pb-4 mb-6">
        <div className="flex gap-4" style={{ minWidth: stages.length * 300 }}>
          {stages.map(stage => {
            const jobs = state.productionJobs.filter(j => j.stage === stage);
            return (
              <div key={stage} className="kanban-column flex-1">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{stage}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {jobs.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {jobs.map(j => (
                    <button
                      key={j.id}
                      onClick={() => setSelectedJob(j.id)}
                      className={`card p-4 w-full text-left border-l-4 ${stageColors[stage]}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-medium" style={{ color: 'var(--accent)' }}>{j.jobNumber}</span>
                        {j.isOutsideKarigar && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Outside</span>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {j.stone} {j.cut} {j.shape}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                        <div>
                          <p style={{ color: 'var(--text-tertiary)' }}>In</p>
                          <p className="font-medium">{j.weightIn}ct</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-tertiary)' }}>Out</p>
                          <p className="font-medium">{j.weightOut > 0 ? `${j.weightOut}ct` : '—'}</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-tertiary)' }}>Waste</p>
                          <p className="font-medium">{j.wastagePercent > 0 ? `${j.wastagePercent}%` : '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        <User className="w-3 h-3" />
                        {j.worker}
                      </div>
                    </button>
                  ))}
                  {jobs.length === 0 && (
                    <div className="p-6 text-center rounded-lg border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>No jobs</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outside karigars list */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
          Pending with Outside Karigars
        </h3>
        {outsideKarigars.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: 'var(--text-tertiary)' }}>No items with outside karigars</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Job #</th>
                <th>Karigar</th>
                <th>Stone</th>
                <th>Weight In</th>
                <th>Stage</th>
                <th>Expected</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {outsideKarigars.map(j => (
                <tr key={j.id}>
                  <td className="font-mono text-xs font-medium">{j.jobNumber}</td>
                  <td className="flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
                    {j.worker}
                  </td>
                  <td>{j.stone} {j.shape}</td>
                  <td>{j.weightIn} ct</td>
                  <td><StatusBadge status={j.stage} /></td>
                  <td className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(j.expectedCompletion).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedJob(j.id)}>
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Job detail modal */}
      {job && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div
            className="card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                {job.jobNumber}
              </h3>
              <button className="btn-ghost p-1 rounded" onClick={() => setSelectedJob(null)}>
                <X className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Stone</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{job.stone} {job.cut} {job.shape}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Worker</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {job.worker} {job.isOutsideKarigar && <span className="text-amber-600 text-xs">(Outside)</span>}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Weight In</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{job.weightIn} ct</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Weight Out</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{job.weightOut > 0 ? `${job.weightOut} ct` : '—'}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Wastage</p>
                  <p className="text-lg font-bold" style={{ color: job.wastagePercent > 15 ? '#ef4444' : 'var(--text-primary)' }}>
                    {job.wastagePercent > 0 ? `${job.wastagePercent}%` : '—'}
                  </p>
                </div>
              </div>

              {/* Issue/Receive form */}
              <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {job.weightOut === 0 ? 'Issue Material' : 'Receive Material'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-tertiary)' }}>Weight (ct)</label>
                    <input type="number" className="input" defaultValue={job.weightOut || ''} placeholder="Enter weight" />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-tertiary)' }}>Date</label>
                    <input type="date" className="input" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-tertiary)' }}>Notes</label>
                  <textarea className="input" rows={2} defaultValue={job.notes || ''} placeholder="Add notes…" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  className="btn btn-primary flex-1"
                  onClick={() => {
                    moveToNextStage(job.id);
                    setSelectedJob(null);
                  }}
                  disabled={job.stage === 'Packing'}
                >
                  <ArrowRight className="w-4 h-4" />
                  {job.stage === 'Packing' ? 'Complete' : `Move to ${stages[stages.indexOf(job.stage) + 1]}`}
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedJob(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
