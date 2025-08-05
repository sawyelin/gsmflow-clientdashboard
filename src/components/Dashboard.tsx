import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import { AppSidebar, MobileSidebar } from "./Sidebar";
import { UnlockFRP } from "./UnlockFRP";
import { OrderHistory } from "./OrderHistory";
import { CheckiCloud } from "./CheckiCloud";
import { CheckSamsungKG } from "./CheckSamsungKG";
import { CheckSamsungInfo } from "./CheckSamsungInfo";
import { CheckMiCloud } from "./CheckMiCloud";
import { InvoiceHistory } from "./InvoiceHistory";
import { AddFunds } from "./AddFunds";
import { UnsupportedModels } from "./UnsupportedModels";
import { useGSMServices } from "@/hooks/useGSMServices";
import { 
  Smartphone,
  Server,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Users,
  Activity,
  MessageCircle,
  Radio,
  Settings,
  FileText,
  Bell
} from "lucide-react";

export const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const { addFunds, orders, stats: userStats, isLoading } = useGSMServices();
  const isMobile = useIsMobile();

  const dashboardStats = [
    { title: "Total Orders", value: "156", icon: Smartphone, percentage: "+20.1% from last month" },
    { title: "Success Rate", value: "98.5%", icon: CheckCircle, percentage: "+0.5% from last month" },
    { title: "Active Services", value: "12", icon: Server, percentage: "All systems operational" },
    { title: "Revenue", value: "$2,450", icon: DollarSign, percentage: "+15% from last month" }
  ];

  const getSectionTitle = (section: string) => {
    switch (section) {
      case "unlock-frp": return "FRP Unlock Service";
      case "history": return "Order History";
      case "check-icloud": return "iCloud Status Checker";
      case "check-samsung-kg": return "Samsung KG Checker";
      case "check-samsung-info": return "Samsung Info Checker";
      case "check-micloud": return "MiCloud Checker";
      case "invoice": return "Invoices";
      case "statement": return "Account Statement";
      case "add-fund": return "Add Funds";
      case "unsupported": return "Unsupported Models";
      case "contact": return "Contact Support";
      case "channel": return "Communication Channels";
      default: return "Dashboard";
    }
  };

  const getSectionDescription = (section: string) => {
    switch (section) {
      case "unlock-frp": return "Professional FRP bypass service for Android devices";
      case "history": return "View and track all your service orders";
      case "check-icloud": return "Check iCloud activation lock status";
      case "check-samsung-kg": return "Samsung Knox Guard status verification";
      case "check-samsung-info": return "Detailed Samsung device information";
      case "check-micloud": return "Xiaomi Mi Account status checker";
      case "invoice": return "Download invoices and receipts";
      case "statement": return "View your account activity and balance";
      case "add-fund": return "Add credits to your account";
      case "unsupported": return "List of unsupported device models";
      case "contact": return "Get help from our support team";
      case "channel": return "Join our community and get updates";
      default: return "Professional IMEI services dashboard";
    }
  };

  const renderContact = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Contact Support</h2>
          <p className="text-muted-foreground">Get help from our professional support team</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Support Channels</CardTitle>
            <CardDescription>Choose your preferred way to reach us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat
              <Badge variant="secondary" className="ml-auto">Online</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Support Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Telegram Support
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Response Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Live Chat</span>
              <Badge variant="secondary">~2 mins</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Support Ticket</span>
              <Badge variant="secondary">~1 hour</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Telegram</span>
              <Badge variant="secondary">~5 mins</Badge>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {dashboardStats.map((stat, index) => (
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

      <Separator />

      {/* Server Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5" />
              <span>Server Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Server</span>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Response Time</span>
              <Badge variant="secondary">~45ms</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Load</span>
                <span>34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => setSelectedSection("unlock-frp")} 
              className="w-full justify-start bg-gradient-primary hover:bg-gradient-primary/90"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Start New FRP Unlock
            </Button>
            <Button 
              onClick={() => setSelectedSection("check-icloud")} 
              variant="outline" 
              className="w-full justify-start"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Device Status
            </Button>
            <Button 
              onClick={() => setSelectedSection("add-fund")} 
              variant="outline" 
              className="w-full justify-start"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.service}</p>
                      <p className="text-xs text-muted-foreground">IMEI: {order.imei}</p>
                    </div>
                  </div>
                  <Badge variant={order.status === "completed" ? "secondary" : "outline"}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );

  function renderContent() {
    switch (selectedSection) {
      case "unlock-frp":
        return <UnlockFRP />;
      case "history":
        return <OrderHistory />;
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
      case "statement":
        return <InvoiceHistory />;
      case "add-fund":
        return <AddFunds />;
      case "unsupported":
        return <UnsupportedModels />;
      case "contact":
        return renderContact();
      case "channel":
        return renderChannel();
      default:
        return renderDashboard();
    }
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <MobileSidebar 
                selectedSection={selectedSection} 
                onSectionChange={setSelectedSection} 
              />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm bg-gradient-primary bg-clip-text text-transparent">
                  frpIMEI.com
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Badge variant="secondary" className="font-mono text-xs">
                ${userStats.balance.toFixed(2)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight">
              {getSectionTitle(selectedSection)}
            </h1>
            <p className="text-sm text-muted-foreground">
              {getSectionDescription(selectedSection)}
            </p>
          </div>
          
          {/* Mobile Content Rendering */}
          {renderContent()}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar 
          selectedSection={selectedSection} 
          onSectionChange={setSelectedSection} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {getSectionTitle(selectedSection)}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {getSectionDescription(selectedSection)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Balance:</span>
                  <Badge variant="secondary" className="font-mono">
                    ${userStats.balance.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Content */}
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};