import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Smartphone, CheckCircle2, XCircle, Clock } from "lucide-react";

interface CheckResult {
  imei: string;
  status: 'clean' | 'locked' | 'unknown';
  carrier?: string;
  model?: string;
  checkDate: string;
}

export const CheckiCloud = () => {
  const [imei, setImei] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate random result for demo
    const statuses: CheckResult['status'][] = ['clean', 'locked', 'unknown'];
    const carriers = ['Unlocked', 'AT&T', 'Verizon', 'T-Mobile', 'Sprint'];
    const models = ['iPhone 14 Pro', 'iPhone 13', 'iPhone 12', 'iPhone 11', 'iPhone SE'];
    
    const mockResult: CheckResult = {
      imei,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      model: models[Math.floor(Math.random() * models.length)],
      checkDate: new Date().toLocaleString()
    };

    setResult(mockResult);
    setIsChecking(false);
    
    toast({
      title: "iCloud Check Complete",
      description: `Status: ${mockResult.status.toUpperCase()}`,
    });
  };

  const getStatusBadge = (status: CheckResult['status']) => {
    const config = {
      clean: { variant: "default" as const, text: "Clean", className: "bg-success text-success-foreground" },
      locked: { variant: "destructive" as const, text: "iCloud Locked", className: "" },
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
          <Cloud className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">iCloud Status Checker</h2>
          <p className="text-muted-foreground">Check if an iPhone is locked to iCloud account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Check iCloud Status</span>
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
                  Find your iPhone IMEI: Settings → General → About
                </p>
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
                    Checking iCloud Status...
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 mr-2" />
                    Check iCloud Status
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Check Results</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
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
                    <span className="text-muted-foreground">Carrier:</span>
                    <span>{result.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check Date:</span>
                    <span className="text-sm">{result.checkDate}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">What this means:</h4>
                  {result.status === 'clean' && (
                    <p className="text-sm text-success">
                      ✅ This device is not locked to an iCloud account and can be activated normally.
                    </p>
                  )}
                  {result.status === 'locked' && (
                    <p className="text-sm text-destructive">
                      ❌ This device is locked to an iCloud account. You'll need the original owner's credentials.
                    </p>
                  )}
                  {result.status === 'unknown' && (
                    <p className="text-sm text-muted-foreground">
                      ⚠️ Unable to determine iCloud status. The device may be offline or have connectivity issues.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Cloud className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Enter an IMEI to check iCloud status</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-success/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <h4 className="font-semibold text-success">Clean Status</h4>
                <p className="text-xs text-muted-foreground">Device ready for activation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <div>
                <h4 className="font-semibold text-destructive">iCloud Locked</h4>
                <p className="text-xs text-muted-foreground">Requires original owner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <h4 className="font-semibold text-warning">Unknown Status</h4>
                <p className="text-xs text-muted-foreground">Unable to verify</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};