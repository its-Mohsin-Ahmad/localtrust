import { MapPin } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AddressesPage() {
  return (
    <SectionPage
      title="Addresses"
      description="Manage your saved service addresses."
      icon={<MapPin className="w-5 h-5" />}
    />
  );
}
