import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Radio
} from "lucide-react";

interface SidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar = ({ selectedSection, onSectionChange }: SidebarProps) => {
  const menuSections = [
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

  return (
    <aside className="w-64 bg-card border-r border-border p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            frpIMEI.com
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Professional IMEI Services</p>
      </div>

      <nav className="space-y-6">
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
    </aside>
  );
};