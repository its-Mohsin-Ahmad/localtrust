import { Heart } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function SavedProvidersPage() {
  return (
    <SectionPage
      title="Saved Providers"
      description="Your favorite professionals, saved for later."
      icon={<Heart className="w-5 h-5" />}
      action={{ label: "Find Services", href: "/services" }}
    />
  );
}
