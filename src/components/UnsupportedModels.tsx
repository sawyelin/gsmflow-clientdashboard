import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Smartphone, Search } from "lucide-react";
import { useState } from "react";

interface UnsupportedModel {
  brand: string;
  model: string;
  reason: string;
  alternative?: string;
  lastUpdate: string;
}

export const UnsupportedModels = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const unsupportedModels: UnsupportedModel[] = [
    {
      brand: "Samsung",
      model: "Galaxy S24 Ultra (Snapdragon - US)",
      reason: "Latest security patches block unlock methods",
      alternative: "Wait for updated tools",
      lastUpdate: "2024-01-15"
    },
    {
      brand: "Samsung",
      model: "Galaxy A55 5G",
      reason: "New Knox security architecture",
      alternative: "Use professional service only",
      lastUpdate: "2024-01-10"
    },
    {
      brand: "Xiaomi",
      model: "14 Ultra (Global)",
      reason: "HyperOS security restrictions",
      alternative: "Contact manufacturer",
      lastUpdate: "2024-01-08"
    },
    {
      brand: "Google",
      model: "Pixel 8 Pro",
      reason: "Titan M security chip",
      alternative: "Google Account Recovery only",
      lastUpdate: "2024-01-05"
    },
    {
      brand: "OnePlus",
      model: "12 Pro",
      reason: "OxygenOS 14 restrictions",
      alternative: "Official unlock process",
      lastUpdate: "2024-01-03"
    },
    {
      brand: "iPhone",
      model: "15 Pro Max (iOS 17.2+)",
      reason: "Latest iOS security updates",
      alternative: "Apple ID recovery only",
      lastUpdate: "2024-01-01"
    }
  ];

  const filteredModels = unsupportedModels.filter(model =>
    model.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBrandColor = (brand: string) => {
    const colors: Record<string, string> = {
      Samsung: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      Xiaomi: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      Google: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      OnePlus: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      iPhone: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    };
    return colors[brand] || "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-warning/10">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Unsupported Device Models</h2>
          <p className="text-muted-foreground">Devices that currently cannot be unlocked or have limitations</p>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3">
          <CardContent className="pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by brand, model, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{unsupportedModels.length}</div>
              <div className="text-xs text-muted-foreground">Unsupported Models</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning Banner */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning">Important Notice</h3>
              <p className="text-sm text-muted-foreground mt-1">
                The models listed below are currently unsupported due to security updates, hardware restrictions, 
                or software limitations. We regularly update our tools and methods, so check back frequently for updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unsupported Models List */}
      <div className="space-y-4">
        {filteredModels.length > 0 ? (
          filteredModels.map((model, index) => (
            <Card key={index} className="border-l-4 border-l-warning">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getBrandColor(model.brand)}>
                        {model.brand}
                      </Badge>
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{model.model}</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-destructive">Reason: </span>
                        <span className="text-sm text-muted-foreground">{model.reason}</span>
                      </div>
                      {model.alternative && (
                        <div>
                          <span className="text-sm font-medium text-primary">Alternative: </span>
                          <span className="text-sm text-muted-foreground">{model.alternative}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium">Last Updated: </span>
                        <span className="text-sm text-muted-foreground">{model.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge variant="destructive" className="whitespace-nowrap">
                      Not Supported
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Models Found</h3>
                <p className="text-muted-foreground">
                  No unsupported models match your search criteria.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why Models Become Unsupported</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Security Updates</h4>
                <p className="text-sm text-muted-foreground">Manufacturers release security patches that block unlock methods</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Hardware Changes</h4>
                <p className="text-sm text-muted-foreground">New security chips or hardware modifications</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Software Restrictions</h4>
                <p className="text-sm text-muted-foreground">Operating system changes that prevent unlocking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What You Can Do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Check Regular Updates</h4>
                <p className="text-sm text-muted-foreground">We constantly work on new methods and solutions</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-muted-foreground">Get notified when your device becomes supported</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Use Alternatives</h4>
                <p className="text-sm text-muted-foreground">Try official manufacturer unlock methods</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Button */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="font-semibold">Have a Device Not Listed?</h3>
            <p className="text-sm text-muted-foreground">
              Contact our support team to check if we can help with your specific device model.
            </p>
            <Button className="w-full sm:w-auto">
              Contact Support Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};