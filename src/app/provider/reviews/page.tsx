import { Star } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderReviewsPage() {
  return (
    <SectionPage
      title="Reviews"
      description="Customer reviews and ratings for your work."
      icon={<Star className="w-5 h-5" />}
    />
  );
}
