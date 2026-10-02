import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  inventoryItems as initialInventory,
  orders as initialOrders,
  productionJobs as initialJobs,
  billCaptures as initialBills,
  enquiries as initialEnquiries,
  reviews as initialReviews,
  exportDocuments as initialExportDocs,
  customOrderRequests as initialCustomOrders,
  automationSettings as initialAutoSettings,
  type InventoryItem,
  type Order,
  type ProductionJob,
  type BillCapture,
  type Enquiry,
  type Review,
  type ExportDocument,
  type CustomOrderRequest,
  type AutomationSetting,
  type DraftStatus,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  inventory: InventoryItem[];
  orders: Order[];
  productionJobs: ProductionJob[];
  billCaptures: BillCapture[];
  enquiries: Enquiry[];
  reviews: Review[];
  exportDocuments: ExportDocument[];
  customOrderRequests: CustomOrderRequest[];
  automationSettings: AutomationSetting[];
  darkMode: boolean;
  toasts: Toast[];
  sidebarOpen: boolean;
}

type Action =
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'ADD_TOAST'; payload: { message: string; type: 'success' | 'error' | 'info' } }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'UPDATE_BILL_STATUS'; payload: { id: string; status: DraftStatus } }
  | { type: 'UPDATE_ENQUIRY_STATUS'; payload: { id: string; status: DraftStatus } }
  | { type: 'UPDATE_REVIEW_STATUS'; payload: { id: string; status: DraftStatus } }
  | { type: 'UPDATE_EXPORT_DOC_STATUS'; payload: { id: string; status: DraftStatus } }
  | { type: 'UPDATE_CUSTOM_ORDER_STATUS'; payload: { id: string; status: DraftStatus } }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'UPDATE_JOB_STAGE'; payload: { id: string; stage: ProductionJob['stage'] } }
  | { type: 'TOGGLE_AUTOMATION'; payload: string }
  | { type: 'ADD_INVENTORY_FROM_BILL'; payload: { billId: string } };

const initialState: AppState = {
  inventory: [...initialInventory],
  orders: [...initialOrders],
  productionJobs: [...initialJobs],
  billCaptures: [...initialBills],
  enquiries: [...initialEnquiries],
  reviews: [...initialReviews],
  exportDocuments: [...initialExportDocs],
  customOrderRequests: [...initialCustomOrders],
  automationSettings: [...initialAutoSettings],
  darkMode: false,
  toasts: [],
  sidebarOpen: true,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload };
    case 'ADD_TOAST': {
      const id = Date.now().toString();
      return { ...state, toasts: [...state.toasts, { id, ...action.payload }] };
    }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case 'UPDATE_BILL_STATUS':
      return {
        ...state,
        billCaptures: state.billCaptures.map(b =>
          b.id === action.payload.id ? { ...b, status: action.payload.status } : b
        ),
      };
    case 'UPDATE_ENQUIRY_STATUS':
      return {
        ...state,
        enquiries: state.enquiries.map(e =>
          e.id === action.payload.id ? { ...e, status: action.payload.status } : e
        ),
      };
    case 'UPDATE_REVIEW_STATUS':
      return {
        ...state,
        reviews: state.reviews.map(r =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        ),
      };
    case 'UPDATE_EXPORT_DOC_STATUS':
      return {
        ...state,
        exportDocuments: state.exportDocuments.map(d =>
          d.id === action.payload.id ? { ...d, status: action.payload.status } : d
        ),
      };
    case 'UPDATE_CUSTOM_ORDER_STATUS':
      return {
        ...state,
        customOrderRequests: state.customOrderRequests.map(c =>
          c.id === action.payload.id ? { ...c, status: action.payload.status } : c
        ),
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(o =>
          o.id === action.payload.id ? { ...o, status: action.payload.status } : o
        ),
      };
    case 'UPDATE_JOB_STAGE':
      return {
        ...state,
        productionJobs: state.productionJobs.map(j =>
          j.id === action.payload.id ? { ...j, stage: action.payload.stage } : j
        ),
      };
    case 'TOGGLE_AUTOMATION':
      return {
        ...state,
        automationSettings: state.automationSettings.map(a =>
          a.id === action.payload ? { ...a, enabled: !a.enabled } : a
        ),
      };
    case 'ADD_INVENTORY_FROM_BILL':
      // Simulate adding stock from confirmed bill
      return state;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-remove toasts after 3 seconds
  React.useEffect(() => {
    if (state.toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: state.toasts[0].id });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.toasts]);

  // Toggle dark class on html element
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

// Helper: count pending drafts
export function usePendingDraftCount() {
  const { state } = useApp();
  const bills = state.billCaptures.filter(b => b.status === 'Draft').length;
  const enquiries = state.enquiries.filter(e => e.status === 'Draft').length;
  const reviews = state.reviews.filter(r => r.status === 'Draft').length;
  const exportDocs = state.exportDocuments.filter(d => d.status === 'Draft').length;
  const customOrders = state.customOrderRequests.filter(c => c.status === 'Draft').length;
  return bills + enquiries + reviews + exportDocs + customOrders;
}
