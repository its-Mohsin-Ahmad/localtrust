import { Search } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderServicesPage() {
  return (
    <SectionPage
      title="My Services"
      description="Manage the services you offer to customers."
      icon={<Search className="w-5 h-5" />}
    />
  );
}
