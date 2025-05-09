import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface StatisticsPanelProps {
  netWorth?: number;
  previousNetWorth?: number;
  largestAsset?: {
    name: string;
    value: number;
  };
  largestLiability?: {
    name: string;
    value: number;
  };
}

export default function StatisticsPanel({
  netWorth = 122000,
  previousNetWorth = 115000,
  largestAsset = { name: "Home Value", value: 350000 },
  largestLiability = { name: "Mortgage", value: 280000 },
}: StatisticsPanelProps) {
  const growthAmount = netWorth - previousNetWorth;
  const growthPercentage = ((growthAmount / previousNetWorth) * 100).toFixed(1);
  const isPositiveGrowth = growthAmount >= 0;

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Summary Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Net Worth */}
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Current Net Worth</h3>
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">
              ${netWorth.toLocaleString()}
            </p>
          </div>

          {/* Growth Rate */}
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`p-2 rounded-full ${isPositiveGrowth ? "bg-green-100" : "bg-red-100"}`}
                >
                  {isPositiveGrowth ? (
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <h3 className="text-sm font-medium">Growth Rate</h3>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{growthPercentage}%</p>
              <p className="text-sm text-muted-foreground">
                {isPositiveGrowth ? "+" : ""}
                {growthAmount.toLocaleString()} from previous period
              </p>
            </div>
          </div>

          {/* Largest Asset */}
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-blue-100">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium">Largest Asset</h3>
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">
              ${largestAsset.value.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">{largestAsset.name}</p>
          </div>

          {/* Largest Liability */}
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-amber-100">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-sm font-medium">Largest Liability</h3>
              </div>
            </div>
            <p className="text-2xl font-bold mt-2">
              ${largestLiability.value.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {largestLiability.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
