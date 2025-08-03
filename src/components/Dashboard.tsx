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
import { CheckiCloud } from "@/components/CheckiCloud";
import { CheckSamsungKG } from "@/components/CheckSamsungKG";
import { CheckSamsungInfo } from "@/components/CheckSamsungInfo";
import { CheckMiCloud } from "@/components/CheckMiCloud";
import { InvoiceHistory } from "@/components/InvoiceHistory";
import { UnsupportedModels } from "@/components/UnsupportedModels";
import { useGSMServices } from "@/hooks/useGSMServices";
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Smartphone,
  Server,
  Wallet,
  Settings,
  MessageCircle,
  FileText,
  Radio,
  Bell,
  Users,
  Mail
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
      case "check-icloud":
        return <CheckiCloud />;
      case "check-samsung-kg":
        return <CheckSamsungKG />;
      case "check-samsung-info":
        return <CheckSamsungInfo />;
      case "check-micloud":
        return <CheckMiCloud />;
      case "invoice":
        return <InvoiceHistory />;
      case "unsupported":
        return <UnsupportedModels />;
      case "contact":
        return renderContactSupport();
      case "statement":
        return renderStatement();
      case "channel":
        return renderChannel();
      default:
        return renderDashboard();
    }
  };

  const renderContactSupport = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Contact Support</h2>
          <p className="text-muted-foreground">Get help with your orders and technical issues</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Support Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MessageCircle className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-medium">Live Chat</h4>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <h4 className="font-medium">Email Support</h4>
                <p className="text-sm text-muted-foreground">support@frpimei.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">Order taking too long?</Button>
            <Button variant="ghost" className="w-full justify-start">Payment not processed?</Button>
            <Button variant="ghost" className="w-full justify-start">Device not supported?</Button>
            <Button variant="ghost" className="w-full justify-start">Technical questions?</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStatement = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Account Statement</h2>
          <p className="text-muted-foreground">View your account activity and transaction history</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">${userStats.balance.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Current Balance</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.lastOrder}</div>
              <div className="text-xs text-muted-foreground">Total Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.success}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderChannel = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Radio className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Communication Channels</h2>
          <p className="text-muted-foreground">Stay connected with our community and updates</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Official Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Telegram Channel
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Radio className="w-4 h-4 mr-2" />
              Discord Server
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-2" />
              News & Updates
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Join our community for tips, updates, and support</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

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
                   selectedSection === "check-icloud" ? "CHECK ICLOUD" :
                   selectedSection === "check-samsung-kg" ? "SAMSUNG KG CHECK" :
                   selectedSection === "check-samsung-info" ? "SAMSUNG INFO" :
                   selectedSection === "check-micloud" ? "MICLOUD CHECK" :
                   selectedSection === "invoice" ? "INVOICE HISTORY" :
                   selectedSection === "statement" ? "ACCOUNT STATEMENT" :
                   selectedSection === "unsupported" ? "UNSUPPORTED MODELS" :
                   selectedSection === "contact" ? "CONTACT SUPPORT" :
                   selectedSection === "channel" ? "CHANNELS" :
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