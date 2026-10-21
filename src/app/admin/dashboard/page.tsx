import { Building2, Calendar, CreditCard, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { MetricCard } from "@/components/shared/metric-card";
import {
  AreaChartPanel,
  BarChartPanel,
  LineChartPanel,
  PieChartPanel,
} from "@/components/dashboard/charts";

const revenue = [
  { name: "May", value: 840000 },
  { name: "Jun", value: 920000 },
  { name: "Jul", value: 1010000 },
  { name: "Aug", value: 1150000 },
  { name: "Sep", value: 1240000 },
  { name: "Oct", value: 1380000 },
];

const newUsers = [
  { name: "May", value: 420 },
  { name: "Jun", value: 510 },
  { name: "Jul", value: 640 },
  { name: "Aug", value: 720 },
  { name: "Sep", value: 810 },
  { name: "Oct", value: 940 },
];

const bookingsByCity = [
  { name: "Lahore", value: 3200 },
  { name: "Karachi", value: 2800 },
  { name: "Islamabad", value: 1600 },
  { name: "Rawalpindi", value: 1100 },
  { name: "Faisalabad", value: 900 },
];

const platformCategories = [
  { name: "Cleaning", value: 24 },
  { name: "Plumbing", value: 19 },
  { name: "Electrical", value: 17 },
  { name: "AC Repair", value: 15 },
  { name: "Carpentry", value: 13 },
  { name: "Painting", value: 12 },
];

const RECENT_SIGNUPS = [
  { name: "Hassan Ali", role: "Customer", city: "Lahore", date: "15 Oct 2026" },
  { name: "QuickFix Services", role: "Provider", city: "Karachi", date: "15 Oct 2026" },
  { name: "Mehwish Khan", role: "Customer", city: "Islamabad", date: "14 Oct 2026" },
  { name: "CleanPro Lahore", role: "Provider", city: "Lahore", date: "14 Oct 2026" },
  { name: "Zainab Noor", role: "Customer", city: "Rawalpindi", date: "13 Oct 2026" },
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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold text-[#182230]">Platform Overview</h1>
          <p className="text-[#667085] text-sm">Monitor INVOLVE growth, bookings, and revenue.</p>
        </div>
        <a
          href="/admin/reports"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-[#082B60] text-white text-sm font-medium hover:bg-[#061B40] transition-colors"
        >
          Export Report
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Total Users" value="24,860" change={{ value: "9%", positive: true }} icon={<Users className="w-4 h-4" />} />
        <MetricCard label="Active Providers" value="3,420" change={{ value: "6%", positive: true }} icon={<Building2 className="w-4 h-4" />} />
        <MetricCard label="Bookings (Oct)" value="9,640" change={{ value: "17%", positive: true }} icon={<Calendar className="w-4 h-4" />} />
        <MetricCard label="Revenue (Oct)" value="Rs. 1.38M" change={{ value: "11%", positive: true }} icon={<CreditCard className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue Growth" subtitle="Monthly platform revenue (Rs.)">
          <AreaChartPanel data={revenue} />
        </ChartCard>
        <ChartCard title="New Signups" subtitle="Customers and providers joining each month">
          <LineChartPanel data={newUsers} />
        </ChartCard>
        <ChartCard title="Bookings by City" subtitle="Total bookings across major cities">
          <BarChartPanel data={bookingsByCity} />
        </ChartCard>
        <ChartCard title="Category Share" subtitle="Share of bookings per service category">
          <PieChartPanel data={platformCategories} />
        </ChartCard>
      </div>

      <div className="bg-white border border-[#E4E7EC] rounded-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E7EC]">
          <h3 className="font-bold text-[#182230] text-sm">Recent Signups</h3>
          <a href="/admin/users" className="text-[#FF6900] text-sm font-medium hover:underline">
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#667085] text-xs border-b border-[#E4E7EC]">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SIGNUPS.map((u, i) => (
                <tr key={i} className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-3 font-medium text-[#182230]">{u.name}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        "inline-block px-2.5 py-1 rounded-full text-xs font-medium " +
                        (u.role === "Provider"
                          ? "bg-[#FF6900]/10 text-[#FF6900]"
                          : "bg-[#082B60]/10 text-[#082B60]")
                      }
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#667085]">{u.city}</td>
                  <td className="px-5 py-3 text-[#667085]">{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-card p-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#22C55E]/10 text-[#16A34A] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#182230] text-sm">14 providers awaiting verification</p>
            <p className="text-[#667085] text-xs mt-0.5">Review KYC documents to keep the marketplace safe.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-card p-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF6900]/10 text-[#FF6900] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#182230] text-sm">Revenue up 11% vs last month</p>
            <p className="text-[#667085] text-xs mt-0.5">Lahore and Karachi lead booking volume growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

