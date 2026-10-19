import { Settings } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function SettingsPage() {
  return (
    <SectionPage
      title="Settings"
      description="Manage your profile, password, and preferences."
      icon={<Settings className="w-5 h-5" />}
    />
  );
}
