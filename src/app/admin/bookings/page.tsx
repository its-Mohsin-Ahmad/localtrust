import { Calendar } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AdminBookingsPage() {
  return (
    <SectionPage
      title="Bookings"
      description="Monitor all platform bookings."
      icon={<Calendar className="w-5 h-5" />}
    />
  );
}
