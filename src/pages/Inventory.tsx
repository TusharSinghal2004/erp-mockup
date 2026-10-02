import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge, StaffOnlyField } from '../components/shared';
import { Search, Filter, Grid3X3, List, ScanLine, QrCode, Printer, ChevronRight, X, ArrowLeft } from 'lucide-react';

export function Inventory() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStone, setFilterStone] = useState('');
  const [filterShape, setFilterShape] = useState('');
  const [filterTreatment, setFilterTreatment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [stockCountMode, setStockCountMode] = useState(false);
  const [scannedItem, setScannedItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const stones = [...new Set(state.inventory.map(i => i.stone))].sort();
  const shapes = [...new Set(state.inventory.map(i => i.shape))].sort();
  const treatments = [...new Set(state.inventory.map(i => i.treatment))].sort();
  const locations = [...new Set(state.inventory.map(i => i.location))].sort();

  const filteredItems = state.inventory.filter(item => {
    const matchSearch = !searchQuery ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shape.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStone = !filterStone || item.stone === filterStone;
    const matchShape = !filterShape || item.shape === filterShape;
    const matchTreatment = !filterTreatment || item.treatment === filterTreatment;
    const matchStatus = !filterStatus || item.status === filterStatus;
    const matchLocation = !filterLocation || item.location === filterLocation;
    return matchSearch && matchStone && matchShape && matchTreatment && matchStatus && matchLocation;
  });

  const handleFakeScan = () => {
    const randomItem = state.inventory[Math.floor(Math.random() * state.inventory.length)];
    setScannedItem(randomItem.id);
    setTimeout(() => setScannedItem(null), 3000);
  };

  const detail = selectedItem ? state.inventory.find(i => i.id === selectedItem) : null;

  if (detail) {
    return (
      <div>
        <button
          onClick={() => setSelectedItem(null)}
          className="btn btn-ghost mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo and QR */}
          <div className="card p-6">
            <div className="aspect-square rounded-xl flex items-center justify-center text-6xl mb-4" style={{ background: 'var(--bg-tertiary)' }}>
              {detail.photoPlaceholder}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <span className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{detail.sku}</span>
              </div>
              <button className="btn btn-secondary btn-sm">
                <Printer className="w-3.5 h-3.5" /> Print Label
              </button>
            </div>
            <div className="mt-4 p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>QR Label Preview</p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded flex items-center justify-center">
                  <QrCode className="w-10 h-10" style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <p className="font-bold">{detail.sku}</p>
                  <p>{detail.stone} {detail.cut} {detail.shape}</p>
                  <p>{detail.sizeRange}</p>
                  <p>{detail.lotNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                {detail.stone} {detail.cut} {detail.shape} Beads
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {detail.sku} · {detail.lotNumber}
              </p>

              {/* Locked attribute block */}
              <div className="p-4 rounded-xl border-2 border-dashed mb-4" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-3 flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                  🔒 Staff Entry Only
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <StaffOnlyField label="Stone" value={detail.stone} />
                  <StaffOnlyField label="Treatment" value={detail.treatment} />
                  <StaffOnlyField label="Grade" value={detail.grade} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Shape / Cut</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{detail.shape} · {detail.cut}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Size Range</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{detail.sizeRange}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Strand Length</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{detail.strandLength}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Location</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{detail.location}</p>
                </div>
              </div>
            </div>

            {/* Unit conversions */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
                Measurements & Pricing
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Pieces</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{detail.pieces}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Weight (ct)</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{detail.weightCarats}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Weight (g)</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{detail.weightGrams}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Strands</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>1</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Price (INR)</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>₹{detail.priceINR.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Price (USD)</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>${detail.priceUSD.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Channels */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
                Listed On
              </h3>
              <div className="flex gap-2 flex-wrap">
                {detail.channels.map(ch => (
                  <span key={ch} className={`badge ${ch === 'Etsy' ? 'bg-orange-100 text-orange-700' : ch === 'Wholesale' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock movements ledger */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
                Stock Movements
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{detail.dateAdded}</td>
                    <td><span className="badge badge-confirmed">Inward</span></td>
                    <td>+{detail.pieces}</td>
                    <td className="font-mono text-xs">{detail.lotNumber}</td>
                  </tr>
                  <tr>
                    <td>{detail.lastMovement}</td>
                    <td><span className="badge badge-pending">Reserved</span></td>
                    <td>-2</td>
                    <td className="font-mono text-xs">ORD-2024-1001</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Stock count mode
  if (stockCountMode) {
    return (
      <div>
        <PageHeader
          title="Stock Count Mode"
          subtitle="Scan or tap items to count stock"
          actions={
            <button className="btn btn-secondary" onClick={() => setStockCountMode(false)}>
              <X className="w-4 h-4" /> Exit
            </button>
          }
        />
        <div className="card p-6 max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center mx-auto mb-4">
            <ScanLine className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Ready to Scan
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Point your camera at a QR label or tap the button below to simulate
          </p>
          <button className="btn btn-primary w-full max-w-xs mx-auto" onClick={handleFakeScan}>
            <ScanLine className="w-4 h-4" /> Simulate Scan
          </button>

          {scannedItem && (() => {
            const item = state.inventory.find(i => i.id === scannedItem);
            if (!item) return null;
            return (
              <div className="mt-6 p-4 rounded-xl border-2 border-emerald-500 text-left" style={{ background: 'var(--bg-secondary)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.photoPlaceholder}</span>
                  <div>
                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.sku}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.stone} {item.cut} {item.shape}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.location} · {item.pieces} pcs</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <input type="number" defaultValue={item.pieces} className="input w-24" />
                  <button className="btn btn-success btn-sm">Update Count</button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Inventory"
        subtitle={`${filteredItems.length} items · ${state.inventory.filter(i => i.status === 'Low Stock').length} low stock`}
        actions={
          <button className="btn btn-primary" onClick={() => setStockCountMode(true)}>
            <ScanLine className="w-4 h-4" /> Stock Count
          </button>
        }
      />

      {/* Toolbar */}
      <div className="card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search by SKU, stone, shape…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="flex rounded-md border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              <button
                className={`px-3 py-1.5 text-sm ${viewMode === 'table' ? 'bg-[var(--bg-tertiary)] font-medium text-[var(--text-primary)]' : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
                onClick={() => setViewMode('table')}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                className={`px-3 py-1.5 text-sm ${viewMode === 'grid' ? 'bg-[var(--bg-tertiary)] font-medium text-[var(--text-primary)]' : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter row */}
        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <select className="input text-sm" value={filterStone} onChange={e => setFilterStone(e.target.value)}>
              <option value="">All Stones</option>
              {stones.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="input text-sm" value={filterShape} onChange={e => setFilterShape(e.target.value)}>
              <option value="">All Shapes</option>
              {shapes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="input text-sm" value={filterTreatment} onChange={e => setFilterTreatment(e.target.value)}>
              <option value="">All Treatments</option>
              {treatments.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select className="input text-sm" value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select className="input text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        )}
      </div>

      {/* Table view */}
      {viewMode === 'table' ? (
        <div className="card overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>SKU</th>
                <th>Stone</th>
                <th>Shape / Cut</th>
                <th>Size Range</th>
                <th>Pcs</th>
                <th>Weight (ct)</th>
                <th>Treatment</th>
                <th>Location</th>
                <th>₹ INR</th>
                <th>$ USD</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="cursor-pointer" onClick={() => setSelectedItem(item.id)}>
                  <td className="text-xl">{item.photoPlaceholder}</td>
                  <td className="font-mono font-medium text-xs">{item.sku}</td>
                  <td className="font-medium">{item.stone}</td>
                  <td className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.shape} · {item.cut}</td>
                  <td className="text-sm">{item.sizeRange}</td>
                  <td>{item.pieces}</td>
                  <td>{item.weightCarats}</td>
                  <td>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${item.treatment === 'Natural' ? 'bg-emerald-100 text-emerald-700' : item.treatment === 'Heated' ? 'bg-amber-100 text-amber-700' : item.treatment === 'Dyed' ? 'bg-rose-100 text-rose-700' : 'bg-red-100 text-red-700'}`}>
                      {item.treatment}
                    </span>
                  </td>
                  <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.location}</td>
                  <td className="font-medium">₹{item.priceINR.toLocaleString()}</td>
                  <td className="font-medium">${item.priceUSD.toFixed(2)}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td><ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map(item => (
            <button
              key={item.id}
              className="card card-interactive p-4 text-left"
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="aspect-square rounded-lg flex items-center justify-center text-4xl mb-3" style={{ background: 'var(--bg-tertiary)' }}>
                {item.photoPlaceholder}
              </div>
              <p className="font-mono text-xs font-medium" style={{ color: 'var(--accent)' }}>{item.sku}</p>
              <p className="text-sm font-medium truncate mt-1" style={{ color: 'var(--text-primary)' }}>
                {item.stone} {item.shape}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.sizeRange}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>${item.priceUSD.toFixed(2)}</span>
                <StatusBadge status={item.status} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
