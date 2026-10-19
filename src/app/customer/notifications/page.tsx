import { Bell } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function NotificationsPage() {
  return (
    <SectionPage
      title="Notifications"
      description="Booking updates, offers, and account alerts."
      icon={<Bell className="w-5 h-5" />}
    />
  );
}
