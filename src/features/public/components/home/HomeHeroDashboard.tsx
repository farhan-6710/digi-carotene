import { HomeHeroDashboardStats } from "@/features/public/components/home/HomeHeroDashboardStats";
import { HomeHeroMacWindowChrome } from "@/features/public/components/home/HomeHeroMacWindowChrome";
import { HomeHeroPerformanceChart } from "@/features/public/components/home/HomeHeroPerformanceChart";

export function HomeHeroDashboard() {
  return (
    <div className="relative lg:ml-4">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-30 blur-lg" />

      <div className="relative overflow-hidden rounded-2xl p-[1.5px] shadow-2xl">
        <div className="absolute inset-[-150%] animate-border-spin bg-[conic-gradient(from_0deg,var(--primary)_0deg,var(--accent)_120deg,transparent_180deg,var(--primary)_240deg,var(--accent)_300deg,transparent_360deg)]" />

        <div className="relative overflow-hidden rounded-[15px] bg-card transition-all duration-500">
          <HomeHeroMacWindowChrome />
          <div className="space-y-5 p-6">
            <HomeHeroDashboardStats />
            <HomeHeroPerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
}
