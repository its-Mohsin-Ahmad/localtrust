import { Bell } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AdminNotificationsPage() {
  return (
    <SectionPage
      title="Notifications"
      description="Platform alerts and system notifications."
      icon={<Bell className="w-5 h-5" />}
    />
  );
}
