import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { WalletList } from "@/components/dashboard/WalletList";
import { WalletOverview } from "@/components/dashboard/WalletOverview";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Dashboard
      </h1>
      <StatsCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          <WalletOverview />
          <RecentTransactions />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <WalletList />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
