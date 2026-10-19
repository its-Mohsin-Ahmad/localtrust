import { Bell } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderNotificationsPage() {
  return (
    <SectionPage
      title="Notifications"
      description="New requests, reviews, and account alerts."
      icon={<Bell className="w-5 h-5" />}
    />
  );
}
