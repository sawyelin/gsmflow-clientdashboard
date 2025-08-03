import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UnlockFRP } from "@/components/UnlockFRP";
import { OrderHistory } from "@/components/OrderHistory";
import { AddFunds } from "@/components/AddFunds";
import { useGSMServices } from "@/hooks/useGSMServices";
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Smartphone,
  Server,
  Wallet,
  Settings
} from "lucide-react";

export const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const { stats: userStats, orders, isServerOnline } = useGSMServices();

  const stats = [
    {
      title: "Verification",
      value: userStats.verification.toString(),
      percentage: `${((userStats.verification / Math.max(userStats.lastOrder, 1)) * 100).toFixed(1)}%`,
      icon: Shield,
      variant: "warning" as const
    },
    {
      title: "Success",
      value: userStats.success.toString(), 
      percentage: `${((userStats.success / Math.max(userStats.lastOrder, 1)) * 100).toFixed(1)}%`,
      icon: CheckCircle2,
      variant: "success" as const
    },
    {
      title: "Rejected",
      value: userStats.rejected.toString(),
      percentage: `${((userStats.rejected / Math.max(userStats.lastOrder, 1)) * 100).toFixed(1)}%`, 
      icon: XCircle,
      variant: "destructive" as const
    },
    {
      title: "Last Order",
      value: userStats.lastOrder.toString(),
      percentage: `${userStats.lastOrder > 0 ? '+' : ''}${userStats.lastOrder}`,
      icon: Clock,
      variant: "default" as const
    }
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "unlock-frp":
        return <UnlockFRP onOrderCreated={() => setSelectedSection("history")} />;
      case "history":
        return <OrderHistory />;
      case "add-fund":
        return <AddFunds />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden hover-scale fade-in hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.percentage}</p>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>

      {/* Server Status and Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Status */}
        <Card className={`${isServerOnline ? 'border-success/50' : 'border-destructive/50'} hover-scale fade-in relative overflow-hidden`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${isServerOnline ? 'bg-success/10' : 'bg-destructive/10'}`}>
                  <Server className={`w-6 h-6 ${isServerOnline ? 'text-success' : 'text-destructive'}`} />
                </div>
                <div>
                  <h3 className="font-semibold">Server Status</h3>
                  <Badge 
                    variant={isServerOnline ? "default" : "destructive"} 
                    className={isServerOnline ? "bg-success text-success-foreground" : "animate-pulse"}
                  >
                    {isServerOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
              {isServerOnline ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive" />
              )}
            </div>
          </CardContent>
          <div className={`absolute top-0 right-0 w-32 h-32 ${isServerOnline ? 'bg-success/5' : 'bg-destructive/5'} rounded-full blur-3xl`} />
        </Card>

        {/* Balance Card */}
        <Card className="bg-gradient-warning border-warning/50 hover-scale fade-in relative overflow-hidden shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-warning-foreground/10">
                  <Wallet className="w-6 h-6 text-warning-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-warning-foreground tracking-wider">BALANCE</h3>
                  <div className="text-3xl font-bold text-warning-foreground">${userStats.balance.toFixed(2)}</div>
                </div>
              </div>
              <div className="relative">
                <Wallet className="w-8 h-8 text-warning-foreground/30" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-warning-foreground/20 rounded-full animate-ping" />
              </div>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning-foreground/10 rounded-full blur-3xl" />
        </Card>
      </div>

      {/* Order History Table */}
      <Card className="fade-in">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Recent Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Service</TableHead>
                <TableHead className="font-semibold">IMEI</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Reply In</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                    <TableCell className="font-medium">{order.service}</TableCell>
                    <TableCell className="font-mono text-sm">{order.imei}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.status === 'completed' ? 'default' :
                          order.status === 'failed' ? 'destructive' : 'secondary'
                        }
                        className={order.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {order.status === 'processing' && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        )}
                        <span className="text-sm">{order.replyIn}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-muted/30">
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Clock className="w-8 h-8 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No order history yet</p>
                      <p className="text-sm text-muted-foreground/70">Start by creating your first unlock order</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar selectedSection={selectedSection} onSectionChange={setSelectedSection} />
      
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback>
                  <Smartphone className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  {selectedSection === "dashboard" ? "DASHBOARD" : 
                   selectedSection === "unlock-frp" ? "UNLOCK FRP" :
                   selectedSection === "history" ? "ORDER HISTORY" :
                   selectedSection === "add-fund" ? "ADD FUNDS" :
                   selectedSection.toUpperCase().replace("-", " ")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  rd910 • Balance: ${userStats.balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};