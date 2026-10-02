// ─── Mock Data for N.K. Impex ERP ───

export type Treatment = 'Natural' | 'Heated' | 'Dyed' | 'Glass Filled';
export type ItemStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reserved';
export type OrderStatus = 'Draft' | 'Confirmed' | 'In Production' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
export type DraftStatus = 'Draft' | 'Confirmed' | 'Rejected' | 'Approved';
export type Channel = 'Etsy' | 'Wholesale' | 'Export';
export type JobStage = 'Cutting' | 'Shaping' | 'Polishing' | 'Quality Check' | 'Packing';

export interface InventoryItem {
  id: string;
  sku: string;
  stone: string;
  shape: string;
  cut: string;
  sizeRange: string;
  strandLength: string;
  pieces: number;
  weightCarats: number;
  weightGrams: number;
  treatment: Treatment;
  grade: string;
  location: string;
  priceINR: number;
  priceUSD: number;
  status: ItemStatus;
  channels: Channel[];
  photoPlaceholder: string;
  lotNumber: string;
  dateAdded: string;
  lastMovement: string;
}

export interface Customer {
  id: string;
  name: string;
  channel: Channel;
  country: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  currency: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  phone: string;
  gstNumber: string;
  specialization: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  channel: Channel;
  status: OrderStatus;
  items: { itemId: string; quantity: number; price: number }[];
  totalAmount: number;
  currency: string;
  orderDate: string;
  expectedShip: string;
  shippingAddress: string;
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  trackingNumber?: string;
  isCustomOrder: boolean;
  notes?: string;
}

export interface ProductionJob {
  id: string;
  jobNumber: string;
  stage: JobStage;
  stone: string;
  shape: string;
  cut: string;
  weightIn: number;
  weightOut: number;
  wastagePercent: number;
  worker: string;
  isOutsideKarigar: boolean;
  orderId?: string;
  startDate: string;
  expectedCompletion: string;
  notes?: string;
}

export interface BillCapture {
  id: string;
  supplierName: string;
  billNumber: string;
  billDate: string;
  items: {
    description: string;
    weight: number;
    rate: number;
    amount: number;
    checkThis?: boolean;
  }[];
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
  status: DraftStatus;
  flaggedFields: string[];
}

export interface Enquiry {
  id: string;
  source: 'WhatsApp' | 'Email';
  customerName: string;
  message: string;
  extractedRequest: {
    stones: string;
    sizes: string;
    quantity: string;
  };
  matchedStock: string[];
  draftReply: string;
  draftQuote: number;
  status: DraftStatus;
  receivedAt: string;
}

export interface Review {
  id: string;
  platform: 'Etsy';
  customerName: string;
  rating: number;
  reviewText: string;
  listingSku: string;
  listingName: string;
  issueTag: string;
  draftReply: string;
  status: DraftStatus;
  date: string;
}

export interface ExportDocument {
  id: string;
  orderId: string;
  type: 'Commercial Invoice' | 'Packing List';
  hsCode: string;
  currency: string;
  landedCost: number;
  dutyPercent: number;
  dutyAmount: number;
  status: DraftStatus;
  createdDate: string;
}

export interface CustomOrderRequest {
  id: string;
  customerName: string;
  request: string;
  structured: {
    stone: string;
    shape: string;
    size: string;
    quantity: number;
  };
  matchedStockIds: string[];
  costPerPiece: number;
  totalCost: number;
  estimatedLeadDays: number;
  draftQuoteEmail: string;
  status: DraftStatus;
  receivedAt: string;
}

// ─── Inventory (40 items) ───

