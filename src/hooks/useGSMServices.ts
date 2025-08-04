import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { Order, UserStats, ServerStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useGSMServices = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<UserStats>({
    verification: 0,
    success: 0,
    rejected: 0,
    lastOrder: 0,
    balance: 150.75
  });
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    online: true,
    lastChecked: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load initial data
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [ordersResponse, statsResponse, statusResponse] = await Promise.all([
        apiService.getOrders(),
        apiService.getUserStats(),
        apiService.getServerStatus()
      ]);

      if (ordersResponse.success && ordersResponse.data) {
        setOrders(ordersResponse.data);
      }

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }

      if (statusResponse.success && statusResponse.data) {
        setServerStatus(statusResponse.data);
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadInitialData();
    
    // Check server status periodically
    const statusInterval = setInterval(async () => {
      try {
        const response = await apiService.getServerStatus();
        if (response.success && response.data) {
          setServerStatus(response.data);
        }
      } catch (error) {
        console.error('Server status check failed:', error);
      }
    }, 30000);

    return () => clearInterval(statusInterval);
  }, [loadInitialData]);

  const addOrder = useCallback(async (service: string, imei: string): Promise<Order | null> => {
    try {
      const response = await apiService.createOrder(service, imei);
      
      if (response.success && response.data) {
        const newOrder = response.data;
        
        setOrders(prev => [newOrder, ...prev]);
        setStats(prev => ({
          ...prev,
          verification: prev.verification + 1,
          lastOrder: prev.lastOrder + 1,
          balance: prev.balance - newOrder.price
        }));

        toast({
          title: "Order Created",
          description: `Order ${newOrder.id} has been created successfully.`
        });

        // Simulate order status updates
        setTimeout(() => {
          setOrders(prev => prev.map(order => 
            order.id === newOrder.id 
              ? { ...order, status: 'processing', replyIn: '30 min - 2 hours' }
              : order
          ));
        }, 5000);

        return newOrder;
      } else {
        toast({
          title: "Order Failed",
          description: response.error || "Failed to create order",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const addFunds = useCallback(async (amount: number): Promise<boolean> => {
    try {
      const response = await apiService.addFunds(amount);
      
      if (response.success && response.data) {
        setStats(prev => ({
          ...prev,
          balance: response.data!.newBalance
        }));

        toast({
          title: "Funds Added",
          description: `$${amount.toFixed(2)} has been added to your account.`
        });

        return true;
      } else {
        toast({
          title: "Payment Failed",
          description: response.error || "Failed to add funds",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Payment processing failed. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  const getServicePrice = useCallback((service: string): number => {
    return apiService.getServicePrice(service);
  }, []);

  const getAvailableServices = useCallback(() => {
    return apiService.getAvailableServices();
  }, []);

  const refreshData = useCallback(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    orders,
    stats,
    serverStatus,
    isServerOnline: serverStatus.online,
    isLoading,
    addOrder,
    addFunds,
    getServicePrice,
    getAvailableServices,
    refreshData
  };
};