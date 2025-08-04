import { useState, useCallback } from 'react';
import { apiService } from '@/services/api';
import { CheckResult } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useDeviceCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const { toast } = useToast();

  const checkDevice = useCallback(async (
    imei: string, 
    checkType: string
  ): Promise<CheckResult | null> => {
    if (!imei || imei.length < 15) {
      toast({
        title: "Invalid IMEI",
        description: "Please enter a valid 15-digit IMEI number",
        variant: "destructive"
      });
      return null;
    }

    setIsChecking(true);
    
    try {
      const response = await apiService.checkDevice(imei, checkType);
      
      if (response.success && response.data) {
        const result = response.data;
        setResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
        
        toast({
          title: "Check Complete",
          description: `Status: ${result.status.toUpperCase()}`,
        });
        
        return result;
      } else {
        toast({
          title: "Check Failed",
          description: response.error || "Unable to check device",
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
    } finally {
      setIsChecking(false);
    }
  }, [toast]);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    isChecking,
    results,
    checkDevice,
    clearResults
  };
};