export const inventoryItems: InventoryItem[] = [
  {
    id: 'inv-1', sku: 'SKU2055', stone: 'Moss Aquamarine', shape: 'Pear', cut: 'Faceted',
    sizeRange: '8.5×13 to 13×17.5 mm', strandLength: '8 inch', pieces: 22, weightCarats: 145.6, weightGrams: 29.12,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-1', priceINR: 4200, priceUSD: 50.40,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🟢',
    lotNumber: 'LOT-2024-0455', dateAdded: '2024-08-12', lastMovement: '2024-09-28'
  },
  {
    id: 'inv-2', sku: 'SKU801', stone: 'Multi Fluorite', shape: 'Heart', cut: 'Faceted',
    sizeRange: '11×11 to 12×12 mm', strandLength: '8 inch', pieces: 18, weightCarats: 210.0, weightGrams: 42.0,
    treatment: 'Natural', grade: 'A', location: 'Vault A-2', priceINR: 2800, priceUSD: 33.60,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🟣',
    lotNumber: 'LOT-2024-0398', dateAdded: '2024-07-20', lastMovement: '2024-09-15'
  },
  {
    id: 'inv-3', sku: 'SKU1050', stone: 'Yellow Citrine', shape: 'Fancy', cut: 'Fancy Cut',
    sizeRange: '10×8 to 14×10 mm', strandLength: '8 inch', pieces: 25, weightCarats: 175.0, weightGrams: 35.0,
    treatment: 'Natural', grade: 'AAA', location: 'Vault B-1', priceINR: 5500, priceUSD: 66.00,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '🟡',
    lotNumber: 'LOT-2024-0512', dateAdded: '2024-09-01', lastMovement: '2024-09-30'
  },
  {
    id: 'inv-4', sku: 'SKU1343', stone: 'Grey Moonstone', shape: 'Briolette', cut: 'Faceted',
    sizeRange: '7×5 to 10×7 mm', strandLength: '8 inch', pieces: 30, weightCarats: 120.0, weightGrams: 24.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-3', priceINR: 3200, priceUSD: 38.40,
    status: 'Low Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '⚪',
    lotNumber: 'LOT-2024-0480', dateAdded: '2024-08-25', lastMovement: '2024-10-01'
  },
  {
    id: 'inv-5', sku: 'SKU2730', stone: 'Peridot', shape: 'Marquise', cut: 'Faceted',
    sizeRange: '6×3 to 8×4 mm', strandLength: '14 inch', pieces: 65, weightCarats: 98.5, weightGrams: 19.7,
    treatment: 'Natural', grade: 'A', location: 'Vault B-2', priceINR: 3800, priceUSD: 45.60,
    status: 'In Stock', channels: ['Etsy', 'Wholesale', 'Export'], photoPlaceholder: '💚',
    lotNumber: 'LOT-2024-0523', dateAdded: '2024-09-05', lastMovement: '2024-09-20'
  },
  {
    id: 'inv-6', sku: 'SKU138', stone: 'Emerald', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '2 to 3 mm', strandLength: '7.5 inch', pieces: 120, weightCarats: 18.5, weightGrams: 3.7,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-1', priceINR: 12500, priceUSD: 150.00,
    status: 'In Stock', channels: ['Export'], photoPlaceholder: '💎',
    lotNumber: 'LOT-2024-0345', dateAdded: '2024-06-15', lastMovement: '2024-09-10'
  },
  {
    id: 'inv-7', sku: 'SKU1907', stone: 'Blue Topaz', shape: 'Chips Nuggets', cut: 'Smooth',
    sizeRange: '5 to 8 mm', strandLength: '36 inch', pieces: 280, weightCarats: 450.0, weightGrams: 90.0,
    treatment: 'Dyed', grade: 'B+', location: 'Vault C-1', priceINR: 1200, priceUSD: 14.40,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🔵',
    lotNumber: 'LOT-2024-0601', dateAdded: '2024-09-18', lastMovement: '2024-09-28'
  },
  {
    id: 'inv-8', sku: 'SKU445', stone: 'Ethiopian Opal', shape: 'Round', cut: 'Cabochon',
    sizeRange: '4 to 6 mm', strandLength: '8 inch', pieces: 35, weightCarats: 42.0, weightGrams: 8.4,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-1', priceINR: 18500, priceUSD: 222.00,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🌈',
    lotNumber: 'LOT-2024-0402', dateAdded: '2024-07-28', lastMovement: '2024-09-25'
  },
  {
    id: 'inv-9', sku: 'SKU1122', stone: 'Rhodolite Garnet', shape: 'Oval', cut: 'Faceted',
    sizeRange: '5×7 to 7×9 mm', strandLength: '8 inch', pieces: 28, weightCarats: 135.0, weightGrams: 27.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault B-1', priceINR: 4800, priceUSD: 57.60,
    status: 'In Stock', channels: ['Wholesale'], photoPlaceholder: '🔴',
    lotNumber: 'LOT-2024-0478', dateAdded: '2024-08-22', lastMovement: '2024-09-18'
  },
  {
    id: 'inv-10', sku: 'SKU3015', stone: 'Labradorite', shape: 'Cushion', cut: 'Faceted',
    sizeRange: '8×8 to 10×10 mm', strandLength: '8 inch', pieces: 16, weightCarats: 180.0, weightGrams: 36.0,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-2', priceINR: 6200, priceUSD: 74.40,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🌀',
    lotNumber: 'LOT-2024-0534', dateAdded: '2024-09-08', lastMovement: '2024-09-30'
  },
  {
    id: 'inv-11', sku: 'SKU672', stone: 'London Blue Topaz', shape: 'Trillion', cut: 'Faceted',
    sizeRange: '6×6 to 8×8 mm', strandLength: '8 inch', pieces: 22, weightCarats: 88.0, weightGrams: 17.6,
    treatment: 'Heated', grade: 'AA', location: 'Vault B-2', priceINR: 5600, priceUSD: 67.20,
    status: 'Low Stock', channels: ['Etsy'], photoPlaceholder: '🔷',
    lotNumber: 'LOT-2024-0389', dateAdded: '2024-07-15', lastMovement: '2024-09-22'
  },
  {
    id: 'inv-12', sku: 'SKU2244', stone: 'Pink Tourmaline', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '3 to 4 mm', strandLength: '14 inch', pieces: 145, weightCarats: 55.0, weightGrams: 11.0,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-1', priceINR: 9800, priceUSD: 117.60,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '💗',
    lotNumber: 'LOT-2024-0510', dateAdded: '2024-08-30', lastMovement: '2024-09-27'
  },
  {
    id: 'inv-13', sku: 'SKU1560', stone: 'Tanzanite', shape: 'Round', cut: 'Faceted',
    sizeRange: '3 to 4 mm', strandLength: '8 inch', pieces: 45, weightCarats: 25.0, weightGrams: 5.0,
    treatment: 'Heated', grade: 'AAA', location: 'Vault A-1', priceINR: 22000, priceUSD: 264.00,
    status: 'In Stock', channels: ['Export'], photoPlaceholder: '💜',
    lotNumber: 'LOT-2024-0490', dateAdded: '2024-08-28', lastMovement: '2024-09-15'
  },
  {
    id: 'inv-14', sku: 'SKU890', stone: 'Smoky Quartz', shape: 'Briolette', cut: 'Faceted',
    sizeRange: '8×5 to 12×8 mm', strandLength: '8 inch', pieces: 24, weightCarats: 155.0, weightGrams: 31.0,
    treatment: 'Natural', grade: 'A', location: 'Vault C-1', priceINR: 1800, priceUSD: 21.60,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '🤎',
    lotNumber: 'LOT-2024-0410', dateAdded: '2024-07-30', lastMovement: '2024-09-05'
  },
  {
    id: 'inv-15', sku: 'SKU3200', stone: 'Aquamarine', shape: 'Oval', cut: 'Faceted',
    sizeRange: '6×4 to 9×7 mm', strandLength: '8 inch', pieces: 20, weightCarats: 95.0, weightGrams: 19.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-2', priceINR: 7500, priceUSD: 90.00,
    status: 'Low Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '💧',
    lotNumber: 'LOT-2024-0542', dateAdded: '2024-09-12', lastMovement: '2024-10-01'
  },
  {
    id: 'inv-16', sku: 'SKU1780', stone: 'Ruby', shape: 'Round', cut: 'Faceted',
    sizeRange: '2 to 3 mm', strandLength: '8 inch', pieces: 90, weightCarats: 12.0, weightGrams: 2.4,
    treatment: 'Glass Filled', grade: 'B', location: 'Vault B-1', priceINR: 8500, priceUSD: 102.00,
    status: 'In Stock', channels: ['Wholesale'], photoPlaceholder: '❤️',
    lotNumber: 'LOT-2024-0498', dateAdded: '2024-08-29', lastMovement: '2024-09-20'
  },
  {
    id: 'inv-17', sku: 'SKU2100', stone: 'Lapis Lazuli', shape: 'Round', cut: 'Smooth',
    sizeRange: '6 to 8 mm', strandLength: '16 inch', pieces: 52, weightCarats: 320.0, weightGrams: 64.0,
    treatment: 'Dyed', grade: 'A', location: 'Vault C-2', priceINR: 1500, priceUSD: 18.00,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🔹',
    lotNumber: 'LOT-2024-0515', dateAdded: '2024-09-02', lastMovement: '2024-09-28'
  },
  {
    id: 'inv-18', sku: 'SKU420', stone: 'Green Amethyst', shape: 'Cushion', cut: 'Checker Board',
    sizeRange: '10×10 to 12×12 mm', strandLength: '8 inch', pieces: 14, weightCarats: 210.0, weightGrams: 42.0,
    treatment: 'Heated', grade: 'AAA', location: 'Vault A-3', priceINR: 3400, priceUSD: 40.80,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '🟢',
    lotNumber: 'LOT-2024-0370', dateAdded: '2024-07-10', lastMovement: '2024-09-12'
  },
  {
    id: 'inv-19', sku: 'SKU2890', stone: 'Chrysoprase', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '3 to 4 mm', strandLength: '14 inch', pieces: 130, weightCarats: 65.0, weightGrams: 13.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault B-2', priceINR: 4100, priceUSD: 49.20,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🍀',
    lotNumber: 'LOT-2024-0530', dateAdded: '2024-09-06', lastMovement: '2024-09-25'
  },
  {
    id: 'inv-20', sku: 'SKU1455', stone: 'Black Spinel', shape: 'Round', cut: 'Faceted',
    sizeRange: '2 to 3 mm', strandLength: '14 inch', pieces: 200, weightCarats: 35.0, weightGrams: 7.0,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-1', priceINR: 2200, priceUSD: 26.40,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '⚫',
    lotNumber: 'LOT-2024-0485', dateAdded: '2024-08-26', lastMovement: '2024-09-18'
  },
  {
    id: 'inv-21', sku: 'SKU3350', stone: 'Morganite', shape: 'Pear', cut: 'Faceted',
    sizeRange: '7×5 to 10×7 mm', strandLength: '8 inch', pieces: 18, weightCarats: 85.0, weightGrams: 17.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-2', priceINR: 6800, priceUSD: 81.60,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🌸',
    lotNumber: 'LOT-2024-0550', dateAdded: '2024-09-15', lastMovement: '2024-09-30'
  },
  {
    id: 'inv-22', sku: 'SKU560', stone: 'Iolite', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '4 to 5 mm', strandLength: '14 inch', pieces: 110, weightCarats: 78.0, weightGrams: 15.6,
    treatment: 'Natural', grade: 'A', location: 'Vault B-1', priceINR: 3600, priceUSD: 43.20,
    status: 'In Stock', channels: ['Wholesale'], photoPlaceholder: '🔮',
    lotNumber: 'LOT-2024-0380', dateAdded: '2024-07-12', lastMovement: '2024-09-08'
  },
  {
    id: 'inv-23', sku: 'SKU1990', stone: 'Prehnite', shape: 'Oval', cut: 'Cabochon',
    sizeRange: '8×6 to 10×8 mm', strandLength: '8 inch', pieces: 20, weightCarats: 160.0, weightGrams: 32.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault C-1', priceINR: 2400, priceUSD: 28.80,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🫒',
    lotNumber: 'LOT-2024-0505', dateAdded: '2024-08-30', lastMovement: '2024-09-20'
  },
  {
    id: 'inv-24', sku: 'SKU2560', stone: 'Amethyst', shape: 'Marquise', cut: 'Faceted',
    sizeRange: '10×5 to 14×7 mm', strandLength: '8 inch', pieces: 20, weightCarats: 140.0, weightGrams: 28.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-3', priceINR: 2600, priceUSD: 31.20,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '💜',
    lotNumber: 'LOT-2024-0525', dateAdded: '2024-09-05', lastMovement: '2024-09-22'
  },
  {
    id: 'inv-25', sku: 'SKU740', stone: 'Carnelian', shape: 'Briolette', cut: 'Faceted',
    sizeRange: '6×4 to 9×6 mm', strandLength: '8 inch', pieces: 26, weightCarats: 105.0, weightGrams: 21.0,
    treatment: 'Dyed', grade: 'A', location: 'Vault C-2', priceINR: 1600, priceUSD: 19.20,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🟠',
    lotNumber: 'LOT-2024-0395', dateAdded: '2024-07-18', lastMovement: '2024-09-10'
  },
  {
    id: 'inv-26', sku: 'SKU3100', stone: 'Blue Sapphire', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '2.5 to 3.5 mm', strandLength: '8 inch', pieces: 80, weightCarats: 15.0, weightGrams: 3.0,
    treatment: 'Heated', grade: 'AA', location: 'Vault A-1', priceINR: 28000, priceUSD: 336.00,
    status: 'In Stock', channels: ['Export'], photoPlaceholder: '💙',
    lotNumber: 'LOT-2024-0540', dateAdded: '2024-09-10', lastMovement: '2024-09-28'
  },
  {
    id: 'inv-27', sku: 'SKU1650', stone: 'Citrine', shape: 'Round', cut: 'Faceted',
    sizeRange: '4 to 5 mm', strandLength: '14 inch', pieces: 85, weightCarats: 110.0, weightGrams: 22.0,
    treatment: 'Heated', grade: 'A', location: 'Vault B-2', priceINR: 2000, priceUSD: 24.00,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '🟡',
    lotNumber: 'LOT-2024-0492', dateAdded: '2024-08-28', lastMovement: '2024-09-15'
  },
  {
    id: 'inv-28', sku: 'SKU2400', stone: 'Kyanite', shape: 'Oval', cut: 'Faceted',
    sizeRange: '6×4 to 8×6 mm', strandLength: '8 inch', pieces: 22, weightCarats: 75.0, weightGrams: 15.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-3', priceINR: 5200, priceUSD: 62.40,
    status: 'Low Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🔹',
    lotNumber: 'LOT-2024-0520', dateAdded: '2024-09-04', lastMovement: '2024-10-01'
  },
  {
    id: 'inv-29', sku: 'SKU310', stone: 'Tiger Eye', shape: 'Round', cut: 'Smooth',
    sizeRange: '8 to 10 mm', strandLength: '16 inch', pieces: 42, weightCarats: 380.0, weightGrams: 76.0,
    treatment: 'Natural', grade: 'A', location: 'Vault C-1', priceINR: 800, priceUSD: 9.60,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🟤',
    lotNumber: 'LOT-2024-0355', dateAdded: '2024-06-28', lastMovement: '2024-09-05'
  },
  {
    id: 'inv-30', sku: 'SKU2980', stone: 'Rose Quartz', shape: 'Heart', cut: 'Smooth',
    sizeRange: '10×10 to 12×12 mm', strandLength: '8 inch', pieces: 16, weightCarats: 200.0, weightGrams: 40.0,
    treatment: 'Natural', grade: 'A', location: 'Vault C-2', priceINR: 1400, priceUSD: 16.80,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '🩷',
    lotNumber: 'LOT-2024-0535', dateAdded: '2024-09-08', lastMovement: '2024-09-22'
  },
  {
    id: 'inv-31', sku: 'SKU1820', stone: 'Garnet', shape: 'Round', cut: 'Faceted',
    sizeRange: '3 to 4 mm', strandLength: '14 inch', pieces: 140, weightCarats: 62.0, weightGrams: 12.4,
    treatment: 'Natural', grade: 'AA', location: 'Vault B-1', priceINR: 3000, priceUSD: 36.00,
    status: 'In Stock', channels: ['Etsy', 'Wholesale', 'Export'], photoPlaceholder: '🔴',
    lotNumber: 'LOT-2024-0500', dateAdded: '2024-08-29', lastMovement: '2024-09-18'
  },
  {
    id: 'inv-32', sku: 'SKU3400', stone: 'Tourmaline Watermelon', shape: 'Slice', cut: 'Smooth',
    sizeRange: '8×6 to 12×10 mm', strandLength: '8 inch', pieces: 12, weightCarats: 68.0, weightGrams: 13.6,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-1', priceINR: 15000, priceUSD: 180.00,
    status: 'Low Stock', channels: ['Export'], photoPlaceholder: '🍉',
    lotNumber: 'LOT-2024-0555', dateAdded: '2024-09-18', lastMovement: '2024-10-01'
  },
  {
    id: 'inv-33', sku: 'SKU950', stone: 'Hessonite Garnet', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '4 to 5 mm', strandLength: '14 inch', pieces: 100, weightCarats: 95.0, weightGrams: 19.0,
    treatment: 'Natural', grade: 'A', location: 'Vault B-2', priceINR: 2800, priceUSD: 33.60,
    status: 'In Stock', channels: ['Wholesale'], photoPlaceholder: '🟠',
    lotNumber: 'LOT-2024-0415', dateAdded: '2024-08-01', lastMovement: '2024-09-12'
  },
  {
    id: 'inv-34', sku: 'SKU2650', stone: 'Sunstone', shape: 'Oval', cut: 'Faceted',
    sizeRange: '7×5 to 9×7 mm', strandLength: '8 inch', pieces: 18, weightCarats: 90.0, weightGrams: 18.0,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-3', priceINR: 4500, priceUSD: 54.00,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🌅',
    lotNumber: 'LOT-2024-0528', dateAdded: '2024-09-06', lastMovement: '2024-09-25'
  },
  {
    id: 'inv-35', sku: 'SKU180', stone: 'Green Onyx', shape: 'Briolette', cut: 'Faceted',
    sizeRange: '8×5 to 10×7 mm', strandLength: '8 inch', pieces: 28, weightCarats: 125.0, weightGrams: 25.0,
    treatment: 'Dyed', grade: 'A', location: 'Vault C-1', priceINR: 1100, priceUSD: 13.20,
    status: 'In Stock', channels: ['Etsy', 'Wholesale'], photoPlaceholder: '💚',
    lotNumber: 'LOT-2024-0340', dateAdded: '2024-06-10', lastMovement: '2024-09-02'
  },
  {
    id: 'inv-36', sku: 'SKU3050', stone: 'Rainbow Moonstone', shape: 'Pear', cut: 'Cabochon',
    sizeRange: '9×6 to 12×8 mm', strandLength: '8 inch', pieces: 15, weightCarats: 105.0, weightGrams: 21.0,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-2', priceINR: 5800, priceUSD: 69.60,
    status: 'In Stock', channels: ['Etsy', 'Export'], photoPlaceholder: '🌙',
    lotNumber: 'LOT-2024-0538', dateAdded: '2024-09-09', lastMovement: '2024-09-28'
  },
  {
    id: 'inv-37', sku: 'SKU1350', stone: 'Apatite', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '3 to 4 mm', strandLength: '14 inch', pieces: 125, weightCarats: 48.0, weightGrams: 9.6,
    treatment: 'Natural', grade: 'AA', location: 'Vault B-1', priceINR: 3500, priceUSD: 42.00,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🔵',
    lotNumber: 'LOT-2024-0482', dateAdded: '2024-08-25', lastMovement: '2024-09-20'
  },
  {
    id: 'inv-38', sku: 'SKU2200', stone: 'Strawberry Quartz', shape: 'Round', cut: 'Smooth',
    sizeRange: '6 to 8 mm', strandLength: '16 inch', pieces: 48, weightCarats: 240.0, weightGrams: 48.0,
    treatment: 'Natural', grade: 'A', location: 'Vault C-2', priceINR: 1800, priceUSD: 21.60,
    status: 'In Stock', channels: ['Etsy'], photoPlaceholder: '🍓',
    lotNumber: 'LOT-2024-0518', dateAdded: '2024-09-03', lastMovement: '2024-09-22'
  },
  {
    id: 'inv-39', sku: 'SKU760', stone: 'Chrome Diopside', shape: 'Rondelle', cut: 'Faceted',
    sizeRange: '3 to 3.5 mm', strandLength: '14 inch', pieces: 115, weightCarats: 42.0, weightGrams: 8.4,
    treatment: 'Natural', grade: 'AA', location: 'Vault A-3', priceINR: 5000, priceUSD: 60.00,
    status: 'Out of Stock', channels: ['Export'], photoPlaceholder: '🟢',
    lotNumber: 'LOT-2024-0392', dateAdded: '2024-07-16', lastMovement: '2024-08-30'
  },
  {
    id: 'inv-40', sku: 'SKU3500', stone: 'Spessartite Garnet', shape: 'Briolette', cut: 'Faceted',
    sizeRange: '5×3 to 7×5 mm', strandLength: '8 inch', pieces: 20, weightCarats: 55.0, weightGrams: 11.0,
    treatment: 'Natural', grade: 'AAA', location: 'Vault A-1', priceINR: 11000, priceUSD: 132.00,
    status: 'In Stock', channels: ['Export'], photoPlaceholder: '🧡',
    lotNumber: 'LOT-2024-0560', dateAdded: '2024-09-20', lastMovement: '2024-10-01'
  },
];

