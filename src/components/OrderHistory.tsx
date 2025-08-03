import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, Search, Download, Eye, RefreshCw } from "lucide-react";
import { useGSMServices, Order } from "@/hooks/useGSMServices";

export const OrderHistory = () => {
  const { orders } = useGSMServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.imei.includes(searchTerm) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: { variant: "secondary" as const, text: "Pending", className: "" },
      processing: { variant: "default" as const, text: "Processing", className: "" },
      completed: { variant: "default" as const, text: "Completed", className: "bg-success text-success-foreground" },
      failed: { variant: "destructive" as const, text: "Failed", className: "" }
    };
    
    const config = variants[status];
    return (
      <Badge 
        variant={config.variant} 
        className={config.className}
      >
        {config.text}
      </Badge>
    );
  };

  const handleDownloadReport = () => {
    const csvContent = [
      ["Order ID", "Service", "IMEI", "Status", "Date", "Price"].join(","),
      ...filteredOrders.map(order => [
        order.id,
        order.service,
        order.imei,
        order.status,
        order.date,
        `$${order.price.toFixed(2)}`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `order-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <History className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Order History</h2>
            <p className="text-muted-foreground">Track and manage your service orders</p>
          </div>
        </div>
        <Button onClick={handleDownloadReport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Order ID, IMEI, or Service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending", "processing", "completed", "failed"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Orders ({filteredOrders.length})</span>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>IMEI</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reply In</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                    <TableCell className="font-medium">{order.service}</TableCell>
                    <TableCell className="font-mono text-sm">{order.imei}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {order.status === 'processing' && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        )}
                        <span className="text-sm">{order.replyIn}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="font-medium">${order.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <History className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "You haven't placed any orders yet. Start by creating your first unlock order."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};