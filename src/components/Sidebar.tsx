import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Unlock,
  History,
  Cloud,
  Smartphone,
  FileText,
  CreditCard,
  Plus,
  AlertTriangle,
  MessageCircle,
  Radio,
  Menu,
  LayoutDashboard
} from "lucide-react";

interface AppSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

const menuSections = [
  {
    title: "OVERVIEW",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "ORDER",
    items: [
      { id: "unlock-frp", label: "Unlock FRP", icon: Unlock },
      { id: "history", label: "History", icon: History, badge: "0" }
    ]
  },
  {
    title: "CHECKER", 
    items: [
      { id: "check-icloud", label: "Check iCloud", icon: Cloud },
      { id: "check-samsung-kg", label: "Check Samsung KG", icon: Smartphone },
      { id: "check-samsung-info", label: "Check Samsung Info", icon: Smartphone },
      { id: "check-micloud", label: "Check MiCloud", icon: Cloud }
    ]
  },
  {
    title: "FUNDING",
    items: [
      { id: "invoice", label: "Invoice", icon: FileText },
      { id: "statement", label: "Statement", icon: FileText },
      { id: "add-fund", label: "Add Fund", icon: Plus }
    ]
  },
  {
    title: "HELPS",
    items: [
      { id: "unsupported", label: "Unsupported Models", icon: AlertTriangle },
      { id: "contact", label: "Contact Support", icon: MessageCircle },
      { id: "channel", label: "Channel", icon: Radio }
    ]
  }
];

export function AppSidebar({ selectedSection, onSectionChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                frpIMEI.com
              </span>
              <p className="text-xs text-muted-foreground">Professional IMEI Services</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {menuSections.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex}>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={selectedSection === item.id}
                      onClick={() => onSectionChange(item.id)}
                      className="w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

// Mobile Sidebar Wrapper
export function MobileSidebar({ selectedSection, onSectionChange }: AppSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                frpIMEI.com
              </span>
              <p className="text-xs text-muted-foreground">Professional IMEI Services</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.id}
                    variant={selectedSection === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onSectionChange(item.id)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}