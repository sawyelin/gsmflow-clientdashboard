import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { useGSMServices } from "@/hooks/useGSMServices";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
}

export const InvoiceHistory = () => {
  const { orders } = useGSMServices();
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  // Generate mock invoices based on orders
  const invoices: Invoice[] = orders.map((order, index) => ({
    id: `INV-2024-${String(index + 1).padStart(3, '0')}`,
    date: order.date,
    amount: order.price,
    status: order.status === 'completed' ? 'paid' : order.status === 'failed' ? 'overdue' : 'pending',
    items: [{
      description: order.service,
      quantity: 1,
      price: order.price
    }]
  }));

  const getStatusBadge = (status: Invoice['status']) => {
    const config = {
      paid: { variant: "default" as const, text: "Paid", className: "bg-success text-success-foreground" },
      pending: { variant: "secondary" as const, text: "Pending", className: "" },
      overdue: { variant: "destructive" as const, text: "Overdue", className: "" }
    };
    
    const statusConfig = config[status];
    return (
      <Badge variant={statusConfig.variant} className={statusConfig.className}>
        {statusConfig.text}
      </Badge>
    );
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Simulate PDF download
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const csvContent = [
      ["Invoice ID", "Date", "Description", "Amount"],
      [invoice.id, invoice.date, invoice.items[0].description, `$${invoice.amount.toFixed(2)}`]
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoiceId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Invoice History</h2>
          <p className="text-muted-foreground">View and download your service invoices</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{invoices.length}</div>
              <div className="text-xs text-muted-foreground">Total Invoices</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-2 bg-success rounded-full flex items-center justify-center">
                <span className="text-xs text-success-foreground font-bold">$</span>
              </div>
              <div className="text-2xl font-bold text-success">${paidAmount.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Total Paid</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-2 bg-warning rounded-full flex items-center justify-center">
                <span className="text-xs text-warning-foreground font-bold">$</span>
              </div>
              <div className="text-2xl font-bold text-warning">${(totalAmount - paidAmount).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Outstanding</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{new Date().getMonth() + 1}</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Invoices</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell className="text-sm">{invoice.date}</TableCell>
                    <TableCell className="font-medium">{invoice.items[0].description}</TableCell>
                    <TableCell className="font-bold">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedInvoice(invoice.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Invoices Yet</h3>
              <p className="text-muted-foreground">
                Your invoices will appear here when you start using our services.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Invoice Details - {selectedInvoice}</CardTitle>
            <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>
              ✕
            </Button>
          </CardHeader>
          <CardContent>
            {(() => {
              const invoice = invoices.find(inv => inv.id === selectedInvoice);
              if (!invoice) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Invoice Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Invoice ID:</span> {invoice.id}</p>
                        <p><span className="text-muted-foreground">Date:</span> {invoice.date}</p>
                        <p><span className="text-muted-foreground">Status:</span> {getStatusBadge(invoice.status)}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Billing Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Customer:</span> rd910</p>
                        <p><span className="text-muted-foreground">Payment Method:</span> Credit Card</p>
                        <p><span className="text-muted-foreground">Total:</span> ${invoice.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Service Details</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoice.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => handleDownloadInvoice(invoice.id)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};