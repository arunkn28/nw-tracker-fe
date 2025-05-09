import { Line } from "react-chartjs-2";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NetWorthChartProps {
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

export default function NetWorthChart({ data }: NetWorthChartProps) {
  const [timeRange, setTimeRange] = useState<
    "monthly" | "quarterly" | "yearly"
  >("monthly");

  // Default data if none provided
  const defaultData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Net Worth",
        data: [
          10000, 12000, 15000, 14500, 16000, 18000, 19500, 22000, 24000, 23500,
          25000, 28000,
        ],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
      },
    ],
  };

  const chartData = data || defaultData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    hover: {
      mode: "nearest" as const,
      intersect: true,
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Net Worth Trend</CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value: "monthly" | "quarterly" | "yearly") =>
            setTimeRange(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {/* Note: This is a placeholder. You'll need to install react-chartjs-2 and chart.js */}
          <div className="flex items-center justify-center h-full border border-dashed border-gray-300 rounded-md">
            <p className="text-muted-foreground">
              Chart visualization will appear here after installing chart.js
              dependencies
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
