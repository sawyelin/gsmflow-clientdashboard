import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

interface KGResult {
  imei: string;
  kgStatus: 'active' | 'inactive' | 'unknown';
  model: string;
  androidVersion: string;
  securityPatch: string;
  checkDate: string;
}

export const CheckSamsungKG = () => {
  const [imei, setImei] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<KGResult | null>(null);
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
    
    const kgStatuses: KGResult['kgStatus'][] = ['active', 'inactive', 'unknown'];
    const models = ['Galaxy S24 Ultra', 'Galaxy S23', 'Galaxy Note 20', 'Galaxy A54', 'Galaxy Tab S9'];
    const androidVersions = ['Android 14', 'Android 13', 'Android 12', 'Android 11'];
    const patches = ['2024-01', '2023-12', '2023-11', '2023-10'];
    
    const mockResult: KGResult = {
      imei,
      kgStatus: kgStatuses[Math.floor(Math.random() * kgStatuses.length)],
      model: models[Math.floor(Math.random() * models.length)],
      androidVersion: androidVersions[Math.floor(Math.random() * androidVersions.length)],
      securityPatch: patches[Math.floor(Math.random() * patches.length)],
      checkDate: new Date().toLocaleString()
    };

    setResult(mockResult);
    setIsChecking(false);
    
    toast({
      title: "Knox Guard Check Complete",
      description: `Status: ${mockResult.kgStatus.toUpperCase()}`,
    });
  };

  const getKGStatusBadge = (status: KGResult['kgStatus']) => {
    const config = {
      active: { variant: "destructive" as const, text: "Knox Guard Active", className: "" },
      inactive: { variant: "default" as const, text: "Knox Guard Inactive", className: "bg-success text-success-foreground" },
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
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Samsung Knox Guard Checker</h2>
          <p className="text-muted-foreground">Check Knox Guard activation status on Samsung devices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Check Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Check Knox Guard Status</span>
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
                  Find Samsung IMEI: Settings → About phone → Status information
                </p>
              </div>

              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                  <div className="text-xs">
                    <p className="font-medium text-warning">Important:</p>
                    <p className="text-muted-foreground">Knox Guard is Samsung's enterprise security feature. Active status may prevent device reset.</p>
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
                    Checking Knox Guard...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Check Knox Guard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Knox Guard Status</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Knox Guard:</span>
                  {getKGStatusBadge(result.kgStatus)}
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
                    <span className="text-muted-foreground">Android:</span>
                    <span>{result.androidVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Patch:</span>
                    <span>{result.securityPatch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check Date:</span>
                    <span className="text-sm">{result.checkDate}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Knox Guard Status:</h4>
                  {result.kgStatus === 'inactive' && (
                    <p className="text-sm text-success">
                      ✅ Knox Guard is not active. The device can be reset normally.
                    </p>
                  )}
                  {result.kgStatus === 'active' && (
                    <p className="text-sm text-destructive">
                      ❌ Knox Guard is active. Contact the organization administrator before resetting.
                    </p>
                  )}
                  {result.kgStatus === 'unknown' && (
                    <p className="text-sm text-muted-foreground">
                      ⚠️ Unable to determine Knox Guard status. Check device connectivity.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Enter an IMEI to check Knox Guard status</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feature Info */}
      <Card>
        <CardHeader>
          <CardTitle>About Knox Guard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>What is Knox Guard?</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Knox Guard is Samsung's enterprise mobile device management solution that allows organizations 
                to remotely manage and secure corporate devices.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span>When Active</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                If Knox Guard is active, the device may be remotely locked, wiped, or have restrictions 
                applied by the organization that owns it.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};