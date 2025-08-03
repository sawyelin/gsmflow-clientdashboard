import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Smartphone, Lock, Unlock } from "lucide-react";

interface MiCloudResult {
  imei: string;
  status: 'clean' | 'locked' | 'unknown';
  model: string;
  miuiVersion: string;
  androidVersion: string;
  region: string;
  lastSeen?: string;
  checkDate: string;
}

export const CheckMiCloud = () => {
  const [imei, setImei] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<MiCloudResult | null>(null);
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
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const statuses: MiCloudResult['status'][] = ['clean', 'locked', 'unknown'];
    const models = ['Xiaomi 14 Pro', 'Redmi Note 13', 'POCO X6 Pro', 'Mi 11 Ultra', 'Redmi 12'];
    const miuiVersions = ['MIUI 15', 'MIUI 14', 'MIUI 13', 'HyperOS 1.0'];
    const androidVersions = ['Android 14', 'Android 13', 'Android 12'];
    const regions = ['Global', 'China', 'Europe', 'India'];
    
    const mockResult: MiCloudResult = {
      imei,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      model: models[Math.floor(Math.random() * models.length)],
      miuiVersion: miuiVersions[Math.floor(Math.random() * miuiVersions.length)],
      androidVersion: androidVersions[Math.floor(Math.random() * androidVersions.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      lastSeen: Math.random() > 0.5 ? '2024-01-15 10:30 AM' : undefined,
      checkDate: new Date().toLocaleString()
    };

    setResult(mockResult);
    setIsChecking(false);
    
    toast({
      title: "Mi Cloud Check Complete",
      description: `Status: ${mockResult.status.toUpperCase()}`,
    });
  };

  const getStatusBadge = (status: MiCloudResult['status']) => {
    const config = {
      clean: { variant: "default" as const, text: "Clean / Unlocked", className: "bg-success text-success-foreground" },
      locked: { variant: "destructive" as const, text: "Mi Account Locked", className: "" },
      unknown: { variant: "secondary" as const, text: "Status Unknown", className: "" }
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
          <Cloud className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Mi Cloud Status Checker</h2>
          <p className="text-muted-foreground">Check if a Xiaomi device is locked to Mi Account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Check Mi Cloud Status</span>
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
                  Find Xiaomi IMEI: Settings → About phone → Status
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Cloud className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-medium text-blue-600 dark:text-blue-400">Mi Cloud Check</p>
                    <p className="text-muted-foreground">Verifies if device is linked to a Mi Account and can be factory reset.</p>
                  </div>
                </div>
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
                    Checking Mi Cloud...
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 mr-2" />
                    Check Mi Cloud Status
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Mi Cloud Status</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Mi Account Status:</span>
                  {getStatusBadge(result.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMEI:</span>
                    <span className="font-mono text-sm">{result.imei}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span>{result.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MIUI Version:</span>
                    <span>{result.miuiVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Android:</span>
                    <span>{result.androidVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{result.region}</span>
                  </div>
                  {result.lastSeen && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Seen:</span>
                      <span className="text-sm">{result.lastSeen}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check Date:</span>
                    <span className="text-sm">{result.checkDate}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Status Meaning:</h4>
                  {result.status === 'clean' && (
                    <p className="text-sm text-success">
                      ✅ Device is not locked to a Mi Account. Factory reset is possible.
                    </p>
                  )}
                  {result.status === 'locked' && (
                    <p className="text-sm text-destructive">
                      ❌ Device is locked to a Mi Account. Original owner credentials required for reset.
                    </p>
                  )}
                  {result.status === 'unknown' && (
                    <p className="text-sm text-muted-foreground">
                      ⚠️ Cannot determine Mi Account status. Device may be offline or have connectivity issues.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Cloud className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Enter an IMEI to check Mi Cloud status</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-success/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Unlock className="w-5 h-5 text-success" />
              <div>
                <h4 className="font-semibold text-success">Clean Status</h4>
                <p className="text-xs text-muted-foreground">No Mi Account lock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-destructive" />
              <div>
                <h4 className="font-semibold text-destructive">Mi Account Locked</h4>
                <p className="text-xs text-muted-foreground">Requires original owner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-warning" />
              <div>
                <h4 className="font-semibold text-warning">Status Unknown</h4>
                <p className="text-xs text-muted-foreground">Cannot verify status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};