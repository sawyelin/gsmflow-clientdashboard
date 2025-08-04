import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Unlock, Smartphone, DollarSign, Clock } from "lucide-react";
import { useGSMServices } from "@/hooks/useGSMServices";

interface UnlockFRPProps {
  onOrderCreated?: () => void;
}

export const UnlockFRP = ({ onOrderCreated }: UnlockFRPProps) => {
  const [imei, setImei] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { addOrder, getServicePrice, stats } = useGSMServices();
  const { toast } = useToast();

  const services = [
    { 
      id: "samsung-frp", 
      name: "Samsung FRP Unlock", 
      price: 25.00, 
      time: "2-6 hours",
      description: "Remove FRP lock from Samsung devices"
    },
    { 
      id: "xiaomi-frp", 
      name: "Xiaomi Mi Account Check", 
      price: 10.00, 
      time: "1-3 hours",
      description: "Check Mi Account status and remove if possible"
    },
    { 
      id: "samsung-kg", 
      name: "Samsung KG Check", 
      price: 20.00, 
      time: "1-4 hours",
      description: "Check Knox Guard status on Samsung devices"
    },
    { 
      id: "samsung-info", 
      name: "Samsung Info Check", 
      price: 12.00, 
      time: "30min-2hours",
      description: "Get detailed Samsung device information"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imei || !selectedService) {
      toast({
        title: "Missing Information",
        description: "Please enter IMEI and select a service",
        variant: "destructive"
      });
      return;
    }

    if (imei.length < 15) {
      toast({
        title: "Invalid IMEI",
        description: "IMEI must be 15 digits long",
        variant: "destructive"
      });
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    if (stats.balance < service.price) {
      toast({
        title: "Insufficient Balance",
        description: `Your balance ($${stats.balance.toFixed(2)}) is insufficient for this service ($${service.price.toFixed(2)})`,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const order = await addOrder(service.name, imei);
      
      if (order) {
        setImei("");
        setSelectedService("");
        onOrderCreated?.();
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error creating your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Unlock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Unlock FRP Services</h2>
          <p className="text-muted-foreground">Professional IMEI unlocking and checking services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Create New Order</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="imei">IMEI Number</Label>
                  <Input
                    id="imei"
                    placeholder="Enter 15-digit IMEI number"
                    value={imei}
                    onChange={(e) => setImei(e.target.value.replace(/\D/g, '').slice(0, 15))}
                    maxLength={15}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your device's 15-digit IMEI number (dial *#06# to find it)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Select Service</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{service.name}</span>
                            <Badge variant="secondary">${service.price.toFixed(2)}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedServiceData && (
                  <Card className="bg-muted/30">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{selectedServiceData.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedServiceData.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>Price: ${selectedServiceData.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Time: {selectedServiceData.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing || !imei || !selectedService}
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      Submit Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Service Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{service.name}</h4>
                    <Badge variant="outline">${service.price.toFixed(2)}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Current Balance</h3>
                <div className="text-2xl font-bold">${stats.balance.toFixed(2)}</div>
                <p className="text-sm opacity-90">Add funds to continue using services</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};