// ─── Customers ───

export const customers: Customer[] = [
  { id: 'cust-1', name: 'Sarah Mitchell', channel: 'Etsy', country: 'United States', email: 'sarah.m@email.com', phone: '+1-555-0123', totalOrders: 12, totalSpent: 2840, currency: 'USD' },
  { id: 'cust-2', name: 'Emma Clarke', channel: 'Etsy', country: 'United Kingdom', email: 'emma.c@email.co.uk', phone: '+44-7700-900123', totalOrders: 8, totalSpent: 1560, currency: 'GBP' },
  { id: 'cust-3', name: 'Lena Müller', channel: 'Etsy', country: 'Germany', email: 'lena.m@email.de', phone: '+49-170-1234567', totalOrders: 5, totalSpent: 890, currency: 'EUR' },
  { id: 'cust-4', name: 'Rajesh Gems & Minerals', channel: 'Wholesale', country: 'India', email: 'rajesh@rajeshgems.in', phone: '+91-98290-12345', totalOrders: 24, totalSpent: 485000, currency: 'INR' },
  { id: 'cust-5', name: 'Crystal Luxe Trading LLC', channel: 'Export', country: 'United States', email: 'orders@crystalluxe.com', phone: '+1-555-0456', totalOrders: 15, totalSpent: 18500, currency: 'USD' },
  { id: 'cust-6', name: 'Jessica Park', channel: 'Etsy', country: 'United States', email: 'jess.p@email.com', phone: '+1-555-0789', totalOrders: 3, totalSpent: 420, currency: 'USD' },
  { id: 'cust-7', name: 'Hans Weber Edelsteine', channel: 'Export', country: 'Germany', email: 'info@webersteine.de', phone: '+49-89-12345678', totalOrders: 9, totalSpent: 12200, currency: 'EUR' },
];

