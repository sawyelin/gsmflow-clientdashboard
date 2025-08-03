import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  service: string;
  imei: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: string;
  replyIn: string;
  price: number;
}

export interface UserStats {
  verification: number;
  success: number;
  rejected: number;
  lastOrder: number;
  balance: number;
}

export const useGSMServices = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<UserStats>({
    verification: 0,
    success: 0,
    rejected: 0,
    lastOrder: 0,
    balance: 150.75
  });
  const [isServerOnline, setIsServerOnline] = useState(true);

  // Simulate some initial orders
  useEffect(() => {
    const initialOrders: Order[] = [
      {
        id: 'ORD-2024-001',
        service: 'Samsung FRP Unlock',
        imei: '356938035643809',
        status: 'completed',
        date: '2024-01-15 14:30',
        replyIn: 'Completed',
        price: 25.00
      },
      {
        id: 'ORD-2024-002', 
        service: 'iPhone iCloud Check',
        imei: '358240051111110',
        status: 'processing',
        date: '2024-01-16 09:15',
        replyIn: '2-4 hours',
        price: 15.00
      },
      {
        id: 'ORD-2024-003',
        service: 'Xiaomi Mi Account Check',
        imei: '867104034567890',
        status: 'pending',
        date: '2024-01-16 16:45',
        replyIn: '1-2 hours',
        price: 10.00
      }
    ];
    
    setOrders(initialOrders);
    
    // Calculate stats from orders
    const completed = initialOrders.filter(o => o.status === 'completed').length;
    const failed = initialOrders.filter(o => o.status === 'failed').length;
    const processing = initialOrders.filter(o => o.status === 'processing' || o.status === 'pending').length;
    
    setStats(prev => ({
      ...prev,
      verification: processing,
      success: completed,
      rejected: failed,
      lastOrder: initialOrders.length
    }));

    // Simulate server status changes
    const serverInterval = setInterval(() => {
      setIsServerOnline(Math.random() > 0.2); // 80% uptime
    }, 30000);

    return () => clearInterval(serverInterval);
  }, []);

  const addOrder = (service: string, imei: string) => {
    const newOrder: Order = {
      id: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      service,
      imei,
      status: 'pending',
      date: new Date().toLocaleString(),
      replyIn: '1-3 hours',
      price: getServicePrice(service)
    };

    setOrders(prev => [newOrder, ...prev]);
    setStats(prev => ({
      ...prev,
      verification: prev.verification + 1,
      lastOrder: prev.lastOrder + 1,
      balance: prev.balance - newOrder.price
    }));

    // Simulate order processing
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id 
          ? { ...order, status: 'processing', replyIn: '30 min - 2 hours' }
          : order
      ));
    }, 5000);

    return newOrder;
  };

  const getServicePrice = (service: string): number => {
    const prices: Record<string, number> = {
      'Samsung FRP Unlock': 25.00,
      'iPhone iCloud Check': 15.00,
      'Xiaomi Mi Account Check': 10.00,
      'Samsung KG Check': 20.00,
      'Samsung Info Check': 12.00
    };
    return prices[service] || 15.00;
  };

  const addFunds = (amount: number) => {
    setStats(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  return {
    orders,
    stats,
    isServerOnline,
    addOrder,
    addFunds,
    getServicePrice
  };
};