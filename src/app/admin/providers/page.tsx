import { Building2 } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AdminProvidersPage() {
  return (
    <SectionPage
      title="Providers"
      description="Review and manage provider listings."
      icon={<Building2 className="w-5 h-5" />}
    />
  );
}
