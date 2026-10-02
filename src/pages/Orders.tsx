import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader, StatusBadge, ChannelBadge } from '../components/shared';
import { customers, inventoryItems } from '../data/mockData';
import { ShoppingCart, Package, CreditCard, Truck, ChevronRight, X } from 'lucide-react';

export function Orders() {
  const { state, dispatch } = useApp();
  const [filterChannel, setFilterChannel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filtered = state.orders.filter(o => {
    const matchChannel = !filterChannel || o.channel === filterChannel;
    const matchStatus = !filterStatus || o.status === filterStatus;
    const matchCustom = showCustom ? o.isCustomOrder : true;
    return matchChannel && matchStatus && matchCustom;
  });

  const order = selectedOrder ? state.orders.find(o => o.id === selectedOrder) : null;
  const orderCustomer = order ? customers.find(c => c.id === order.customerId) : null;

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle={`${state.orders.length} total orders · ${state.orders.filter(o => o.status === 'Pending').length} pending`}
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {['All', 'Etsy', 'Wholesale', 'Export'].map(ch => (
          <button
            key={ch}
            className={`btn btn-sm ${filterChannel === (ch === 'All' ? '' : ch) ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilterChannel(ch === 'All' ? '' : ch)}
          >
            {ch}
          </button>
        ))}
        <button
          className={`btn btn-sm ml-2 ${showCustom ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setShowCustom(!showCustom)}
        >
          Custom Orders
        </button>
      </div>

      {/* Filter by status */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['', 'Draft', 'Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered'].map(s => (
          <button
            key={s}
            className={`badge cursor-pointer ${filterStatus === s ? 'ring-2 ring-[var(--accent)]' : ''} ${s ? `badge-${s.toLowerCase().replace(' ', '-')}` : 'bg-[var(--bg-tertiary)]'}`}
            onClick={() => setFilterStatus(s)}
            style={!s ? { color: 'var(--text-secondary)' } : {}}
          >
            {s || 'All Status'}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="card overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Channel</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Ship By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => {
              const cust = customers.find(c => c.id === o.customerId);
              return (
                <tr key={o.id} className="cursor-pointer" onClick={() => setSelectedOrder(o.id)}>
                  <td className="font-mono text-xs font-medium">{o.orderNumber}</td>
                  <td className="font-medium">{cust?.name || '—'}</td>
                  <td><ChannelBadge channel={o.channel} /></td>
                  <td>{o.items.length}</td>
                  <td className="font-medium">
                    {o.currency === 'INR' ? '₹' : o.currency === 'EUR' ? '€' : '$'}
                    {o.totalAmount.toLocaleString()}
                  </td>
                  <td><StatusBadge status={o.paymentStatus} /></td>
                  <td><StatusBadge status={o.status} /></td>
                  <td className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(o.expectedShip).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td><ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order detail modal */}
      {order && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                  {order.orderNumber}
                </h3>
                <div className="flex gap-2 mt-1">
                  <ChannelBadge channel={order.channel} />
                  <StatusBadge status={order.status} />
                </div>
              </div>
              <button className="btn-ghost p-1 rounded" onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              </button>
            </div>

            {/* Customer info */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Customer</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{orderCustomer?.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{orderCustomer?.email}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Ship To</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{order.shippingAddress}</p>
              </div>
            </div>

            {/* Items */}
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Items</h4>
            <table className="data-table mb-4">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((oi, idx) => {
                  const item = inventoryItems.find(i => i.id === oi.itemId);
                  return (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item?.photoPlaceholder}</span>
                          <div>
                            <p className="font-medium text-sm">{item?.stone} {item?.shape}</p>
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item?.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td>{oi.quantity}</td>
                      <td className="font-medium">
                        {order.currency === 'INR' ? '₹' : order.currency === 'EUR' ? '€' : '$'}
                        {oi.price.toLocaleString()}
                      </td>
                      <td>
                        <span className={`badge ${item && item.pieces >= oi.quantity ? 'badge-confirmed' : 'badge-low'}`}>
                          {item && item.pieces >= oi.quantity ? 'Reserved' : 'Short'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Status sections */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg text-center" style={{ background: 'var(--bg-secondary)' }}>
                <Package className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Packing</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {['Shipped', 'Delivered'].includes(order.status) ? 'Done' : 'Pending'}
                </p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: 'var(--bg-secondary)' }}>
                <Truck className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Shipping</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {order.trackingNumber || 'Not shipped'}
                </p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: 'var(--bg-secondary)' }}>
                <CreditCard className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Payment</p>
                <StatusBadge status={order.paymentStatus} />
              </div>
            </div>

            {order.notes && (
              <div className="p-3 rounded-lg mb-4 text-sm" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                <strong>Notes:</strong> {order.notes}
              </div>
            )}

            <div className="flex gap-2">
              {order.status === 'Draft' && (
                <button className="btn btn-primary" onClick={() => {
                  dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: order.id, status: 'Confirmed' } });
                  dispatch({ type: 'ADD_TOAST', payload: { message: `${order.orderNumber} confirmed`, type: 'success' } });
                }}>
                  Confirm Order
                </button>
              )}
              {order.status === 'Confirmed' && (
                <button className="btn btn-primary" onClick={() => {
                  dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: order.id, status: 'Shipped' } });
                  dispatch({ type: 'ADD_TOAST', payload: { message: `${order.orderNumber} marked as shipped`, type: 'success' } });
                }}>
                  <Truck className="w-4 h-4" /> Mark Shipped
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