// ─── Suppliers ───

export const suppliers: Supplier[] = [
  { id: 'sup-1', name: 'Sharma Rough Stones', location: 'Jaipur, Rajasthan', phone: '+91-98290-56789', gstNumber: '08AADCS1234F1Z5', specialization: 'Emerald, Sapphire rough' },
  { id: 'sup-2', name: 'Agarwal Brothers', location: 'Jaipur, Rajasthan', phone: '+91-94140-12345', gstNumber: '08AADCA5678G2Z3', specialization: 'Tourmaline, Garnet, Opal' },
  { id: 'sup-3', name: 'Patel Minerals', location: 'Surat, Gujarat', phone: '+91-98250-67890', gstNumber: '24AADCP9012H3Z1', specialization: 'Topaz, Quartz varieties' },
  { id: 'sup-4', name: 'East Africa Mines Ltd.', location: 'Arusha, Tanzania', phone: '+255-754-123456', gstNumber: 'N/A (Import)', specialization: 'Tanzanite, Garnet rough' },
  { id: 'sup-5', name: 'Khandel Trading Co.', location: 'Jaipur, Rajasthan', phone: '+91-98291-11111', gstNumber: '08AADCK3456I4Z7', specialization: 'Moonstone, Labradorite, Prehnite' },
];

