import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Info, Calendar, MapPin } from "lucide-react";

interface SamsungInfo {
  imei: string;
  model: string;
  brand: string;
  serialNumber: string;
  manufactureDate: string;
  warrantyStatus: 'active' | 'expired' | 'unknown';
  region: string;
  carrier: string;
  colorVariant: string;
  storageCapacity: string;
  checkDate: string;
}

export const CheckSamsungInfo = () => {
  const [imei, setImei] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<SamsungInfo | null>(null);
  const { toast } = useToast();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imei || imei.length < 15) {
      toast({
        title: "Invalid IMEI",
        description: "Please enter a valid 15-digit IMEI number",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    
    // Simulate API check
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const models = ['Galaxy S24 Ultra', 'Galaxy S23 FE', 'Galaxy Note 20', 'Galaxy A54 5G', 'Galaxy Z Fold5'];
    const regions = ['Global', 'US', 'Europe', 'Asia Pacific', 'Latin America'];
    const carriers = ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Sprint'];
    const colors = ['Phantom Black', 'Cream', 'Green', 'Lavender', 'Graphite'];
    const storage = ['128GB', '256GB', '512GB', '1TB'];
    const warrantyStatuses: SamsungInfo['warrantyStatus'][] = ['active', 'expired', 'unknown'];
    
    const mockResult: SamsungInfo = {
      imei,
      model: models[Math.floor(Math.random() * models.length)],
      brand: 'Samsung',
      serialNumber: 'R58N' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      manufactureDate: '2023-' + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'),
      warrantyStatus: warrantyStatuses[Math.floor(Math.random() * warrantyStatuses.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      colorVariant: colors[Math.floor(Math.random() * colors.length)],
      storageCapacity: storage[Math.floor(Math.random() * storage.length)],
      checkDate: new Date().toLocaleString()
    };

    setResult(mockResult);
    setIsChecking(false);
    
    toast({
      title: "Samsung Info Retrieved",
      description: `Model: ${mockResult.model}`,
    });
  };

  const getWarrantyBadge = (status: SamsungInfo['warrantyStatus']) => {
    const config = {
      active: { variant: "default" as const, text: "Active Warranty", className: "bg-success text-success-foreground" },
      expired: { variant: "destructive" as const, text: "Warranty Expired", className: "" },
      unknown: { variant: "secondary" as const, text: "Unknown", className: "" }
    };
    
    const statusConfig = config[status];
    return (
      <Badge variant={statusConfig.variant} className={statusConfig.className}>
        {statusConfig.text}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Info className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Samsung Device Information</h2>
          <p className="text-muted-foreground">Get detailed information about Samsung devices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Device Information Lookup</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheck} className="space-y-4">
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
                  Access IMEI: Dial *#06# or Settings → About phone
                </p>
              </div>

              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-primary mb-1">Information Provided:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Model and specifications</li>
                  <li>• Manufacture date and region</li>
                  <li>• Warranty status</li>
                  <li>• Carrier and color variant</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isChecking || !imei}
                size="lg"
              >
                {isChecking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Retrieving Information...
                  </>
                ) : (
                  <>
                    <Info className="w-4 h-4 mr-2" />
                    Get Device Info
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Model</span>
                      <p className="font-semibold">{result.model}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Brand</span>
                      <p className="font-semibold">{result.brand}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Storage</span>
                      <p className="font-semibold">{result.storageCapacity}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Color</span>
                      <p className="font-semibold">{result.colorVariant}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Carrier</span>
                      <p className="font-semibold">{result.carrier}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Warranty</span>
                      <div className="mt-1">{getWarrantyBadge(result.warrantyStatus)}</div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">IMEI:</span>
                    <span className="font-mono text-sm">{result.imei}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Serial Number:</span>
                    <span className="font-mono text-sm">{result.serialNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Manufacture Date:</span>
                    </span>
                    <span className="text-sm">{result.manufactureDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>Region:</span>
                    </span>
                    <span className="text-sm">{result.region}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Check Date:</span>
                    <span className="text-sm">{result.checkDate}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Info className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Enter an IMEI to get device information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <Smartphone className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{result.brand}</div>
                <div className="text-xs text-muted-foreground">Brand</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{result.manufactureDate}</div>
                <div className="text-xs text-muted-foreground">Manufactured</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{result.region}</div>
                <div className="text-xs text-muted-foreground">Region</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <Info className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold">{result.storageCapacity}</div>
                <div className="text-xs text-muted-foreground">Storage</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};