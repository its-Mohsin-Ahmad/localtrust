import { Calendar, CheckCircle2, CreditCard, Star, TrendingUp, Users } from "lucide-react";
import { MetricCard } from "@/components/shared/metric-card";
import {
  AreaChartPanel,
  BarChartPanel,
  GroupedBarChartPanel,
  LineChartPanel,
  PieChartPanel,
} from "@/components/dashboard/charts";

const earnings = [
  { name: "May", value: 42000 },
  { name: "Jun", value: 51000 },
  { name: "Jul", value: 47500 },
  { name: "Aug", value: 63000 },
  { name: "Sep", value: 58200 },
  { name: "Oct", value: 71400 },
];

const jobsByCategory = [
  { name: "AC Repair", value: 18 },
  { name: "Electrical", value: 14 },
  { name: "Plumbing", value: 11 },
  { name: "Carpentry", value: 7 },
  { name: "Painting", value: 5 },
];

const weeklyJobs = [
  { name: "Mon", completed: 3, pending: 1 },
  { name: "Tue", completed: 4, pending: 2 },
  { name: "Wed", completed: 2, pending: 1 },
  { name: "Thu", completed: 5, pending: 0 },
  { name: "Fri", completed: 6, pending: 2 },
  { name: "Sat", completed: 7, pending: 1 },
  { name: "Sun", completed: 3, pending: 0 },
];

const ratingTrend = [
  { name: "May", value: 4.6 },
  { name: "Jun", value: 4.7 },
  { name: "Jul", value: 4.65 },
  { name: "Aug", value: 4.8 },
  { name: "Sep", value: 4.85 },
  { name: "Oct", value: 4.9 },
];

const profileViews = [
  { name: "Week 1", value: 320 },
  { name: "Week 2", value: 410 },
  { name: "Week 3", value: 380 },
  { name: "Week 4", value: 520 },
  { name: "Week 5", value: 610 },
  { name: "Week 6", value: 580 },
];

const RECENT_BOOKINGS = [
  { id: "BK-1048", customer: "Hassan Ali", service: "AC Servicing", date: "14 Oct 2026", amount: "Rs. 4,500", status: "In Progress" },
  { id: "BK-1045", customer: "Mehwish Khan", service: "Wiring Repair", date: "13 Oct 2026", amount: "Rs. 3,200", status: "Accepted" },
  { id: "BK-1042", customer: "Ali Hamza", service: "AC Repair", date: "12 Oct 2026", amount: "Rs. 6,800", status: "Completed" },
  { id: "BK-1037", customer: "Zainab Noor", service: "Fan Installation", date: "09 Oct 2026", amount: "Rs. 2,100", status: "Completed" },
];

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E4E7EC] rounded-card p-5">
      <h3 className="font-bold text-[#182230] text-sm">{title}</h3>
      <p className="text-[#667085] text-xs mt-0.5 mb-4">{subtitle}</p>
      {children}
    </div>
  );
}

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold text-[#182230]">Welcome back, Ahmed</h1>
          <p className="text-[#667085] text-sm">Here is how your business is performing this month.</p>
        </div>
        <a
          href="/provider/services"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-[#FF6900] text-white text-sm font-medium hover:bg-[#e55a00] transition-colors"
        >
          Add New Service
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Earnings (Oct)" value="Rs. 71,400" change={{ value: "23%", positive: true }} icon={<CreditCard className="w-4 h-4" />} />
        <MetricCard label="Total Bookings" value="55" change={{ value: "14%", positive: true }} icon={<Calendar className="w-4 h-4" />} />
        <MetricCard label="Completed Jobs" value="48" change={{ value: "11%", positive: true }} icon={<CheckCircle2 className="w-4 h-4" />} />
        <MetricCard label="Avg. Rating" value="4.9 / 5" change={{ value: "0.1", positive: true }} icon={<Star className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Earnings Trend" subtitle="Monthly earnings over the last 6 months (Rs.)">
          <AreaChartPanel data={earnings} />
        </ChartCard>
        <ChartCard title="Jobs by Category" subtitle="Distribution of completed jobs across services">
          <PieChartPanel data={jobsByCategory} />
        </ChartCard>
        <ChartCard title="Weekly Job Status" subtitle="Completed vs pending jobs this week">
          <GroupedBarChartPanel data={weeklyJobs} />
        </ChartCard>
        <ChartCard title="Rating & Profile Views" subtitle="How customers perceive your profile">
          <div className="space-y-4">
            <LineChartPanel data={ratingTrend} height={140} />
            <BarChartPanel data={profileViews} height={140} />
          </div>
        </ChartCard>
      </div>

      <div className="bg-white border border-[#E4E7EC] rounded-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E7EC]">
          <h3 className="font-bold text-[#182230] text-sm">Recent Booking Requests</h3>
          <a href="/provider/bookings" className="text-[#FF6900] text-sm font-medium hover:underline">
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#667085] text-xs border-b border-[#E4E7EC]">
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((b) => (
                <tr key={b.id} className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-3 font-medium text-[#182230]">{b.id}</td>
                  <td className="px-5 py-3 text-[#182230]">{b.customer}</td>
                  <td className="px-5 py-3 text-[#667085]">{b.service}</td>
                  <td className="px-5 py-3 text-[#667085]">{b.date}</td>
                  <td className="px-5 py-3 font-medium text-[#182230]">{b.amount}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        "inline-block px-2.5 py-1 rounded-full text-xs font-medium " +
                        (b.status === "Completed"
                          ? "bg-[#22C55E]/10 text-[#16A34A]"
                          : b.status === "In Progress"
                            ? "bg-[#FF6900]/10 text-[#FF6900]"
                            : "bg-[#082B60]/10 text-[#082B60]")
                      }
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-card p-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#082B60]/10 text-[#082B60] shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#182230] text-sm">Profile views are up 34%</p>
            <p className="text-[#667085] text-xs mt-0.5">580 customers viewed your profile this week.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-card p-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF6900]/10 text-[#FF6900] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#182230] text-sm">Boost your earnings</p>
            <p className="text-[#667085] text-xs mt-0.5">Add 2 more services to appear in more searches.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

