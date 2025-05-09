import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

interface FinancialItem {
  id: string;
  name: string;
  value: number;
  category: string;
}

interface FinancialBreakdownProps {
  assets?: FinancialItem[];
  liabilities?: FinancialItem[];
}

export default function FinancialBreakdown({
  assets,
  liabilities,
}: FinancialBreakdownProps) {
  const [activeTab, setActiveTab] = useState("assets");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemType, setItemType] = useState<"asset" | "liability">("asset");

  // Default data if none provided
  const defaultAssets: FinancialItem[] = [
    { id: "1", name: "Checking Account", value: 5000, category: "Cash" },
    { id: "2", name: "Savings Account", value: 15000, category: "Cash" },
    {
      id: "3",
      name: "Investment Portfolio",
      value: 45000,
      category: "Investments",
    },
    { id: "4", name: "Home Value", value: 350000, category: "Real Estate" },
  ];

  const defaultLiabilities: FinancialItem[] = [
    { id: "1", name: "Mortgage", value: 280000, category: "Loans" },
    { id: "2", name: "Car Loan", value: 12000, category: "Loans" },
    { id: "3", name: "Credit Card", value: 3000, category: "Credit" },
    { id: "4", name: "Student Loan", value: 18000, category: "Loans" },
  ];

  const assetData = assets || defaultAssets;
  const liabilityData = liabilities || defaultLiabilities;

  const handleAddItem = (type: "asset" | "liability") => {
    setItemType(type);
    setIsDialogOpen(true);
  };

  const calculateTotal = (items: FinancialItem[]) => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  const assetCategories = [...new Set(assetData.map((item) => item.category))];
  const liabilityCategories = [
    ...new Set(liabilityData.map((item) => item.category)),
  ];

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Financial Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Total Assets: ${calculateTotal(assetData).toLocaleString()}
              </h3>
              <Button
                onClick={() => handleAddItem("asset")}
                size="sm"
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" /> Add Asset
              </Button>
            </div>

            <div className="space-y-4">
              {assetCategories.map((category) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {assetData
                      .filter((item) => item.category === category)
                      .map((asset) => (
                        <div
                          key={asset.id}
                          className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                        >
                          <span>{asset.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              ${asset.value.toLocaleString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liabilities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Total Liabilities: $
                {calculateTotal(liabilityData).toLocaleString()}
              </h3>
              <Button
                onClick={() => handleAddItem("liability")}
                size="sm"
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" /> Add Liability
              </Button>
            </div>

            <div className="space-y-4">
              {liabilityCategories.map((category) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {liabilityData
                      .filter((item) => item.category === category)
                      .map((liability) => (
                        <div
                          key={liability.id}
                          className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                        >
                          <span>{liability.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              ${liability.value.toLocaleString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add {itemType === "asset" ? "Asset" : "Liability"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Value ($)</Label>
                <Input id="value" type="number" placeholder="Enter value" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemType === "asset" ? (
                      <>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Investments">Investments</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Loans">Loans</SelectItem>
                        <SelectItem value="Credit">Credit</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