// ─── Production Jobs (6) ───

export const productionJobs: ProductionJob[] = [
  { id: 'job-1', jobNumber: 'JOB-2024-101', stage: 'Polishing', stone: 'Emerald', shape: 'Rondelle', cut: 'Faceted', weightIn: 45.0, weightOut: 38.2, wastagePercent: 15.1, worker: 'Ramesh Soni', isOutsideKarigar: false, orderId: 'ord-5', startDate: '2024-09-25', expectedCompletion: '2024-10-05', notes: 'Extra care — high value lot' },
  { id: 'job-2', jobNumber: 'JOB-2024-102', stage: 'Cutting', stone: 'Peridot', shape: 'Marquise', cut: 'Faceted', weightIn: 120.0, weightOut: 0, wastagePercent: 0, worker: 'Mukesh Karigar', isOutsideKarigar: true, startDate: '2024-09-28', expectedCompletion: '2024-10-08' },
  { id: 'job-3', jobNumber: 'JOB-2024-103', stage: 'Quality Check', stone: 'Morganite', shape: 'Pear', cut: 'Faceted', weightIn: 92.0, weightOut: 78.5, wastagePercent: 14.7, worker: 'Suresh Meena', isOutsideKarigar: false, startDate: '2024-09-20', expectedCompletion: '2024-10-02' },
  { id: 'job-4', jobNumber: 'JOB-2024-104', stage: 'Shaping', stone: 'Labradorite', shape: 'Cushion', cut: 'Faceted', weightIn: 200.0, weightOut: 0, wastagePercent: 0, worker: 'Prakash Lohar', isOutsideKarigar: true, startDate: '2024-09-30', expectedCompletion: '2024-10-10' },
  { id: 'job-5', jobNumber: 'JOB-2024-105', stage: 'Packing', stone: 'Pink Tourmaline', shape: 'Rondelle', cut: 'Faceted', weightIn: 55.0, weightOut: 48.0, wastagePercent: 12.7, worker: 'Dinesh Kumar', isOutsideKarigar: false, startDate: '2024-09-15', expectedCompletion: '2024-10-01' },
  { id: 'job-6', jobNumber: 'JOB-2024-106', stage: 'Cutting', stone: 'Aquamarine', shape: 'Oval', cut: 'Faceted', weightIn: 150.0, weightOut: 0, wastagePercent: 0, worker: 'Hari Om Gems', isOutsideKarigar: true, startDate: '2024-10-01', expectedCompletion: '2024-10-12' },
];

// ─── Orders (10) ───

