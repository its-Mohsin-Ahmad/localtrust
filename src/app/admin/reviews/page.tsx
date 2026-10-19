import { Star } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AdminReviewsPage() {
  return (
    <SectionPage
      title="Reviews"
      description="Moderate reviews across the platform."
      icon={<Star className="w-5 h-5" />}
    />
  );
}
