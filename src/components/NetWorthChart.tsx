import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { getCurrencySymbol } from "@/lib/currencyUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface NetWorthChartProps {
  data?: any;
}

export default function NetWorthChart({ data }: NetWorthChartProps) {
  const [timeRange, setTimeRange] = useState<
    "monthly" | "quarterly" | "yearly"
  >("monthly");
  
  const { userCurrency } = useUser();
  const currencySymbol = getCurrencySymbol(userCurrency);

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
          callback: (value: number) => `${currencySymbol}${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Net Worth Trend</CardTitle>
        <Tabs
          value={timeRange}
          onValueChange={(value) =>
            setTimeRange(value as "monthly" | "quarterly" | "yearly")
          }
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line options={options} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
}
