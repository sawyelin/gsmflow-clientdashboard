import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, CreditCard, Wallet, DollarSign, Zap } from "lucide-react";
import { useGSMServices } from "@/hooks/useGSMServices";

export const AddFunds = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addFunds, stats } = useGSMServices();
  const { toast } = useToast();

  const quickAmounts = [10, 25, 50, 100, 200, 500];

  const handleAddFunds = async (amount: number) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addFunds(amount);
      
      toast({
        title: "Funds Added Successfully",
        description: `$${amount.toFixed(2)} has been added to your account. New balance: $${(stats.balance + amount).toFixed(2)}`,
      });

      setCustomAmount("");
      setSelectedAmount(null);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const finalAmount = selectedAmount || parseFloat(customAmount) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Add Funds</h2>
          <p className="text-muted-foreground">Top up your account balance to use our services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Balance */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span>Current Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">${stats.balance.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Available for services</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Orders:</span>
                <span className="font-medium">{stats.lastOrder}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Successful:</span>
                <span className="font-medium text-success">{stats.success}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing:</span>
                <span className="font-medium text-warning">{stats.verification}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Funds Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Add Funds to Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Amount Selection */}
            <div className="space-y-3">
              <Label>Quick Amounts</Label>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className="h-12"
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    {amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="custom-amount">Custom Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="pl-10"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* Payment Summary */}
            {finalAmount > 0 && (
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Amount to add:</span>
                      <span className="font-semibold">${finalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing fee:</span>
                      <span className="text-sm text-muted-foreground">Free</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${finalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>New balance:</span>
                      <span>${(stats.balance + finalAmount).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Methods */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-1 gap-3">
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors border-2 border-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-muted-foreground">Visa, MasterCard, American Express</div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        <Zap className="w-3 h-3 mr-1" />
                        Instant
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Button 
              onClick={() => handleAddFunds(finalAmount)}
              disabled={finalAmount <= 0 || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add ${finalAmount.toFixed(2)} to Account
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Your payment is secured with 256-bit SSL encryption. 
              Funds will be available immediately after successful payment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};