export const orders: Order[] = [
  { id: 'ord-1', orderNumber: 'ORD-2024-1001', customerId: 'cust-1', channel: 'Etsy', status: 'Shipped', items: [{ itemId: 'inv-1', quantity: 1, price: 50.40 }, { itemId: 'inv-7', quantity: 2, price: 14.40 }], totalAmount: 79.20, currency: 'USD', orderDate: '2024-09-20', expectedShip: '2024-09-25', shippingAddress: '123 Craft Lane, Portland, OR 97201, USA', paymentStatus: 'Paid', trackingNumber: 'EP123456789US', isCustomOrder: false },
  { id: 'ord-2', orderNumber: 'ORD-2024-1002', customerId: 'cust-2', channel: 'Etsy', status: 'Confirmed', items: [{ itemId: 'inv-12', quantity: 1, price: 117.60 }], totalAmount: 117.60, currency: 'USD', orderDate: '2024-09-28', expectedShip: '2024-10-03', shippingAddress: '45 Bead Street, London SW1A 1AA, UK', paymentStatus: 'Paid', isCustomOrder: false },
  { id: 'ord-3', orderNumber: 'ORD-2024-1003', customerId: 'cust-3', channel: 'Etsy', status: 'Pending', items: [{ itemId: 'inv-10', quantity: 1, price: 74.40 }, { itemId: 'inv-24', quantity: 1, price: 31.20 }], totalAmount: 105.60, currency: 'USD', orderDate: '2024-09-30', expectedShip: '2024-10-05', shippingAddress: 'Gemstone Allee 12, 80331 München, Germany', paymentStatus: 'Paid', isCustomOrder: false },
  { id: 'ord-4', orderNumber: 'ORD-2024-1004', customerId: 'cust-4', channel: 'Wholesale', status: 'Confirmed', items: [{ itemId: 'inv-9', quantity: 5, price: 4800 }, { itemId: 'inv-22', quantity: 10, price: 3600 }, { itemId: 'inv-31', quantity: 8, price: 3000 }], totalAmount: 84000, currency: 'INR', orderDate: '2024-09-25', expectedShip: '2024-10-08', shippingAddress: 'Johari Bazaar, Jaipur 302003, Rajasthan, India', paymentStatus: 'Partial', isCustomOrder: false, notes: 'Bulk wholesale — 50% advance received' },
  { id: 'ord-5', orderNumber: 'ORD-2024-1005', customerId: 'cust-5', channel: 'Export', status: 'In Production', items: [{ itemId: 'inv-6', quantity: 3, price: 150.00 }, { itemId: 'inv-13', quantity: 2, price: 264.00 }, { itemId: 'inv-26', quantity: 2, price: 336.00 }], totalAmount: 1650.00, currency: 'USD', orderDate: '2024-09-22', expectedShip: '2024-10-12', shippingAddress: '789 Gem Plaza, New York, NY 10001, USA', paymentStatus: 'Pending', isCustomOrder: false },
  { id: 'ord-6', orderNumber: 'ORD-2024-1006', customerId: 'cust-6', channel: 'Etsy', status: 'Pending', items: [{ itemId: 'inv-30', quantity: 1, price: 16.80 }], totalAmount: 16.80, currency: 'USD', orderDate: '2024-10-01', expectedShip: '2024-10-04', shippingAddress: '456 Pearl Drive, Austin, TX 78701, USA', paymentStatus: 'Paid', isCustomOrder: false },
  { id: 'ord-7', orderNumber: 'ORD-2024-1007', customerId: 'cust-7', channel: 'Export', status: 'Draft', items: [{ itemId: 'inv-32', quantity: 1, price: 180.00 }, { itemId: 'inv-40', quantity: 2, price: 132.00 }], totalAmount: 444.00, currency: 'EUR', orderDate: '2024-10-02', expectedShip: '2024-10-15', shippingAddress: 'Schmuckstraße 7, 55116 Mainz, Germany', paymentStatus: 'Pending', isCustomOrder: false },
  { id: 'ord-8', orderNumber: 'ORD-2024-1008', customerId: 'cust-1', channel: 'Etsy', status: 'Delivered', items: [{ itemId: 'inv-14', quantity: 1, price: 21.60 }], totalAmount: 21.60, currency: 'USD', orderDate: '2024-09-10', expectedShip: '2024-09-14', shippingAddress: '123 Craft Lane, Portland, OR 97201, USA', paymentStatus: 'Paid', trackingNumber: 'EP987654321US', isCustomOrder: false },
  { id: 'ord-9', orderNumber: 'ORD-2024-1009', customerId: 'cust-4', channel: 'Wholesale', status: 'Pending', items: [{ itemId: 'inv-20', quantity: 15, price: 2200 }, { itemId: 'inv-27', quantity: 10, price: 2000 }], totalAmount: 53000, currency: 'INR', orderDate: '2024-10-01', expectedShip: '2024-10-10', shippingAddress: 'Johari Bazaar, Jaipur 302003, Rajasthan, India', paymentStatus: 'Pending', isCustomOrder: false },
  { id: 'ord-10', orderNumber: 'ORD-2024-1010', customerId: 'cust-5', channel: 'Export', status: 'Confirmed', items: [{ itemId: 'inv-8', quantity: 2, price: 222.00 }, { itemId: 'inv-21', quantity: 1, price: 81.60 }], totalAmount: 525.60, currency: 'USD', orderDate: '2024-09-29', expectedShip: '2024-10-06', shippingAddress: '789 Gem Plaza, New York, NY 10001, USA', paymentStatus: 'Paid', isCustomOrder: false },
];

// ─── Bill Captures ───

export const billCaptures: BillCapture[] = [
  {
    id: 'bill-1', supplierName: 'Sharma Rough Stones', billNumber: 'SRS/2024/0892',
    billDate: '2024-09-28',
    items: [
      { description: 'Emerald rough, Zambian origin, 50 ct', weight: 50, rate: 12000, amount: 600000 },
      { description: 'Blue Sapphire rough, Sri Lankan, 20 ct', weight: 20, rate: 28000, amount: 560000, checkThis: true },
      { description: 'Handling & sorting charges', weight: 0, rate: 0, amount: 5000 },
    ],
    subtotal: 1165000, gstPercent: 3, gstAmount: 34950, totalAmount: 1199950,
    status: 'Draft', flaggedFields: ['Blue Sapphire rate (seems high vs last purchase)', 'GST percentage']
  },
  {
    id: 'bill-2', supplierName: 'Agarwal Brothers', billNumber: 'AB/24-25/1456',
    billDate: '2024-09-30',
    items: [
      { description: 'Pink Tourmaline lot, 80 ct, mixed quality', weight: 80, rate: 4500, amount: 360000 },
      { description: 'Garnet rough, Rajasthan, 150 ct', weight: 150, rate: 1200, amount: 180000 },
      { description: 'Ethiopian Opal, 25 ct, play of color grade', weight: 25, rate: 15000, amount: 375000, checkThis: true },
    ],
    subtotal: 915000, gstPercent: 3, gstAmount: 27450, totalAmount: 942450,
    status: 'Draft', flaggedFields: ['Ethiopian Opal weight (verify against delivery challan)']
  },
];

