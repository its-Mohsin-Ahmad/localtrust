import { Settings } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AdminSettingsPage() {
  return (
    <SectionPage
      title="Settings"
      description="Platform configuration and admin preferences."
      icon={<Settings className="w-5 h-5" />}
    />
  );
}
