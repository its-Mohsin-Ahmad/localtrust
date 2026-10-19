import { Search } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function FindServicesPage() {
  return (
    <SectionPage
      title="Find Services"
      description="Search trusted professionals near you."
      icon={<Search className="w-5 h-5" />}
      action={{ label: "Browse Services", href: "/services" }}
    />
  );
}