// ─── Enquiries ───

export const enquiries: Enquiry[] = [
  {
    id: 'enq-1', source: 'WhatsApp', customerName: 'David Chen',
    message: 'Hi, do you have natural emerald rondelle beads, 2-3mm, in 14 inch strands? Need 10 strands for a jewelry project. What\'s your best price?',
    extractedRequest: { stones: 'Emerald', sizes: '2-3 mm', quantity: '10 strands, 14 inch' },
    matchedStock: ['inv-6'], draftReply: 'Dear David,\n\nThank you for your enquiry. We have Natural Emerald Faceted Rondelle Beads (SKU138) in 2-3mm size. Currently available in 7.5 inch strands.\n\nFor 10 strands, our best price would be ₹11,500 per strand (approx. $138 USD).\n\nPlease let us know if you\'d like to proceed.\n\nBest regards,\nN.K. Impex',
    draftQuote: 1380, status: 'Draft', receivedAt: '2024-10-01T14:30:00'
  },
  {
    id: 'enq-2', source: 'Email', customerName: 'Marie Dupont',
    message: 'Bonjour, I\'m looking for moonstone briolettes and labradorite cushion cuts for my autumn collection. Can you send me a price list and availability?',
    extractedRequest: { stones: 'Moonstone, Labradorite', sizes: 'Various', quantity: 'TBD — price list requested' },
    matchedStock: ['inv-4', 'inv-10', 'inv-36'], draftReply: 'Dear Marie,\n\nThank you for reaching out! We have the following available:\n\n1. Grey Moonstone Faceted Briolettes (SKU1343) — 7×5 to 10×7 mm — $38.40/strand\n2. Labradorite Faceted Cushion (SKU3015) — 8×8 to 10×10 mm — $74.40/strand\n3. Rainbow Moonstone Cabochon Pear (SKU3050) — 9×6 to 12×8 mm — $69.60/strand\n\nAll are natural and available for immediate shipping.\n\nBest regards,\nN.K. Impex',
    draftQuote: 182.40, status: 'Draft', receivedAt: '2024-10-02T09:15:00'
  },
  {
    id: 'enq-3', source: 'WhatsApp', customerName: 'Mike Peterson',
    message: 'Need blue topaz chips, long strands, 36 inch. 20 pieces. Dyed is fine. What\'s the rate?',
    extractedRequest: { stones: 'Blue Topaz', sizes: '5-8 mm chips', quantity: '20 strands, 36 inch' },
    matchedStock: ['inv-7'], draftReply: 'Hi Mike,\n\nWe have Blue Topaz Smooth Chips Nuggets (SKU1907), 36 inch strands, treatment: Dyed.\n\nFor 20 strands: ₹1,000 per strand (bulk discount applied). Total: ₹20,000 (approx. $240 USD).\n\nReady for immediate dispatch.\n\nRegards,\nN.K. Impex',
    draftQuote: 240, status: 'Draft', receivedAt: '2024-10-02T11:45:00'
  },
];

// ─── Reviews ───

export const reviews: Review[] = [
  { id: 'rev-1', platform: 'Etsy', customerName: 'CraftLover2023', rating: 5, reviewText: 'Absolutely beautiful moss aquamarine beads! Perfect quality and fast shipping.', listingSku: 'SKU2055', listingName: 'Moss Aquamarine Faceted Pear Beads', issueTag: 'None', draftReply: 'Thank you so much for your wonderful review! We\'re delighted that you love the Moss Aquamarine beads. Looking forward to serving you again!', status: 'Draft', date: '2024-09-28' },
  { id: 'rev-2', platform: 'Etsy', customerName: 'BeadQueen_UK', rating: 3, reviewText: 'Nice beads but shipping took 3 weeks to UK. Expected faster delivery.', listingSku: 'SKU801', listingName: 'Multi Fluorite Faceted Heart Beads', issueTag: 'Shipping time', draftReply: 'Thank you for your feedback. We apologize for the shipping delay — international transit times have been longer than usual. We\'re working with our shipping partners to improve delivery times. We hope you enjoy the fluorite beads!', status: 'Draft', date: '2024-09-25' },
  { id: 'rev-3', platform: 'Etsy', customerName: 'JewelMaker_DE', rating: 2, reviewText: 'Listed as natural but looks treated to me. The blue topaz color is too uniform for natural. Disappointed.', listingSku: 'SKU1907', listingName: 'Blue Topaz Smooth Chips Nuggets', issueTag: 'Treatment', draftReply: 'Thank you for raising this concern. Our Blue Topaz Chips (SKU1907) are listed with "Treatment: Dyed" clearly stated in the product description. We always disclose treatments transparently. If you have any further questions, please feel free to contact us directly.', status: 'Draft', date: '2024-09-22' },
  { id: 'rev-4', platform: 'Etsy', customerName: 'SarahCreates', rating: 4, reviewText: 'Lovely citrine beads. Some pieces were slightly smaller than the listed range but overall happy.', listingSku: 'SKU1050', listingName: 'Yellow Citrine Fancy Cut Beads', issueTag: 'Size accuracy', draftReply: 'Thank you for your review, Sarah! We apologize that some pieces fell slightly outside the listed range. Natural gemstone beads can have minor variations. We\'ll ensure tighter quality control for future orders.', status: 'Draft', date: '2024-09-20' },
  { id: 'rev-5', platform: 'Etsy', customerName: 'NaturalGems_Fan', rating: 5, reviewText: 'The peridot marquise beads are stunning! Great quality and well packaged. Will order again.', listingSku: 'SKU2730', listingName: 'Peridot Faceted Marquise Beads', issueTag: 'None', draftReply: 'Thank you for the fantastic review! We\'re thrilled you love the Peridot Marquise beads. We look forward to your next order!', status: 'Draft', date: '2024-09-18' },
  { id: 'rev-6', platform: 'Etsy', customerName: 'GemCollector99', rating: 1, reviewText: 'Received wrong item. Ordered emerald rondelles but got green onyx. Very disappointed. Want a refund.', listingSku: 'SKU138', listingName: 'Emerald Faceted Rondelle Beads', issueTag: 'Wrong item', draftReply: 'We sincerely apologize for this mix-up. This is not acceptable and we take full responsibility. Please contact us at support@nkimpex.com and we will arrange an immediate replacement or full refund. We\'re very sorry for the inconvenience.', status: 'Draft', date: '2024-09-15' },
];

