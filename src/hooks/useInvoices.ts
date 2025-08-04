import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { Invoice } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getInvoices();
      
      if (response.success && response.data) {
        setInvoices(response.data);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to load invoices",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load invoices. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  const refreshInvoices = useCallback(() => {
    loadInvoices();
  }, [loadInvoices]);

  const getInvoicesByType = useCallback((type: Invoice['type']) => {
    return invoices.filter(invoice => invoice.type === type);
  }, [invoices]);

  const getTotalAmount = useCallback((type?: Invoice['type']) => {
    const filteredInvoices = type ? getInvoicesByType(type) : invoices;
    return filteredInvoices.reduce((total, invoice) => total + invoice.amount, 0);
  }, [invoices, getInvoicesByType]);

  return {
    invoices,
    isLoading,
    refreshInvoices,
    getInvoicesByType,
    getTotalAmount
  };
};