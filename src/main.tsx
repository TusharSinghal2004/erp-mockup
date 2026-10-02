import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Production } from './pages/Production';
import { BillCapture } from './pages/BillCapture';
import { Orders } from './pages/Orders';
import { CustomOrders } from './pages/CustomOrders';
import { ExportDocs } from './pages/ExportDocs';
import { Enquiries } from './pages/Enquiries';
import { Reviews } from './pages/Reviews';
import { Reports } from './pages/Reports';
import { ReviewQueue } from './pages/ReviewQueue';
import { Settings } from './pages/Settings';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<Inventory />} />
            <Route path="/production" element={<Production />} />
            <Route path="/bills" element={<BillCapture />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/export-docs" element={<ExportDocs />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/review-queue" element={<ReviewQueue />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