// ─── Export Documents ───

export const exportDocuments: ExportDocument[] = [
  { id: 'exp-1', orderId: 'ord-5', type: 'Commercial Invoice', hsCode: '7103.99.00', currency: 'USD', landedCost: 1815.00, dutyPercent: 5.5, dutyAmount: 90.75, status: 'Draft', createdDate: '2024-10-01' },
  { id: 'exp-2', orderId: 'ord-5', type: 'Packing List', hsCode: '7103.99.00', currency: 'USD', landedCost: 1815.00, dutyPercent: 5.5, dutyAmount: 90.75, status: 'Draft', createdDate: '2024-10-01' },
  { id: 'exp-3', orderId: 'ord-10', type: 'Commercial Invoice', hsCode: '7103.91.00', currency: 'USD', landedCost: 578.16, dutyPercent: 4.0, dutyAmount: 21.02, status: 'Draft', createdDate: '2024-10-02' },
  { id: 'exp-4', orderId: 'ord-7', type: 'Commercial Invoice', hsCode: '7103.99.00', currency: 'EUR', landedCost: 488.40, dutyPercent: 2.5, dutyAmount: 11.10, status: 'Draft', createdDate: '2024-10-02' },
];

// ─── Custom Order Requests ───

export const customOrderRequests: CustomOrderRequest[] = [
  {
    id: 'custom-1', customerName: 'Crystal Luxe Trading LLC',
    request: 'peridot marquise, 6×12 mm, 40 pieces',
    structured: { stone: 'Peridot', shape: 'Marquise', size: '6×12 mm', quantity: 40 },
    matchedStockIds: ['inv-5'], costPerPiece: 58.50, totalCost: 2340.00, estimatedLeadDays: 14,
    draftQuoteEmail: `Dear Crystal Luxe Trading,

Thank you for your custom order request. Please find our quote below:

Item: Peridot Faceted Marquise Beads
Size: 6×12 mm
Quantity: 40 pieces
Price per piece: $58.50 USD
Total: $2,340.00 USD

Estimated lead time: 14 working days
Shipping: FedEx International Priority

Note: We have 65 pieces of Peridot Marquise (6×3 to 8×4 mm) in stock. For the requested 6×12 mm size, we will need to cut from rough, which accounts for the lead time.

Payment terms: 50% advance, 50% before shipping.

Please confirm if you'd like to proceed.

Best regards,
N.K. Impex, Jaipur`,
    status: 'Draft', receivedAt: '2024-10-01T16:00:00'
  },
];

// ─── HS Code Table (editable in settings) ───

export const hsCodeTable = [
  { code: '7103.91.00', description: 'Rubies, sapphires, emeralds — worked', dutyPercent: 4.0 },
  { code: '7103.99.00', description: 'Other precious/semi-precious stones — worked', dutyPercent: 5.5 },
  { code: '7104.90.00', description: 'Synthetic or reconstructed stones', dutyPercent: 6.0 },
  { code: '7116.20.00', description: 'Articles of precious/semi-precious stones', dutyPercent: 3.0 },
];

// ─── Activity Log ───

export interface ActivityItem {
  id: string;
  type: 'order' | 'stock' | 'production' | 'enquiry' | 'review' | 'bill';
  message: string;
  timestamp: string;
}

export const recentActivity: ActivityItem[] = [
  { id: 'act-1', type: 'order', message: 'New Etsy order ORD-2024-1006 from Jessica Park', timestamp: '2024-10-02T09:30:00' },
  { id: 'act-2', type: 'enquiry', message: 'WhatsApp enquiry from Mike Peterson — Blue Topaz chips', timestamp: '2024-10-02T11:45:00' },
  { id: 'act-3', type: 'bill', message: 'Bill SRS/2024/0892 from Sharma Rough Stones captured as draft', timestamp: '2024-10-02T08:15:00' },
  { id: 'act-4', type: 'production', message: 'JOB-2024-103 Morganite moved to Quality Check', timestamp: '2024-10-01T17:30:00' },
  { id: 'act-5', type: 'stock', message: 'Low stock alert: Grey Moonstone Briolettes (SKU1343) — 5 strands left', timestamp: '2024-10-01T15:00:00' },
  { id: 'act-6', type: 'review', message: 'New 1-star review on Emerald Rondelles — wrong item complaint', timestamp: '2024-10-01T12:00:00' },
  { id: 'act-7', type: 'order', message: 'ORD-2024-1001 shipped — tracking EP123456789US', timestamp: '2024-09-30T16:45:00' },
  { id: 'act-8', type: 'production', message: 'JOB-2024-105 Pink Tourmaline moved to Packing', timestamp: '2024-09-30T14:00:00' },
];

// ─── Settings: Users & Roles ───

export interface UserRole {
  id: string;
  name: string;
  role: 'Owner' | 'Accounts' | 'Production' | 'Packing' | 'Sales';
  email: string;
  active: boolean;
}

export const users: UserRole[] = [
  { id: 'user-1', name: 'Nitin Kumar', role: 'Owner', email: 'nitin@nkimpex.com', active: true },
  { id: 'user-2', name: 'Priya Sharma', role: 'Accounts', email: 'priya@nkimpex.com', active: true },
  { id: 'user-3', name: 'Vikram Singh', role: 'Production', email: 'vikram@nkimpex.com', active: true },
  { id: 'user-4', name: 'Anita Devi', role: 'Packing', email: 'anita@nkimpex.com', active: true },
  { id: 'user-5', name: 'Rohit Jain', role: 'Sales', email: 'rohit@nkimpex.com', active: true },
];

export interface AutomationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const automationSettings: AutomationSetting[] = [
  { id: 'auto-1', name: 'Bill capture extraction', description: 'Automatically extract data from uploaded supplier bills', enabled: true },
  { id: 'auto-2', name: 'Custom order quoting', description: 'Auto-generate quotes from incoming custom order requests', enabled: true },
  { id: 'auto-3', name: 'Export document generation', description: 'Auto-draft commercial invoices and packing lists', enabled: true },
  { id: 'auto-4', name: 'Enquiry parsing', description: 'Parse incoming WhatsApp/email enquiries and match stock', enabled: true },
  { id: 'auto-5', name: 'Review reply drafting', description: 'Auto-draft replies to Etsy reviews', enabled: true },
];
