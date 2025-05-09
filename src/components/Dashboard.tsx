import NetWorthChart from "./NetWorthChart";
import FinancialBreakdown from "./FinancialBreakdown";
import StatisticsPanel from "./StatisticsPanel";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Net Worth Dashboard</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Statistics Panel */}
        <StatisticsPanel />

        {/* Net Worth Chart */}
        <NetWorthChart />

        {/* Financial Breakdown */}
        <FinancialBreakdown />
      </div>
    </div>
  );
}
