import { Building2 } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProfilePage() {
  return (
    <SectionPage
      title="Public Profile"
      description="See and edit how customers view your profile."
      icon={<Building2 className="w-5 h-5" />}
    />
  );
}
