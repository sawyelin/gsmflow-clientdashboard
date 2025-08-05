export interface Order {
  id: string;
  service: string;
  imei: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: string;
  replyIn: string;
  price: number;
  result?: string;
  errorMessage?: string;
}

export interface UserStats {
  verification: number;
  success: number;
  rejected: number;
  lastOrder: number;
  balance: number;
  // Backend integration ready fields
  responseTime?: number;
  systemLoad?: number;
  totalOrders?: number;
  successRate?: number;
}

export interface CheckResult {
  imei: string;
  status: 'clean' | 'locked' | 'unknown';
  carrier?: string;
  model?: string;
  checkDate: string;
  details?: Record<string, any>;
}

export interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'payment' | 'refund' | 'order';
  status: 'paid' | 'pending' | 'failed';
}

export interface ServiceConfig {
  name: string;
  price: number;
  estimatedTime: string;
  description: string;
  category: 'unlock' | 'check' | 'repair';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ServerStatus {
  online: boolean;
  lastChecked: string;
  responseTime?: number;
}