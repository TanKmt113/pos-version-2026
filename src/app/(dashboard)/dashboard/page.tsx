import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { WalletList } from "@/components/dashboard/WalletList";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CalendarDays } from "lucide-react";

export default function HomePage() {
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {currentDate}
          </p>
        </div>
        <Badge variant="secondary" className="w-fit px-4 py-2">
          <span className="text-xs font-medium">Hệ thống POS v1.0</span>
        </Badge>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          <WalletOverview />
          <RecentTransactions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <WalletList />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
