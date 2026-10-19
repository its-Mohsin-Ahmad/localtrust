import { Calendar } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function BookingsPage() {
  return (
    <SectionPage
      title="My Bookings"
      description="Track your upcoming and past service bookings."
      icon={<Calendar className="w-5 h-5" />}
      action={{ label: "Book a Service", href: "/customer/find-services" }}
    />
  );
}
