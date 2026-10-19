import {
  Calendar,
  CheckCircle2,
  CreditCard,
  Heart,
  MessageSquare,
  Star,
} from "lucide-react";
import { MetricCard } from "@/components/shared/metric-card";
import {
  AreaChartPanel,
  BarChartPanel,
  GroupedBarChartPanel,
  PieChartPanel,
} from "@/components/dashboard/charts";

const bookingsOverTime = [
  { name: "Jan", value: 2 },
  { name: "Feb", value: 3 },
  { name: "Mar", value: 5 },
  { name: "Apr", value: 4 },
  { name: "May", value: 7 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 9 },
  { name: "Aug", value: 8 },
  { name: "Sep", value: 11 },
  { name: "Oct", value: 10 },
  { name: "Nov", value: 13 },
  { name: "Dec", value: 12 },
];

const spendByCategory = [
  { name: "Plumbing", value: 18500 },
  { name: "Electrical", value: 12400 },
  { name: "Cleaning", value: 9600 },
  { name: "AC Repair", value: 14200 },
  { name: "Carpentry", value: 6800 },
  { name: "Painting", value: 5400 },
];

const bookingStatus = [
  { name: "Mon", completed: 3, pending: 1 },
  { name: "Tue", completed: 2, pending: 2 },
  { name: "Wed", completed: 4, pending: 0 },
  { name: "Thu", completed: 3, pending: 1 },
  { name: "Fri", completed: 5, pending: 2 },
  { name: "Sat", completed: 6, pending: 1 },
  { name: "Sun", completed: 2, pending: 0 },
];

const monthlySpend = [
  { name: "May", value: 7200 },
  { name: "Jun", value: 9400 },
  { name: "Jul", value: 8100 },
  { name: "Aug", value: 11600 },
  { name: "Sep", value: 10200 },
  { name: "Oct", value: 13400 },
];

const RECENT_BOOKINGS = [
  { id: "BK-1042", provider: "Ahmed Raza", service: "AC Repair", date: "12 Oct 2026", status: "Completed" },
  { id: "BK-1039", provider: "Sana Builders", service: "Painting", date: "08 Oct 2026", status: "In Progress" },
  { id: "BK-1031", provider: "Bilal Electricals", service: "Wiring Check", date: "01 Oct 2026", status: "Completed" },
  { id: "BK-1024", provider: "CleanPro Lahore", service: "Deep Cleaning", date: "24 Sep 2026", status: "Cancelled" },
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

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-bold text-[#182230]">Welcome back, Ali</h1>
          <p className="text-[#667085] text-sm">Here is what is happening with your bookings.</p>
        </div>
        <a
          href="/customer/find-services"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-[#FF6900] text-white text-sm font-medium hover:bg-[#e55a00] transition-colors"
        >
          Book a Service
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Total Bookings" value="12" change={{ value: "18%", positive: true }} icon={<Calendar className="w-4 h-4" />} />
        <MetricCard label="Completed Jobs" value="8" change={{ value: "12%", positive: true }} icon={<CheckCircle2 className="w-4 h-4" />} />
        <MetricCard label="Saved Providers" value="6" change={{ value: "9%", positive: true }} icon={<Heart className="w-4 h-4" />} />
        <MetricCard label="Total Spend" value="Rs. 66,900" change={{ value: "5%", positive: false }} icon={<CreditCard className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Bookings Over Time" subtitle="Monthly bookings during the last 12 months">
          <AreaChartPanel data={bookingsOverTime} />
        </ChartCard>
        <ChartCard title="Spend by Category" subtitle="Where your money went this year">
          <PieChartPanel data={spendByCategory} />
        </ChartCard>
        <ChartCard title="Weekly Booking Status" subtitle="Completed vs pending jobs per day">
          <GroupedBarChartPanel data={bookingStatus} />
        </ChartCard>
        <ChartCard title="Monthly Spend Trend" subtitle="Your spending over the last 6 months (Rs.)">
          <BarChartPanel data={monthlySpend} />
        </ChartCard>
      </div>

      <div className="bg-white border border-[#E4E7EC] rounded-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E7EC]">
          <h3 className="font-bold text-[#182230] text-sm">Recent Bookings</h3>
          <a href="/customer/bookings" className="text-[#FF6900] text-sm font-medium hover:underline">
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#667085] text-xs border-b border-[#E4E7EC]">
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Provider</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((b) => (
                <tr key={b.id} className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-3 font-medium text-[#182230]">{b.id}</td>
                  <td className="px-5 py-3 text-[#182230]">{b.provider}</td>
                  <td className="px-5 py-3 text-[#667085]">{b.service}</td>
                  <td className="px-5 py-3 text-[#667085]">{b.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        "inline-block px-2.5 py-1 rounded-full text-xs font-medium " +
                        (b.status === "Completed"
                          ? "bg-[#22C55E]/10 text-[#16A34A]"
                          : b.status === "In Progress"
                            ? "bg-[#FF6900]/10 text-[#FF6900]"
                            : "bg-[#EF4444]/10 text-[#EF4444]")
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

      <div className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-card p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF6900]/10 text-[#FF6900] shrink-0">
          <Star className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#182230] text-sm">How was your last service?</p>
          <p className="text-[#667085] text-xs mt-0.5">Your review helps other customers find trusted professionals.</p>
        </div>
        <a href="/customer/reviews" className="text-[#FF6900] text-sm font-medium hover:underline shrink-0">
          Write a review
        </a>
      </div>

      <div className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-card p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#082B60]/10 text-[#082B60] shrink-0">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#182230] text-sm">2 unread messages</p>
          <p className="text-[#667085] text-xs mt-0.5">Ahmed Raza and CleanPro Lahore replied to you.</p>
        </div>
        <a href="/customer/messages" className="text-[#FF6900] text-sm font-medium hover:underline shrink-0">
          Open inbox
        </a>
      </div>
    </div>
  );
}
