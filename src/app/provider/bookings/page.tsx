import { Calendar } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderBookingsPage() {
  return (
    <SectionPage
      title="Bookings"
      description="Accept, complete, and track booking requests."
      icon={<Calendar className="w-5 h-5" />}
    />
  );
}
