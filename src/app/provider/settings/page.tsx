import { Settings } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderSettingsPage() {
  return (
    <SectionPage
      title="Settings"
      description="Manage your business profile, password, and preferences."
      icon={<Settings className="w-5 h-5" />}
    />
  );
}
