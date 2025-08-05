import { Order, UserStats, CheckResult, Invoice, ApiResponse, ServerStatus } from '@/types';

// API Configuration - Ready for production
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'https://your-domain.com/api',
  timeout: 30000,
  retries: 3,
  // Add authentication headers when ready
  getHeaders: () => ({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${getAuthToken()}`, // Uncomment when implementing auth
  }),
};

// Mock data - Replace with real API calls
const MOCK_DELAY = 2000;

class ApiService {
  private async mockRequest<T>(data: T, delay = MOCK_DELAY): Promise<ApiResponse<T>> {
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulate occasional failures
    if (Math.random() < 0.05) {
      throw new Error('Network error');
    }
    
    return {
      success: true,
      data,
      message: 'Success'
    };
  }

  // User Services
  async getUserStats(): Promise<ApiResponse<UserStats>> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`${API_CONFIG.baseUrl}/user/stats`);
      // return await response.json();
      
      const mockStats: UserStats = {
        verification: 3,
        success: 15,
        rejected: 2,
        lastOrder: 20,
        balance: 150.75
      };
      
      return this.mockRequest(mockStats);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user stats'
      };
    }
  }

  async addFunds(amount: number): Promise<ApiResponse<{ newBalance: number }>> {
    try {
      // TODO: Replace with real payment processing
      // const response = await fetch(`${API_CONFIG.baseUrl}/payments/add-funds`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount })
      // });
      
      const currentBalance = 150.75; // This should come from state management
      const newBalance = currentBalance + amount;
      
      return this.mockRequest({ newBalance }, 3000);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed'
      };
    }
  }

  // Order Services
  async createOrder(service: string, imei: string): Promise<ApiResponse<Order>> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`${API_CONFIG.baseUrl}/orders`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ service, imei })
      // });
      
      const order: Order = {
        id: `ORD-${Date.now()}`,
        service,
        imei,
        status: 'pending',
        date: new Date().toISOString(),
        replyIn: '1-3 hours',
        price: this.getServicePrice(service)
      };
      
      return this.mockRequest(order);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order'
      };
    }
  }

  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`${API_CONFIG.baseUrl}/orders`);
      
      const mockOrders: Order[] = [
        {
          id: 'ORD-2024-001',
          service: 'Samsung FRP Unlock',
          imei: '356938035643809',
          status: 'completed',
          date: '2024-01-15T14:30:00Z',
          replyIn: 'Completed',
          price: 25.00,
          result: 'Device successfully unlocked'
        },
        {
          id: 'ORD-2024-002',
          service: 'iPhone iCloud Check',
          imei: '358240051111110',
          status: 'processing',
          date: '2024-01-16T09:15:00Z',
          replyIn: '2-4 hours',
          price: 15.00
        }
      ];
      
      return this.mockRequest(mockOrders);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch orders'
      };
    }
  }

  // Check Services
  async checkDevice(imei: string, checkType: string): Promise<ApiResponse<CheckResult>> {
    try {
      // TODO: Replace with real API call
      // const response = await fetch(`${API_CONFIG.baseUrl}/check/${checkType}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ imei })
      // });
      
      const statuses: CheckResult['status'][] = ['clean', 'locked', 'unknown'];
      const carriers = ['Unlocked', 'AT&T', 'Verizon', 'T-Mobile'];
      const models = ['iPhone 14 Pro', 'Galaxy S23', 'Xiaomi 13'];
      
      const result: CheckResult = {
        imei,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        carrier: carriers[Math.floor(Math.random() * carriers.length)],
        model: models[Math.floor(Math.random() * models.length)],
        checkDate: new Date().toISOString()
      };
      
      return this.mockRequest(result, 3000);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Check failed'
      };
    }
  }

  // Invoice Services
  async getInvoices(): Promise<ApiResponse<Invoice[]>> {
    try {
      // TODO: Replace with real API call
      
      const mockInvoices: Invoice[] = [
        {
          id: 'INV-001',
          date: '2024-01-15T10:30:00Z',
          description: 'Samsung FRP Unlock - 356938035643809',
          amount: -25.00,
          type: 'order',
          status: 'paid'
        },
        {
          id: 'INV-002',
          date: '2024-01-14T16:45:00Z',
          description: 'Account Top-up',
          amount: 100.00,
          type: 'payment',
          status: 'paid'
        }
      ];
      
      return this.mockRequest(mockInvoices);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch invoices'
      };
    }
  }

  // Server Status
  async getServerStatus(): Promise<ApiResponse<ServerStatus>> {
    try {
      // TODO: Replace with real health check
      
      const status: ServerStatus = {
        online: Math.random() > 0.1, // 90% uptime simulation
        lastChecked: new Date().toISOString(),
        responseTime: Math.floor(Math.random() * 200) + 50
      };
      
      return this.mockRequest(status, 1000);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Health check failed'
      };
    }
  }

  // Utility Methods
  getServicePrice(service: string): number {
    const prices: Record<string, number> = {
      'Samsung FRP Unlock': 25.00,
      'iPhone iCloud Check': 15.00,
      'Xiaomi Mi Account Check': 10.00,
      'Samsung KG Check': 20.00,
      'Samsung Info Check': 12.00
    };
    return prices[service] || 15.00;
  }

  getAvailableServices() {
    return [
      {
        name: 'Samsung FRP Unlock',
        price: 25.00,
        estimatedTime: '2-6 hours',
        description: 'Remove Factory Reset Protection from Samsung devices',
        category: 'unlock' as const
      },
      {
        name: 'iPhone iCloud Check',
        price: 15.00,
        estimatedTime: '1-3 hours',
        description: 'Check iCloud lock status for iPhone devices',
        category: 'check' as const
      },
      {
        name: 'Samsung KG Check',
        price: 20.00,
        estimatedTime: '1-2 hours',
        description: 'Check Samsung Knox Guard status',
        category: 'check' as const
      },
      {
        name: 'Samsung Info Check',
        price: 12.00,
        estimatedTime: '30 min - 1 hour',
        description: 'Get detailed Samsung device information',
        category: 'check' as const
      },
      {
        name: 'Xiaomi Mi Account Check',
        price: 10.00,
        estimatedTime: '1-2 hours',
        description: 'Check Mi Account lock status',
        category: 'check' as const
      }
    ];
  }
}

export const apiService = new ApiService();